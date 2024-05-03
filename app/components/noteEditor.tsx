"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { openDB } from "idb";
import { useEffect, useState } from "react";

interface NoteEditorProps {
	note: Doc<"notes">;
}

const getAllNotesFromIndexedDB = async () => {
	const db = await openDB("NotesDB", 1);
	const tx = db.transaction("notes", "readonly");
	const notes = await tx.objectStore("notes").getAll();
	return notes;
};

export function NoteEditor({ note }: NoteEditorProps) {
	const [noteContent, setNoteContent] = useState(note.content);
	const [isOnline, setIsOnline] = useState(true);
	const [offlineNotes, setOfflineNotes] = useState<Doc<"notes">[]>([]);
	const updateNote = useMutation(api.notes.update);

	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
		};

		const handleOffline = () => {
			setIsOnline(false);
		};

		setIsOnline(navigator.onLine);

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	useEffect(() => {
		const fetchOfflineNotes = async () => {
			const notes = await getAllNotesFromIndexedDB();
			setOfflineNotes(notes);
		};

		fetchOfflineNotes();
	}, [noteContent]);

	const handleNoteChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNoteContent(e.target.value);
		const updatedNote = { ...note, content: e.target.value };

		if (isOnline) {
			// Update the note in Convex directly when online
			await updateNote({
				content: updatedNote.content,
				noteId: updatedNote._id,
			});
			console.log("Note updated in Convex: " + updatedNote.content);
		} else {
			// Save or update the note in IndexedDB when offline
			const db = await openDB("NotesDB", 1, {
				upgrade(db) {
					db.createObjectStore("notes", { keyPath: "_id" });
				},
			});
			const tx = db.transaction("notes", "readwrite");
			const store = tx.objectStore("notes");

			// Set the editedOffline flag to true
			updatedNote.editedOffline = true;

			// Update/Add the note in IndexedDB
			await store.put(updatedNote, updatedNote._id);
			console.log("Note updated in IndexedDB:" + updatedNote.content);

			await tx.done;
		}
	};

	return (
		<div>
			<textarea className="text-black" onChange={handleNoteChange} value={noteContent}></textarea>

			<div className={`status ${isOnline ? "online" : "offline"}`}>
				Current status: {isOnline ? "Online" : "Offline"}
			</div>
			{
				<div>
					<h2>Offline Notes</h2>
					<ul>
						{offlineNotes.map((offlineNote) => (
							<li key={offlineNote._id + Math.random().toString(36).substring(7)}>
								{offlineNote._id + ": " + offlineNote.content}
								{offlineNote.editedOffline && <span> (Edited Offline)</span>}
							</li>
						))}
					</ul>
				</div>
			}
		</div>
	);
}
