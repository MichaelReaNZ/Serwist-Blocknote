import { NoteEditor } from "@/app/components/noteEditor";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

interface NoteIdPageProps {
	params: {
		noteId: Id<"notes">;
	};
}

export default async function NotePage({ params }: NoteIdPageProps) {
	const note = await fetchQuery(api.notes.getById, {
		noteId: params.noteId,
	});

	return (
		<div>
			<h1>Note ID: {params.noteId}</h1>
			{note && <NoteEditor key={note._id} note={note} />}
		</div>
	);
}
