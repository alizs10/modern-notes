import useAppStore from "../../store/app-store";
import useSearchStore from "../../store/search-store";
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

    const { notes, listMode, showTrash } = useAppStore()
    const { showSearchRes, searchRes, } = useSearchStore()

    let trashedNotes = showSearchRes ? searchRes.filter(note => note.deletedAt) : notes.filter(note => note.deletedAt)


    if (!showTrash) return


    return (
        <div className="relative px-3 flex flex-col gap-y-4">

            <h2 className="text-md dark:text-gray-400 text-gray-600">Trash
                <span className="text-xs dark:text-gray-400 text-gray-600 ml-2">{trashedNotes.length}</span>
            </h2>

            {trashedNotes.length === 0 && (<EmptyTrash />)}

            <div className={`grid ${listMode === 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                {trashedNotes.map(note => <Note key={note._id} note={note} />)}
            </div>
        </div>
    );
}

export default TrashedNotes;