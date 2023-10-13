import useAppStore from "../../store/app-store";
import useSearchStore from "../../store/search-store";
import Note from "./Note";


function PinnedNotes() {

    const { notes, listMode, showTrash } = useAppStore()
    const { showSearchRes, searchRes } = useSearchStore()

    let pinnedNotes = showSearchRes ? searchRes.filter(note => (note.isPinned && !note.deletedAt)) : notes.filter(note => (note.isPinned && !note.deletedAt))

    if (pinnedNotes.length === 0 || showTrash) return

    return (
        <div className="relative px-3 flex flex-col gap-y-4">

            <h2 className="text-md dark:text-gray-400 text-gray-600">Pinned
                <span className="text-xs dark:text-gray-400 text-gray-600 ml-2">{pinnedNotes.length}</span>
            </h2>

            <div className={`grid ${listMode === 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                {pinnedNotes.map(note => <Note key={note._id} note={note} />)}
            </div>
        </div>
    );
}

export default PinnedNotes;