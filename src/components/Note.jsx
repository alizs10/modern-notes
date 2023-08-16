import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import EditIcon from "./Common/Icons/EditIcon";
import TrashIcon from "./Common/Icons/TrashIcon";
import PinIcon from "./Common/Icons/PinIcon";
import useAppStore from "../../store/app-store";
import { motion } from 'framer-motion'
import UnPinIcon from "./Common/Icons/UnPinIcon";
import { config } from "../../libs/swipeable";

function Note({ note }) {

    const { noteInBlurMode, setNoteInBlurMode, pinNote, unPinNote, setDeleteNotePopupVis } = useAppStore()



    const handlers = useSwipeable({
        onSwipedLeft: handleSwipeLeft,
        onSwipedRight: handleSwipeRight,
        ...config
    });

    function handleSwipeRight() {

        setLBlur('100%')

    }
    function handleSwipeLeft() {

        if (note._id !== noteInBlurMode?._id) {
            setNoteInBlurMode(note)
        }
        setLBlur('0')

    }


    const [lBlur, setLBlur] = useState('100%')


    function noteSize(size) {
        switch (size) {
            case 0:
                return 'note-size-0'
                break;
            case 1:
                return 'note-size-1'
                break;
            case 2:
                return 'note-size-2'
                break;
            case 3:
                return 'note-size-3'
                break;

            default:
                return 'note-size-1'
                break;
        }
    }

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

    return (
        <motion.div
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: [-150, 0], opacity: 1 }}
            exit={{ x: [0, -150], opacity: 0 }}
            transition={{ duration: '0.5' }}
            className={`${noteColor(note.color)} col-span-1 shadow-sm shadow-gray-900 relative overflow-hidden p-4 flex flex-col gap-y-2 rounded-3xl`}
            {...handlers}
        >
            <h4 className="text-lg font-bold">{note.title}</h4>
            <p className="text-sm break-words text-ellipsis">
                {note.note}
            </p>

            <div style={{ left: (note._id === noteInBlurMode?._id) ? lBlur : '100%' }} className="absolute transition-all duration-300 w-full top-0 bottom-0 left-full backdrop-blur-[2px] rounded-xl flex items-end pb-4 justify-center gap-x-2">

                <button onClick={() => setDeleteNotePopupVis(true)} className="p-2 aspect-square shadow-md rounded-full bg-red-50 text-red-500 text-sm">
                    <div className="scale-90">
                        <TrashIcon />
                    </div>
                </button>
                <button onClick={() => {
                    note.isPinned ? unPinNote({ noteId: note._id }) : pinNote({ noteId: note._id })
                }} className="p-2 aspect-square shadow-md rounded-full bg-gray-200 fill-gray-600 text-sm">
                    <div className="scale-90 relative">
                        {note.isPinned ? (
                            <UnPinIcon />
                        ) : (
                            <PinIcon />
                        )}
                    </div>
                </button>

                <button className="p-2 aspect-square shadow-md rounded-full bg-yellow-50 text-yellow-600 text-sm">
                    <div className="scale-90">
                        <EditIcon />
                    </div>
                </button>
            </div>
        </motion.div>
    );
}

export default Note;