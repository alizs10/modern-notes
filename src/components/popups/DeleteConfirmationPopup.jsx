import useAppStore from "../../../store/app-store";
import BackdropWrapper from "../Common/BackdropWrapper";
import { motion } from 'framer-motion'
import { useSwipeable } from "react-swipeable";
import { config } from "../../../libs/swipeable";

function DeleteConfirmationPopup() {

    const { setDeleteNotePopupVis, deleteNote, trashNote, unTrashNote, noteInBlurMode, setNotification, setNotificationVis } = useAppStore()



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
        setNotification({ message: 'note moved to trash!', status: 1 })
        setNotificationVis(true)
        setTimeout(() => {
            setNotificationVis(false)
        }, 3000)
    }
    function handleUnTrashNote() {
        unTrashNote({ noteId })
        setNotification({ message: 'note restored!', status: 0 })
        setNotificationVis(true)
        setTimeout(() => {
            setNotificationVis(false)
        }, 3000)
    }
    function handleDeleteNote() {
        deleteNote({ noteId })
        setNotification({ message: 'note deleted permanently!', status: 1 })
        setNotificationVis(true)
        setTimeout(() => {
            setNotificationVis(false)
        }, 3000)
    }

    return (
        <BackdropWrapper handleClick={closePopup} >
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: ['100%', '30%'] }}
                exit={{ y: '100%' }}
                transition={{ bounce: 'none', duration: '0.3' }}
                {...handlers}
                onClick={e => e.stopPropagation()}
                className="fixed inset-0 bg-gray-900 p-10 rounded-t-[50px] flex flex-col gap-y-10 justify-center">
                <div className="w-24 h-1 bg-gray-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2"></div>

                <h2 className="font-bold text-4xl text-white break-words uppercase leading-[1.4]">Choose an Action To Proceed</h2>

                <div className="mb-auto flex flex-col gap-y-2">
                    {noteInBlurMode.deletedAt ? (
                        <>
                            <button onClick={handleUnTrashNote} className="text-center whitespace-nowrap rounded-xl py-2 text-lg  bg-emerald-300/80 text-emerald-900 font-bold">
                                Restore
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
                            <button onClick={closePopup} className="text-center whitespace-nowrap rounded-xl py-2 text-md font-bold bg-gray-600 text-gray-300">
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