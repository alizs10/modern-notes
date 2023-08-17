import useAppStore from "../../store/app-store";
import Note from "./Note";

function EmptyTrash() {
    return (
        <div className="relative p-3 flex flex-col gap-y-4">


            <div className="mt-4 font-bold text-5xl leading-[1.5] text-gray-500 w-full mx-auto text-center py-10">
                No Notes in Trash
            </div>

        </div>
    )
}


function TrashedNotes() {

    const { notes, showSearchRes, searchRes, listMode, showTrash } = useAppStore()

    let trashedNotes = showSearchRes ? searchRes.filter(note => note.deletedAt) : notes.filter(note => note.deletedAt)


    if (!showTrash) return

    console.log(trashedNotes);

    return (
        <div className="relative px-3 flex flex-col gap-y-4">

            <h2 className="text-md text-gray-400">Trash
                <span className="text-xs text-gray-400 ml-2">{trashedNotes.length}</span>
            </h2>

            {trashedNotes.length === 0 && (<EmptyTrash />)}

            <div className={`grid ${listMode === 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                {trashedNotes.map(note => <Note key={note._id} note={note} />)}
            </div>
        </div>
    );
}

export default TrashedNotes;