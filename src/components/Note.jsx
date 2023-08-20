import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import EditIcon from "./Common/Icons/EditIcon";
import TrashIcon from "./Common/Icons/TrashIcon";
import PinIcon from "./Common/Icons/PinIcon";
import useAppStore from "../../store/app-store";
import { motion } from 'framer-motion'
import UnPinIcon from "./Common/Icons/UnPinIcon";
import { config } from "../../libs/swipeable";
import OptionsIcon from "./Common/Icons/OptionsIcon";

function Note({ note }) {

    const { noteInBlurMode, setNoteInBlurMode, pinNote, unPinNote, setDeleteNotePopupVis, setShowNote, setShowReadingMode, setEditableNote, setEditNoteEditorVis, addNotification, removeNotification } = useAppStore()



    const handlers = useSwipeable({
        onSwipedLeft: handleSwipeLeft,
        onTap: handleShowNote,
        ...config
    });

    const optionsHandlers = useSwipeable({
        onSwipedRight: handleSwipeRight,
        ...config
    });

    function handleSwipeRight() {

        setLBlur('100%')

    }
    function handleSwipeLeft() {

        setNoteInBlurMode(note)
        setLBlur('0')

    }


    const [lBlur, setLBlur] = useState('100%')

    function noteColor(color) {
        switch (color) {
            case 0:
                return 'bg-gray-900 outline outline-2 outline-gray-900 text-white'
                break;
            case 1:
                return 'bg-emerald-400 outline outline-2 outline-emerald-500'
                break;
            case 2:
                return 'bg-purple-400 outline outline-2 outline-purple-500'
                break;
            case 3:
                return 'bg-red-400 outline outline-2 outline-red-500'
                break;
            case 4:
                return 'bg-gray-400 outline outline-2 outline-gray-500'
                break;
            case 5:
                return 'bg-orange-400 outline outline-2 outline-orange-500'
                break;

            default:
                return 'bg-gray-900 outline outline-2 outline-gray-900 text-white'
                break;
        }
    }

    function handleShowNote() {
        setShowNote(note)
        setShowReadingMode(true)
    }

    function handleShowEditNoteEditor() {
        setEditableNote(note)
        setEditNoteEditorVis(true)
    }

    function handleTogglePinNote() {
        if (note.isPinned) {
            unPinNote({ noteId: note._id })
        }
        else {
            pinNote({ noteId: note._id })
        }



        let newNotify = {
            _id: Date.now(),
            index: 0,
            message: note.isPinned ? 'note unpinned' : 'note pinned',
            status: 3
        }
        addNotification(newNotify)
        setTimeout(() => {
            removeNotification(newNotify._id)
        }, 3000)
    }

    return (
        <motion.div
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: [-150, 0], opacity: 1 }}
            exit={{ x: [0, -150], opacity: 0 }}
            transition={{ duration: '0.5' }}
            className={`relative col-span-1 overflow-hidden shadow-sm shadow-gray-900 ${noteColor(note.color)} rounded-3xl`}>
            <div

                className={`p-4 flex flex-col gap-y-2 h-full`}
                {...handlers}
            >
                <h4 className={`text-lg font-bold select-none ${note.title.length === 0 ? 'opacity-30' : ''}`}>{note.title.length === 0 ? 'No Title' : note.title}</h4>

                <p className="text-sm break-words touch-none select-none text-ellipsis">
                    {note.note.length > 150 ? note.note.substr(0, 150) + '...' : note.note}
                </p>


            </div>

            <div {...optionsHandlers} style={{ left: (note._id === noteInBlurMode?._id) ? lBlur : '100%' }} className="absolute transition-all duration-300 w-full top-0 bottom-0 left-full backdrop-blur-[2px] rounded-xl flex items-end pb-4 justify-center gap-x-2">

                {note.deletedAt && (

                    <button onClick={() => setDeleteNotePopupVis(true)} className={`p-2 aspect-square shadow-md rounded-full bg-gray-100 text-gray-600 text-sm`}>
                        <div className="scale-90">
                            <OptionsIcon />
                        </div>
                    </button>
                )}

                {!note.deletedAt && (
                    <>


                        <button onClick={() => setDeleteNotePopupVis(true)} className={`p-2 aspect-square shadow-md rounded-full bg-red-50 text-red-500 text-sm`}>
                            <div className="scale-90">
                                <TrashIcon />
                            </div>
                        </button>

                        <button onClick={handleTogglePinNote} className="p-2 aspect-square shadow-md rounded-full bg-gray-200 fill-gray-600 text-sm">


                            <div className="scale-90 relative">
                                {note.isPinned ? (
                                    <UnPinIcon />
                                ) : (
                                    <PinIcon />
                                )}
                            </div>
                        </button>

                        <button onClick={handleShowEditNoteEditor} className="p-2 aspect-square shadow-md rounded-full bg-yellow-50 text-yellow-600 text-sm">
                            <div className="scale-90">
                                <EditIcon />
                            </div>
                        </button>

                    </>
                )}
            </div>
        </motion.div>
    );
}

export default Note;