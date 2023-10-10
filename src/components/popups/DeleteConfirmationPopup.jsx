import useAppStore from "../../../store/app-store";
import BackdropWrapper from "../Common/BackdropWrapper";
import { motion } from 'framer-motion'
import { useSwipeable } from "react-swipeable";
import { config } from "../../../libs/swipeable";

function DeleteConfirmationPopup() {

    const { setDeleteNotePopupVis, deleteNote, trashNote, unTrashNote, noteInBlurMode, addNotification, removeNotification } = useAppStore()



    function closePopup() {
        setDeleteNotePopupVis(false)
    }

    const handlers = useSwipeable({
        onSwipedDown: closePopup,
        ...config
    })


    let noteId = noteInBlurMode._id;


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
                <div className="w-24 h-1 dark:bg-gray-500 bg-gray-300 rounded-full absolute top-2 left-1/2 -translate-x-1/2"></div>

                <h2 className="font-bold text-4xl dark:text-white text-gray-800 break-words uppercase leading-[1.4]">Choose an Action To Proceed</h2>

                <div className="mb-auto flex flex-col gap-y-2">
                    {noteInBlurMode.deletedAt ? (
                        <>
                            <button onClick={handleUnTrashNote} className="text-center whitespace-nowrap rounded-xl py-2 text-lg  bg-emerald-300/80 text-emerald-900 font-bold">
                                Restore
                            </button>
                            <button onClick={handleDeleteNote} className="text-center whitespace-nowrap rounded-xl py-2 text-md  bg-red-800/90 text-red-300 font-bold">
                                DELETE
                            </button>
                            <button onClick={closePopup} className="text-center whitespace-nowrap rounded-xl py-2 text-md font-bold bg-gray-600 text-gray-300">
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleTrashNote} className="text-center whitespace-nowrap rounded-xl py-2 text-lg  bg-red-300/80 text-red-900 font-bold">
                                Move To Trash
                            </button>
                            <button onClick={handleDeleteNote} className="text-center whitespace-nowrap rounded-xl py-2 text-md  bg-red-800/90 text-red-300 font-bold">
                                DELETE
                            </button>
                            <button onClick={closePopup} className="text-center whitespace-nowrap rounded-xl py-2 text-md font-bold dark:bg-gray-600 bg-gray-300 dark:text-gray-300 text-gray-500">
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