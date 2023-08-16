import useAppStore from "../../store/app-store";
import Note from "./Note";


function PinnedNotes() {

    const { notes } = useAppStore()

    let pinnedNotes = notes.filter(note => note.isPinned)

    if (pinnedNotes.length === 0) return

    return (
        <div className="relative px-5 flex flex-col gap-y-4">

            <h2 className="text-md text-gray-500">Pinned</h2>

            <div className="grid grid-cols-2 gap-3">
                {pinnedNotes.map(note => <Note key={note._id} note={note} />)}
            </div>
        </div>
    );
}

export default PinnedNotes;