import { AnimatePresence } from "framer-motion"
import useAppStore from "../store/app-store"
import PlusIcon from "./components/Common/Icons/PlusIcon"
import NewNoteEditor from "./components/NewNoteEditor"
import Notes from "./components/Notes"
import PinnedNotes from "./components/PinnedNotes"
import Header from "./Header"
import BgBlur from "./components/Common/BgBlur"
import DeleteConfirmationPopup from "./components/popups/DeleteConfirmationPopup"
import Menu from "./components/Menu"

function App() {

  const { newNoteEditorVis, setNewNoteEditorVis, deleteNotePopupVis, menuVis } = useAppStore()

  function handleOpenNewNoteEditor() {
    setNewNoteEditorVis(true)
  }

  return (
    <div className="h-screen overflow-scroll bg-gray-800">
      <Header />
      <PinnedNotes />
      <Notes />
      <BgBlur />

      <AnimatePresence>
        {menuVis && (
          <Menu />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteNotePopupVis && (
          <DeleteConfirmationPopup />
        )}
      </AnimatePresence>

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
