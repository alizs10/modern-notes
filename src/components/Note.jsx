import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import useAppStore from "../../store/app-store";
import { config } from "../../libs/swipeable";
import NoteOptions from "./NoteOptions";
import { useNotificationsStore } from "../../store/notifications-store";
import useClickOutside from "../../hooks/useClickOutside";

function Note({ note }) {

    const { setShowNote, setShowReadingMode, setDeleteNotePopupVis, pinNote, unPinNote, setEditableNote, setEditNoteEditorVis, noteInBlurMode, setNoteInBlurMode } = useAppStore()

    const { addNotification, removeNotification } = useNotificationsStore()

    // const [left, setLeft] = useState(noteInBlurMode && noteInBlurMode._id === note._id ? '0' : '100%')
    const [left, setLeft] = useState('100%')

    const handlers = useSwipeable({
        onSwipedLeft: handleSwipeLeft,
        onTap: handleShowNote,
        ...config
    });

    useEffect(() => {

        if (noteInBlurMode && noteInBlurMode._id !== note._id) {
            setLeft('100%')
        }

    }, [noteInBlurMode])

    function noteColor(color) {
        switch (color) {
            case 0:
                return 'dark:bg-gray-900 bg-gray-100 outline outline-2 dark:outline-gray-900 outline-gray-100 dark:text-white text-black'
                break;
            case 1:
                return 'bg-emerald-400 text-gray-800 outline outline-2 outline-emerald-500'
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


    const optionsHandlers = useSwipeable({
        onSwipedRight: handleSwipeRight,
        ...config
    });

    function handleSwipeLeft() {
        setLeft('0')
        setNoteInBlurMode(note)
    }


    function handleSwipeRight() {
        setLeft('100%')
        setNoteInBlurMode(null)
    }

    function handleShowEditNoteEditor() {
        setEditableNote(note)
        setEditNoteEditorVis(true)
    }

    function handleTogglePinNote() {

        setLeft('100%')

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

    const noteRef = useClickOutside(() => {
        setLeft('100%')
        // setNoteInBlurMode(null)
    })

    function onNoteTrash() {
        setLeft('100%')
        setDeleteNotePopupVis(true)
    }
    function onNoteTogglePin() {
        setLeft('100%')
        handleTogglePinNote()
    }
    function onNoteEdit() {
        setLeft('100%')
        handleShowEditNoteEditor()
    }

    return (
        <div ref={noteRef} className={`flex-1 break-inside-avoid rounded-3xl relative  overflow-hidden ${noteColor(note.color)} w-full h-fit`}>
            <div

                className={`p-4 flex flex-col gap-y-2 h-full`}
                {...handlers}
            >
                <h4 className={`text-lg font-bold select-none ${note.title.length === 0 ? 'opacity-30' : ''}`}>{note.title.length === 0 ? 'No Title' : note.title}</h4>

                <p className="text-sm break-words select-none text-ellipsis">

                    {note.note.length > 200 ? note.note.substr(0, 200) + '...' : note.note}
                </p>


            </div>


            <NoteOptions note={note} left={left} noteInBlurMode={noteInBlurMode} optionsHandlers={optionsHandlers} onTrash={onNoteTrash}
                onTogglePin={onNoteTogglePin}
                onEdit={onNoteEdit} />

        </div>
    );
}

export default Note;