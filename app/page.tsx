"use client";

import Link from "next/link";
import { api } from "../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	const notes = useQuery(api.notes.getAll);
	const create = useMutation(api.notes.create);

	const handleCreateNote = () => {
		const promise = create({}).then((noteId) => router.push(`/Note/${noteId}`));
	};
	return (
		<main>
			<h1>Home</h1>
			<Link href="/page-a">Page A</Link>
			<Link href="/page-b">Page B</Link>
			<Link href="/Notes">Notes</Link>
			<div>
				<p>
					The route below is not prefetched. If you go offline before visiting it, you will fallback to an offline page
					(wait for it..).
				</p>
				<p>
					If you visit it while online, come back here, and then go offline, it will then be available offline - served
					from cache.
				</p>
				<Link href="/cached-on-nav" prefetch={false}>
					cache on nav
				</Link>
			</div>
			<div className="mt-2">
				<p>
					The route below is prefetched. If you have not visited it before but go offline, it will be available offline.
				</p>
				<Link href="/cache-on-demand">cache on demand</Link>
			</div>
			<h1>Notes</h1>
			{notes &&
				notes.map((note) => (
					<Link key={note._id} href={`/Note/${note._id}`}>
						{note.content}
					</Link>
				))}
			{/* Create note btn */}
			<br />
			<button onClick={handleCreateNote}>Create Note</button>
		</main>
	);
}
