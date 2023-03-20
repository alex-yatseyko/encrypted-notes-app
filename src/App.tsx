import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import styles from "./App.module.css";
type Note = {
  id: string;
  title: string;
  content: Content;
  updatedAt: Date;
};

function App() {
  const [notes, setNotes] = useState({});

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class: styles.textEditor,
      },
    },
  });

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };
  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
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

  const notesList = Object.values(notes).sort(
    (a: Note, b: Note): Note[] => b.updatedAt.getTime() - a.updatedAt.getTime()
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
              className={styles.sidebarItem}
            >
              {note.title}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.editorContainer}>
        <div className={styles.toolbar}>
          <button
            className={
              editor?.isActive("bold")
                ? styles.toolabrButtonActive
                : styles.toolbarButton
            }
            onClick={toggleBold}
          >
            Bold
          </button>
          <button
            className={
              editor?.isActive("italic")
                ? styles.toolabrButtonActive
                : styles.toolbarButton
            }
            onClick={toggleItalic}
          >
            Italic
          </button>
        </div>
        <EditorContent editor={editor} className={styles.textEditorContent} />
      </div>
    </div>
  );
}

export default App;
