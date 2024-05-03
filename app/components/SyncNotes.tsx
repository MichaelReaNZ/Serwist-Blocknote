// app/components/SyncNotes.tsx
"use client";

import { useEffect } from "react";
import { openDB } from "idb";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function SyncNotes() {
	// const notesFromConvex = useQuery(api.notes.getAll);
	// useEffect(() => {
	// 	const syncNotesWithIndexedDB = async () => {
	// 		try {
	// 			const db = await openDB("NotesDB", 1, {
	// 				upgrade(db) {
	// 					db.createObjectStore("notes", { keyPath: "_id" });
	// 				},
	// 			});
	// 			const tx = db.transaction("notes", "readwrite");
	// 			const store = tx.objectStore("notes");

	// 			//TODO: Add any pending notes from IndexedDB to Convex
	// 			// Clear existing notes in IndexedDB
	// 			await store.clear();

	// 			if (notesFromConvex) {
	// 				// Add notes from Convex to IndexedDB
	// 				for (const note of notesFromConvex) {
	// 					await store.put(note, note._id);
	// 				}
	// 			}

	// 			await tx.done;
	// 			console.log("Notes synced with IndexedDB");
	// 		} catch (error) {
	// 			console.error("Error syncing notes with IndexedDB:", error);
	// 		}
	// 	};

	// 	syncNotesWithIndexedDB();
	// }, [notesFromConvex]);

	return null;
}
