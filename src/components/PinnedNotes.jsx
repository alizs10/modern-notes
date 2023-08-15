import useAppStore from "../../store/app-store";
import Note from "./Note";


function PinnedNotes() {

    const { notes, pinnedNotes } = useAppStore()

    if (pinnedNotes.length === 0) return

    return (
        <div className="relative p-5 flex flex-col gap-y-4">

            <h2 className="text-md text-gray-600">Pinned</h2>

            <div className="grid grid-cols-2 grid-rows-6 gap-3 pb-32">
                {pinnedNotes.map(note => <Note key={note._id} note={note} />)}
            </div>
        </div>
    );
}

export default PinnedNotes;