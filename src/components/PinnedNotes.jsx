import useAppStore from "../../store/app-store";
import useSearchStore from "../../store/search-store";
import Note from "./Note";


function PinnedNotes() {

    const { notes, listMode, showTrash } = useAppStore()
    const { showSearchRes, searchRes } = useSearchStore()

    let pinnedNotes = showSearchRes ? searchRes.filter(note => (note.isPinned && !note.deletedAt)) : notes.filter(note => (note.isPinned && !note.deletedAt))

    if (pinnedNotes.length === 0 || showTrash) return

    return (
        <div className="relative flex flex-col px-3 gap-y-4">

            <h2 className="text-gray-600 text-md dark:text-gray-400">Pinned
                <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{pinnedNotes.length}</span>
            </h2>

            <div className={`space-y-4 ${listMode === 0 ? 'columns-2' : 'columns-1'} gap-3`}>
                {pinnedNotes.map(note => <Note key={note._id} note={note} />)}
            </div>
        </div>
    );
}

export default PinnedNotes;