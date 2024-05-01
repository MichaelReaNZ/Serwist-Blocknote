"use client";

import { useEffect, useState } from "react";
import { openDB } from "idb";

const mockNoteData = "This is a sample note.";

const NotesPage = () => {
  const [note, setNote] = useState("");

  useEffect(() => {
    const initializeNote = async () => {
      const db = await openDB("NotesDB", 1, {
        upgrade(db) {
          db.createObjectStore("notes");
        },
      });

      const cachedNote = await db.get("notes", "note");
      if (cachedNote) {
        console.log("Loading note from IndexedDB:", cachedNote);
        setNote(cachedNote);
      } else {
        console.log("Loading mock note data:", mockNoteData);
        setNote(mockNoteData);
      }
    };

    initializeNote();
  }, []);

  const handleNoteChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedNote = e.target.value;
    setNote(updatedNote);

    const db = await openDB("NotesDB", 1);
    await db.put("notes", updatedNote, "note");
    console.log("Note updated in IndexedDB:", updatedNote);
  };

  useEffect(() => {
    const handleSync = () => {
      if (navigator.onLine) {
        // Simulate syncing the note data
        alert("Syncing note data online...");
        console.log("Updated note online:", note);
      }
    };

    window.addEventListener("online", handleSync);
    return () => {
      window.removeEventListener("online", handleSync);
    };
  }, [note]);

  console.log("Current note state:", note);

  return (
    <div>
      <h1>Notes</h1>
      <textarea value={note} onChange={handleNoteChange} rows={10} cols={50} />
    </div>
  );
};

export default NotesPage;
