import { useEffect, useState } from 'react';

const SLUG = 'team-notes';
const EMPTY_NOTES = { title: '', notes: '', status: 'draft' };

async function request(method, body) {
	const response = await fetch(`/api/documents/${SLUG}`, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined,
	});
	return { status: response.status, json: await response.json() };
}

export default function Home() {
	// The version and data last read from or saved to WordPress.
	const [saved, setSaved] = useState(null);
	// What's in the form now.
	const [draft, setDraft] = useState(EMPTY_NOTES);
	// The document someone else saved, when a write is rejected.
	const [theirs, setTheirs] = useState(null);
	const [message, setMessage] = useState('Loading...');

	function showDocument(document) {
		setSaved(document);
		setDraft({ ...EMPTY_NOTES, ...document.data });
		setTheirs(null);
	}

	async function load() {
		const { status, json } = await request('GET');
		if (status === 200) {
			showDocument(json);
			setMessage(`Loaded version ${json.version}.`);
		} else if (status === 404) {
			showDocument({ slug: SLUG, version: 0, data: EMPTY_NOTES });
			setMessage('No document yet. Saving creates it.');
		} else {
			setMessage(`Could not load (${status}): ${json.message}`);
		}
	}

	async function save(version) {
		const { status, json } = await request('PUT', { version, data: draft });
		if (status === 200 || status === 201) {
			showDocument(json);
			setMessage(`Saved version ${json.version}.`);
		} else if (status === 409) {
			setTheirs(json.data.document);
			setMessage(
				`Someone saved version ${json.data.version} after you loaded version ${version}. Nothing was changed.`,
			);
		} else {
			setMessage(`Could not save (${status}): ${json.message}`);
		}
	}

	useEffect(() => {
		load();
	}, []);

	function update(field) {
		return (event) => setDraft({ ...draft, [field]: event.target.value });
	}

	return (
		<main>
			<h1>Team notes</h1>
			<p className="hint">
				Open this page in two tabs, change the notes in both, then save
				each tab. The second save is rejected because it's based on an
				older version.
			</p>

			<p>
				Version: <strong>{saved ? saved.version : '...'}</strong>
			</p>

			<form
				onSubmit={(event) => {
					event.preventDefault();
					save(saved.version);
				}}
			>
				<label>
					Title
					<input value={draft.title} onChange={update('title')} />
				</label>
				<label>
					Notes
					<textarea rows={6} value={draft.notes} onChange={update('notes')} />
				</label>
				<label>
					Status
					<select value={draft.status} onChange={update('status')}>
						<option value="draft">Draft</option>
						<option value="review">In review</option>
						<option value="done">Done</option>
					</select>
				</label>
				<div className="actions">
					<button type="submit" disabled={!saved || theirs}>
						Save
					</button>
					<button type="button" onClick={load}>
						Reload
					</button>
				</div>
			</form>

			<p role="status">{message}</p>

			{theirs && (
				<section className="conflict">
					<h2>Conflict</h2>
					<div className="columns">
						<div>
							<h3>Yours (not saved)</h3>
							<pre>{JSON.stringify(draft, null, 2)}</pre>
						</div>
						<div>
							<h3>Theirs (version {theirs.version})</h3>
							<pre>{JSON.stringify(theirs.data, null, 2)}</pre>
						</div>
					</div>
					<div className="actions">
						<button type="button" onClick={() => showDocument(theirs)}>
							Reload theirs
						</button>
						<button type="button" onClick={() => save(theirs.version)}>
							Overwrite with mine
						</button>
					</div>
				</section>
			)}
		</main>
	);
}
