import { AnimatePresence } from "framer-motion"
import useAppStore from "../store/app-store"
import PlusIcon from "./components/Common/Icons/PlusIcon"
import NewNoteEditor from "./components/NewNoteEditor"
import Notes from "./components/Notes"
import PinnedNotes from "./components/PinnedNotes"
import Header from "./Header"

function App() {

  const { newNoteEditorVis, setNewNoteEditorVis } = useAppStore()

  function handleOpenNewNoteEditor() {
    setNewNoteEditorVis(true)
  }

  return (
    <div className="h-screen overflow-scroll bg-gray-900/90">
      <Header />

      <PinnedNotes />

      <Notes />

      <AnimatePresence>
        {newNoteEditorVis && (
          <NewNoteEditor />
        )}
      </AnimatePresence>

      <button onClick={handleOpenNewNoteEditor} className="fixed out bottom-10 right-1/2 translate-x-1/2 flex justify-center items-center rounded-3xl px-5 py-3 text-xl font-bold text-white bg-gray-700 shadow-md shadow-gray-900">
        <PlusIcon />
      </button>
    </div>
  )
}

export default App
