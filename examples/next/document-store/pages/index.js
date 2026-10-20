import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deepEqual, mergeDocuments, setAtPath } from '../lib/mergeDocuments.mjs';

const COLLECTION = 'notes';
const DOCUMENT_ID = 'team';
const EMPTY_NOTES = { title: '', notes: '', status: 'draft' };
const FIELDS = [
	{ name: 'title', label: 'Title' },
	{ name: 'notes', label: 'Notes' },
	{ name: 'status', label: 'Status' },
];
// How many times a save merges with a newer version and retries before
// asking the user, in case other tabs keep saving in between.
const MAX_AUTO_MERGES = 2;

async function request(method, body) {
	const response = await fetch(`/api/collections/${COLLECTION}/documents/${DOCUMENT_ID}`, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined,
	});
	const text = await response.text();
	try {
		return { status: response.status, json: JSON.parse(text) };
	} catch {
		// WordPress can answer with an HTML error page, for example on a fatal error.
		return { status: response.status, json: { message: text.slice(0, 200) } };
	}
}

function withDefaults(data) {
	return { ...EMPTY_NOTES, ...data };
}

// The form label for a conflicting field, or its path for anything else.
function fieldLabel(path) {
	const field = path.length === 1 && FIELDS.find(({ name }) => name === path[0]);
	return field ? field.label : path.join('.');
}

function formatValue(value) {
	return value === undefined ? '(removed)' : JSON.stringify(value);
}

