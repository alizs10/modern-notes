import useAppStore from "../../store/app-store";
import useSearchStore from "../../store/search-store";
import Note from "./Note";

function EmptyTrash() {
    return (
        <div className="relative flex flex-col p-3 gap-y-4">


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
        <div className="relative flex flex-col px-3 gap-y-4">

            <h2 className="text-gray-600 text-md dark:text-gray-400">Trash
                <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{trashedNotes.length}</span>
            </h2>

            {trashedNotes.length === 0 && (<EmptyTrash />)}

            <div className={`space-y-4 ${listMode === 0 ? 'columns-2' : 'columns-1'} gap-3`}>
                {trashedNotes.map(note => <Note key={note._id} note={note} />)}
            </div>
        </div>
    );
}

export default TrashedNotes;