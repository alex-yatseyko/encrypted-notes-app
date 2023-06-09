// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Note } from "./types";
import storage from "./storage";

import styles from "./App.module.css";
import { NoteEditor } from "./NoteEditor";
import { JSONContent } from "@tiptap/react";

const STORAGE_KEY = "notes";

const loadNotes = () => {
  const noteIds = storage.get<string[]>(STORAGE_KEY, []);
  const notes: Record<string, Note> = {};
  noteIds.forEach((id) => {
    const note = storage.get<Note>(`${STORAGE_KEY}:${id}`);
    notes[note.id] = {
      ...note,
      updatedAt: new Date(note.updatedAt),
    };
  });
  return notes;
};

const saveNote = (note: Note) => {
  const noteIds = storage.get<string[]>(STORAGE_KEY, []);
  const noteIdsWithoutNode = noteIds.filter((id) => id !== note.id);
  storage.set(STORAGE_KEY, [...noteIdsWithoutNode, note.id]);
  storage.set(`${STORAGE_KEY}:${note.id}`, note);
};

function App() {
  const [notes, setNotes] = useState<Record<string, Note>>(() => loadNotes());
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const activeNote = activeNoteId ? notes[activeNoteId] : null;

  const handleChangeNoteContent = (
    noteId: string,
    content: JSONContent,
    title = "New Note"
  ) => {
    setNotes((notes) => ({
      ...notes,
      [noteId]: {
        ...notes[noteId],
        updatedAt: new Date(),
        content,
        title,
      },
    }));
  };

  const handleCreateNote = () => {
    const newNote = {
      id: uuid(),
      title: "New Note",
      content: `<h1>New note</h1>`,
      updatedAt: new Date(),
    };
    setNotes((notes) => ({
      ...notes,
      [newNote.id]: newNote,
    }));
    setActiveNoteId(newNote.id);
    saveNote(newNote);
  };

  const handleChangeActiveNote = (id: string) => {
    setActiveNoteId(id);
  };

  const notesList = Object.values(notes).sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sidebar}>
        <button className={styles.sidebarButton} onClick={handleCreateNote}>
          New Note
        </button>
        <div className={styles.sidebarList}>
          {notesList.map((note) => (
            <div
              key={note.id}
              role="button"
              tabIndex={0}
              className={
                note.id === activeNoteId
                  ? styles.sidebarItemActive
                  : styles.sidebarItem
              }
              onClick={() => handleChangeActiveNote(note.id)}
            >
              {note.title}
            </div>
          ))}
        </div>
      </div>
      {activeNote ? (
        <NoteEditor
          onChange={(content, title) =>
            handleChangeNoteContent(activeNote.id, content, title)
          }
          note={activeNote}
        />
      ) : (
        <div>Create a new note or select an existing one</div>
      )}
    </div>
  );
}

export default App;