export default function Home() {
	// The version and data last read from or saved to WordPress. Edits in the
	// form are based on this, so it's the base for merging.
	const [saved, setSaved] = useState(null);
	// What's in the form now.
	const [draft, setDraft] = useState(EMPTY_NOTES);
	// Fields both you and someone else changed, while waiting for a decision.
	const [conflict, setConflict] = useState(null);
	const [message, setMessage] = useState('Loading...');
	const [saving, setSaving] = useState(false);

	function showDocument(document) {
		setSaved({ ...document, data: withDefaults(document.data) });
		setDraft(withDefaults(document.data));
		setConflict(null);
	}

	async function load() {
		const { status, json } = await request('GET');
		if (status === 200) {
			showDocument(json);
			setMessage(`Loaded version ${json.version}.`);
		} else if (status === 404) {
			showDocument({
				collection: COLLECTION,
				id: DOCUMENT_ID,
				version: 0,
				data: EMPTY_NOTES,
			});
			setMessage('No document yet. Saving creates it.');
		} else {
			setMessage(`Could not load (${status}): ${json.message}`);
		}
	}

	// Save `data` on top of `version`. On a conflict, `base` is the version the
	// data was edited from, used to work out who changed what.
	async function save(version, data, base, merges = 0) {
		setSaving(true);
		const { status, json } = await request('PUT', { version, data });
		setSaving(false);

		if (status === 200 || status === 201) {
			showDocument(json);
			return { ok: true, version: json.version };
		}
		if (status !== 409) {
			setMessage(`Could not save (${status}): ${json.message}`);
			return { ok: false };
		}

		// The document is null if someone else deleted it, so take the version
		// (0 in that case) from the conflict itself.
		const theirs = {
			collection: COLLECTION,
			id: DOCUMENT_ID,
			...json.data.document,
			version: json.data.version,
			data: withDefaults(json.data.document?.data),
		};

		// Nothing to keep from this tab, so just catch up.
		if (deepEqual(data, base)) {
			showDocument(theirs);
			setMessage(`Updated to version ${theirs.version} from another tab.`);
			return { ok: false };
		}

		const { merged, conflicts } = mergeDocuments(base, theirs.data, data);

		if (conflicts.length === 0 && merges < MAX_AUTO_MERGES) {
			const result = await save(theirs.version, merged, theirs.data, merges + 1);
			if (result.ok && !result.merged) {
				setMessage(
					`Merged your changes with version ${theirs.version} and saved version ${result.version}.`,
				);
			}
			return { ...result, merged: true };
		}

		setSaved(theirs);
		setDraft(merged);
		setConflict({
			theirs,
			merged,
			fields: conflicts.map((item) => ({ ...item, choice: 'theirs' })),
		});
		setMessage(
			conflicts.length
				? `Version ${theirs.version} changed the same fields you did. Choose what to keep.`
				: `Version ${theirs.version} keeps changing. Review the merged result and save again.`,
		);
		return { ok: false };
	}

	function choose(index, choice) {
		setConflict({
			...conflict,
			fields: conflict.fields.map((field, i) => (i === index ? { ...field, choice } : field)),
		});
	}

	async function saveMerged() {
		const data = conflict.fields.reduce(
			(result, field) =>
				setAtPath(result, field.path, field.choice === 'yours' ? field.yours : field.theirs),
			conflict.merged,
		);
		const result = await save(conflict.theirs.version, data, conflict.theirs.data);
		if (result.ok && !result.merged) {
			setMessage(`Saved version ${result.version} with your choices.`);
		}
	}

	useEffect(() => {
		load();
	}, []);

	function update(field) {
		return (event) => setDraft({ ...draft, [field]: event.target.value });
	}

	// Fields with edits that aren't saved yet.
	const changed = new Set(
		saved ? FIELDS.filter(({ name }) => draft[name] !== saved.data[name]).map(({ name }) => name) : [],
	);
	const labelClass = (name) => (changed.has(name) ? 'changed' : undefined);

	return (
		<main>
			<h1>Team notes</h1>
			<p>
				<Link href="/waitlist">Waitlist example →</Link>
			</p>
			<p className="hint">
				Open this page in two tabs and save in both. If the tabs changed
				different fields, the second save merges them. If they changed the
				same field, you choose which value to keep.
			</p>

			<p>
				Version: <strong>{saved ? saved.version : '...'}</strong>
			</p>

			<form
				onSubmit={(event) => {
					event.preventDefault();
					save(saved.version, draft, saved.data).then((result) => {
						if (result.ok && !result.merged) {
							setMessage(`Saved version ${result.version}.`);
						}
					});
				}}
			>
				<label className={labelClass('title')}>
					Title
					<input value={draft.title} onChange={update('title')} disabled={saving || Boolean(conflict)} />
				</label>
				<label className={labelClass('notes')}>
					Notes
					<textarea
						rows={6}
						value={draft.notes}
						onChange={update('notes')}
						disabled={saving || Boolean(conflict)}
					/>
				</label>
				<label className={labelClass('status')}>
					Status
					<select value={draft.status} onChange={update('status')} disabled={saving || Boolean(conflict)}>
						<option value="draft">Draft</option>
						<option value="review">In review</option>
						<option value="done">Done</option>
					</select>
				</label>
				<div className="actions">
					<button type="submit" disabled={!saved || saving || Boolean(conflict)}>
						Save
					</button>
					<button type="button" onClick={load} disabled={saving}>
						Reload
					</button>
				</div>
			</form>

			<p role="status">{message}</p>

			{conflict && (
				<section className="conflict">
					<h2>Choose what to keep</h2>
					<p>
						Changes to other fields are already merged. These fields were
						changed in version {conflict.theirs.version} and in this tab.
					</p>
					{conflict.fields.map((field, index) => (
						<fieldset key={field.path.join('.')}>
							<legend>{fieldLabel(field.path)}</legend>
							<p className="was">Before: {formatValue(field.base)}</p>
							<label className="choice">
								<input
									type="radio"
									name={`choice-${index}`}
									checked={field.choice === 'theirs'}
									onChange={() => choose(index, 'theirs')}
								/>
								Keep theirs: {formatValue(field.theirs)}
							</label>
							<label className="choice">
								<input
									type="radio"
									name={`choice-${index}`}
									checked={field.choice === 'yours'}
									onChange={() => choose(index, 'yours')}
								/>
								Keep mine: {formatValue(field.yours)}
							</label>
						</fieldset>
					))}
					<div className="actions">
						<button type="button" onClick={saveMerged} disabled={saving}>
							Save merged
						</button>
						<button type="button" onClick={() => showDocument(conflict.theirs)} disabled={saving}>
							Discard my changes
						</button>
					</div>
				</section>
			)}
		</main>
	);
}
