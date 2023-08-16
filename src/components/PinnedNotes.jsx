import useAppStore from "../../store/app-store";
import Note from "./Note";


function PinnedNotes() {

    const { notes, showSearchRes, searchRes, listMode, showTrash } = useAppStore()

    let pinnedNotes = showSearchRes ? searchRes.filter(note => (note.isPinned && !note.deletedAt)) : notes.filter(note => (note.isPinned && !note.deletedAt))

    if (pinnedNotes.length === 0 || showTrash) return

    return (
        <div className="relative px-3 flex flex-col gap-y-4">

            <h2 className="text-md text-gray-400">Pinned
                <span className="text-xs text-gray-400 ml-2">{pinnedNotes.length}</span>
            </h2>

            <div className={`grid grid-cols-${listMode === 0 ? '2' : '1'} gap-3`}>
                {pinnedNotes.map(note => <Note key={note._id} note={note} />)}
            </div>
        </div>
    );
}

export default PinnedNotes;