// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Note } from "./types";

import styles from "./App.module.css";
import { NoteEditor } from "./NoteEditor";
import { JSONContent } from "@tiptap/react";

function App() {
  const [notes, setNotes] = useState<Record<string, Note>>({});
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const activeNote = activeNoteId ? notes[activeNoteId] : null;

  const handleChangeNoteContent = (noteId: string, content: JSONContent) => {
    setNotes((notes) => ({
      ...notes,
      [noteId]: {
        ...notes[noteId],
        updatedAt: new Date(),
        content,
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
          onChange={(content) =>
            handleChangeNoteContent(activeNote.id, content)
          }
          note={activeNote}
          // note={{
          //   title: "tes",
          //   id: "tests",
          //   updatedAt: new Date(),
          //   content: "testet",
          // }}
        />
      ) : (
        <div>Create a new note or select an existing one</div>
      )}
    </div>
  );
}

export default App;
