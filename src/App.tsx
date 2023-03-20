// import './App.css'
import styles from './App.module.css'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'


function App() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World!</p>',
    editorProps: {
      attributes: {
        class: styles.textEditor
      }
    }
  })

  const toggleBold = () => {
    
  }

  return (
    <div className={styles.pageContainer}>
    
      <div className={styles.sidebar}>Sidebar</div>
      <div className={styles.editorContainer}>
        <div className={styles.toolbar}>Toolbar</div>
        <button className={styles.toolbarButton} onClick={toggleBold}>
          Bold
        </button>
        <EditorContent editor={editor} className={styles.textEditorContent}/>
      </div>
    </div>
  )
}

export default App