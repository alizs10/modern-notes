import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import EditIcon from "./Common/Icons/EditIcon";
import TrashIcon from "./Common/Icons/TrashIcon";
import PinIcon from "./Common/Icons/PinIcon";
import useAppStore from "../../store/app-store";
import { motion } from 'framer-motion'
import UnPinIcon from "./Common/Icons/UnPinIcon";

function Note({ note }) {

    const { noteInBlurMode, setNoteInBlurMode, pinNote, unPinNote } = useAppStore()

    const config = {
        delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
        preventScrollOnSwipe: false,           // prevents scroll during swipe (*See Details*)
        trackTouch: true,                      // track touch input
        trackMouse: true,                     // track mouse input
        rotationAngle: 0,                      // set a rotation angle
        swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
        touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
    }

    const handlers = useSwipeable({
        onSwipedLeft: handleSwipeLeft,
        onSwipedRight: handleSwipeRight,
        ...config,
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
                return 'bg-gray-400 outline outline-2 outline-gray-500'
                break;
            case 1:
                return 'bg-gray-400 outline outline-2 outline-gray-500'
                break;
            case 2:
                return 'bg-gray-400 outline outline-2 outline-gray-500'
                break;
            case 3:
                return 'bg-gray-400 outline outline-2 outline-gray-500'
                break;

            default:
                return 'bg-gray-400 outline outline-2 outline-gray-500'
                break;
        }
    }

    return (
        <motion.div
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: [-150, 0], opacity: 1 }}
            exit={{ x: [0, -150], opacity: 0 }}
            transition={{ duration: '0.5' }}
            className={`bg-emerald-300 outline outline-2 outline-emerald-400 shadow-sm shadow-gray-900 relative overflow-hidden p-4 flex flex-col gap-y-2 rounded-3xl`}
            {...handlers}
        >
            <h4 className="text-lg font-bold text-gray-800">{note.title}</h4>
            <p className="text-sm break-words text-ellipsis text-gray-900">
                {note.note}
            </p>

            <div style={{ left: (note._id === noteInBlurMode?._id) ? lBlur : '100%' }} className="absolute transition-all duration-300 w-full top-0 bottom-0 left-full backdrop-blur-[2px] rounded-xl flex items-end pb-4 justify-center gap-x-2">

                <button className="p-2 aspect-square shadow-md rounded-full bg-red-50 text-red-500 text-sm">
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