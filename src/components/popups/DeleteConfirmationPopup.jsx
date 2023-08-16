import useAppStore from "../../../store/app-store";
import BackdropWrapper from "../Common/BackdropWrapper";

function DeleteConfirmationPopup() {

    const { setDeleteNotePopupVis, deleteNote, trashNote, noteInBlurMode } = useAppStore()

    function closePopup() {
        setDeleteNotePopupVis(false)
    }

    return (
        <BackdropWrapper handleClick={closePopup} >
            <div onClick={e => e.stopPropagation()} className="max-w-[70%] rounded-3xl bg-gray-900 h-fit self-center mx-auto p-5 flex flex-col gap-y-10 justify-center">
                <h2 className="font-bold text-center text-3xl text-white break-words">Choose Action To Proceed</h2>

                <div className="flex flex-col gap-y-2">
                    <button onClick={() => trashNote({ noteId: noteInBlurMode._id })} className="w-full text-center whitespace-nowrap rounded-xl py-2 text-md  bg-red-100 text-gray-900">
                        Move To Trash
                    </button>
                    <button onClick={() => deleteNote({ noteId: noteInBlurMode._id })} className="w-full text-center whitespace-nowrap rounded-xl py-2 text-md  bg-red-500 text-white">
                        DELETE PERMANENTLY
                    </button>
                    <button onClick={closePopup} className="w-full text-center whitespace-nowrap rounded-xl py-2 text-md  bg-gray-300 text-gray-900">
                        Cancel
                    </button>
                </div>
            </div>
        </BackdropWrapper>
    );
}

export default DeleteConfirmationPopup;