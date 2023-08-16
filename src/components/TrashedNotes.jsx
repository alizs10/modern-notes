import useAppStore from "../../store/app-store";
import Note from "./Note";


function TrashedNotes() {

    const { notes, showSearchRes, searchRes, listMode, showTrash } = useAppStore()

    let trashedNotes = showSearchRes ? searchRes.filter(note => note.deletedAt) : notes.filter(note => note.deletedAt)

    if (trashedNotes.length === 0 || !showTrash) return


    return (
        <div className="relative px-3 flex flex-col gap-y-4">

            <h2 className="text-md text-gray-400">Trash</h2>

            <div className={`grid grid-cols-${listMode === 0 ? '2' : '1'} gap-3`}>
                {trashedNotes.map(note => <Note key={note._id} note={note} />)}
            </div>
        </div>
    );
}

export default TrashedNotes;