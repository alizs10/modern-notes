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
import TrashedNotes from "./components/TrashedNotes"
import About from "./components/About"
import ReadingMode from "./components/ReadingMode"
import EditNoteEditor from "./components/EditNoteEditor"
import Notifications from "./components/Notification/Notifications"

function App() {

  const { newNoteEditorVis, setNewNoteEditorVis, deleteNotePopupVis, menuVis, showAbout, showReadingMode, editNoteEditorVis } = useAppStore()

  function handleOpenNewNoteEditor() {
    setNewNoteEditorVis(true)
  }


  return (
    <div className="h-screen max-w-[600px] mx-auto overflow-y-scroll dark:bg-gray-800 bg-gray-200">

      <Header />

      <TrashedNotes />
      <PinnedNotes />
      <Notes />

      <BgBlur />

      <AnimatePresence>
        {menuVis && (
          <Menu />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReadingMode && (
          <ReadingMode />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAbout && (
          <About />
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

      <AnimatePresence>
        {editNoteEditorVis && (
          <EditNoteEditor />
        )}
      </AnimatePresence>


      <Notifications />


      <button onClick={handleOpenNewNoteEditor} className="fixed z-10 bottom-10 right-1/2 translate-x-1/2 flex justify-center items-center rounded-3xl px-5 py-3 text-xl font-bold dark:text-white text-black dark:bg-gray-700 bg-gray-300 shadow-md dark:shadow-gray-900 shadow-gray-300">
        <PlusIcon />
      </button>
    </div>
  )
}

export default App
