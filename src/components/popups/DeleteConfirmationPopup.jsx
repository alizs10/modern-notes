import useAppStore from "../../../store/app-store";
import BackdropWrapper from "../Common/BackdropWrapper";
import { motion } from 'framer-motion'
import { useSwipeable } from "react-swipeable";
import { config } from "../../../libs/swipeable";
import { useNotificationsStore } from "../../../store/notifications-store";

function DeleteConfirmationPopup() {

    const { setDeleteNotePopupVis, deleteNote, trashNote, unTrashNote, noteInBlurMode } = useAppStore()

    const { addNotification, removeNotification } = useNotificationsStore()

    function closePopup() {
        setDeleteNotePopupVis(false)
    }

    const handlers = useSwipeable({
        onSwipedDown: closePopup,
        ...config
    })


    var noteId = noteInBlurMode?._id;


    function handleTrashNote() {

        trashNote({ noteId })
        let newNotify = {
            _id: Date.now(),
            index: 0,
            message: 'note moved to trash!',
            status: 1
        }
        addNotification(newNotify)
        setTimeout(() => {
            removeNotification(newNotify._id)
        }, 3000)
    }

    function handleUnTrashNote() {
        unTrashNote({ noteId })
        let newNotify = {
            _id: Date.now(),
            index: 0,
            message: 'note restored!',
            status: 0
        }
        addNotification(newNotify)
        setTimeout(() => {
            removeNotification(newNotify._id)
        }, 3000)
    }
    function handleDeleteNote() {
        deleteNote({ noteId })
        let newNotify = {
            _id: Date.now(),
            index: 0,
            message: 'note deleted permanently!',
            status: 1
        }
        addNotification(newNotify)
        setTimeout(() => {
            removeNotification(newNotify._id)
        }, 3000)
    }

    if (!noteInBlurMode) return

    return (
        <BackdropWrapper handleClick={closePopup} >
            <motion.div
                initial={{ y: '100%', x: '-50%' }}
                animate={{ y: ['100%', '0%'], x: '-50%' }}
                exit={{ y: '100%' }}
                transition={{ bounce: 'none', duration: '0.3' }}
                {...handlers}
                onClick={e => e.stopPropagation()}
                className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] dark:bg-gray-900 bg-gray-100 p-10 rounded-t-[50px] flex flex-col gap-y-10 justify-center">
                <div className="absolute w-24 h-1 -translate-x-1/2 bg-gray-300 rounded-full dark:bg-gray-500 top-2 left-1/2"></div>

                <h2 className="font-bold text-4xl dark:text-white text-gray-800 break-words uppercase leading-[1.4]">Choose an Action To Proceed</h2>

                <div className="flex flex-col mb-auto gap-y-2">
                    {noteInBlurMode.deletedAt ? (
                        <>
                            <button onClick={handleUnTrashNote} className="py-2 text-lg font-bold text-center whitespace-nowrap rounded-xl bg-emerald-300/80 text-emerald-900">
                                Restore
                            </button>
                            <button onClick={handleDeleteNote} className="py-2 font-bold text-center text-red-300 whitespace-nowrap rounded-xl text-md bg-red-800/90">
                                DELETE
                            </button>
                            <button onClick={closePopup} className="py-2 font-bold text-center text-gray-300 bg-gray-600 whitespace-nowrap rounded-xl text-md">
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleTrashNote} className="py-2 text-lg font-bold text-center text-red-900 whitespace-nowrap rounded-xl bg-red-300/80">
                                Move To Trash
                            </button>
                            <button onClick={handleDeleteNote} className="py-2 font-bold text-center text-red-300 whitespace-nowrap rounded-xl text-md bg-red-800/90">
                                DELETE
                            </button>
                            <button onClick={closePopup} className="py-2 font-bold text-center text-gray-500 bg-gray-300 whitespace-nowrap rounded-xl text-md dark:bg-gray-600 dark:text-gray-300">
                                Cancel
                            </button>
                        </>
                    )}

                </div>
            </motion.div>
        </BackdropWrapper>
    );
}

export default DeleteConfirmationPopup;