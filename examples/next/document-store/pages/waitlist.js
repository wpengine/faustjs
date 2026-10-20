import Link from 'next/link';
import { useEffect, useState } from 'react';

const COLLECTION_URL = '/api/collections/waitlist/documents';
const PAGE_SIZE = 5;

async function request(method, url, body) {
	const response = await fetch(url, {
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

export default function Waitlist() {
	const [signups, setSignups] = useState([]);
	const [nextCursor, setNextCursor] = useState(null);
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('Loading...');
	const [busy, setBusy] = useState(false);

	// Loads the first page, or the page after `cursor`.
	async function load(cursor) {
		const query = cursor ? `&cursor=${cursor}` : '';
		const { status, json } = await request('GET', `${COLLECTION_URL}?limit=${PAGE_SIZE}${query}`);
		if (status !== 200) {
			setMessage(`Could not load (${status}): ${json.message}`);
			return;
		}
		setSignups(cursor ? [...signups, ...json.documents] : json.documents);
		setNextCursor(json.next_cursor);
		setMessage(json.documents.length || cursor ? '' : 'No signups yet.');
	}

	async function add(event) {
		event.preventDefault();
		setBusy(true);
		// POST to the collection, and WordPress picks the document ID.
		const { status, json } = await request('POST', COLLECTION_URL, { data: { email } });
		setBusy(false);
		if (status !== 201) {
			setMessage(`Could not add (${status}): ${json.message}`);
			return;
		}
		setEmail('');
		setSignups([json, ...signups]);
		setMessage(`Added ${json.data.email} as ${json.id}.`);
	}

	async function remove(signup) {
		setBusy(true);
		// A delete names the version it's based on, like a write.
		const { status, json } = await request(
			'DELETE',
			`${COLLECTION_URL}/${signup.id}?version=${signup.version}`,
		);
		setBusy(false);
		if (status === 200) {
			setSignups(signups.filter(({ id }) => id !== signup.id));
			setMessage(`Removed ${signup.data.email}.`);
		} else if (status === 409 || status === 404) {
			setMessage('That signup changed or was removed somewhere else. Reloaded the list.');
			load();
		} else {
			setMessage(`Could not remove (${status}): ${json.message}`);
		}
	}

	useEffect(() => {
		load();
	}, []);

	return (
		<main>
			<p>
				<Link href="/">← Team notes</Link>
			</p>
			<h1>Waitlist</h1>
			<p className="hint">
				Each signup is a document in the <code>waitlist</code> collection.
				Adding one lets WordPress generate its ID, the list pages through
				the collection newest first, and removing one sends the version it
				was based on.
			</p>

			<form onSubmit={add}>
				<label>
					Email
					<input
						type="email"
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</label>
				<div className="actions">
					<button type="submit" disabled={busy}>
						Join the waitlist
					</button>
				</div>
			</form>

			<p role="status">{message}</p>

			<ul className="documents">
				{signups.map((signup) => (
					<li key={signup.id}>
						<span>
							<strong>{signup.data.email}</strong>
							<br />
							<small>
								<code>{signup.id}</code> · added{' '}
								{new Date(signup.created).toLocaleString()}
							</small>
						</span>
						<button type="button" onClick={() => remove(signup)} disabled={busy}>
							Remove
						</button>
					</li>
				))}
			</ul>

			{nextCursor && (
				<button type="button" onClick={() => load(nextCursor)} disabled={busy}>
					Load more
				</button>
			)}
		</main>
	);
}
