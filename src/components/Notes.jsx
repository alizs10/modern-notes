import useAppStore from "../../store/app-store";
import Note from "./Note";

function EmptyNotes() {
    return (
        <div className="relative p-3 flex flex-col gap-y-4">


            <div className="mt-4 font-bold text-xl text-gray-900 shadow-md shadow-gray-900 w-full p-5 bg-emerald-300 rounded-3xl">
                Take Your First Note :)
            </div>

        </div>
    )
}

function Notes() {

    const { notes, listMode } = useAppStore()

    let unPinnedNotes = notes.filter(note => (!note.isPinned && !note.deletedAt))


    if (notes.length === 0) {
        return <EmptyNotes />
    }

    function notesWithDir(notes) {

        // set dir for new note
        // 0 => left, 1 => right

        let notesHolder = [];

        let newNotesArr = notes.map((note, index) => {

            if (index === 0) {
                note.dir = 0;
                notesHolder = [...notesHolder, note]
                return note;
            }

            if (index === 1) {
                note.dir = 1;
                notesHolder = [...notesHolder, note]
                return note;
            }

            let leftNotes = notesHolder.filter(note => note.dir === 0)
            let rightNotes = notesHolder.filter(note => note.dir === 1)
            let leftNotesCount = leftNotes.length;
            let rightNotesCount = rightNotes.length;
            let leftGapsCount = leftNotesCount - 1;
            let rightGapsCount = rightNotesCount - 1;
            let leftUnitsCount = 0;
            let rightUnitsCount = 0;

            notesHolder.map(noteHolder => {
                if (noteHolder.dir === 0) {
                    leftUnitsCount += (noteHolder.size + 1)
                } else {

                    rightUnitsCount += (noteHolder.size + 1)
                }
            })

            let g = 10
            let leftVal = (leftGapsCount * g) + leftUnitsCount;
            let rightVal = (rightGapsCount * g) + rightUnitsCount;
            note.dir = leftVal > rightVal ? 1 : 0;

            notesHolder = [...notesHolder, note]

            console.log(index, leftVal, rightVal, note.dir);
            return note;
        })



        return newNotesArr;
    }

    return (
        <div className="relative p-3 flex flex-col gap-y-4">

            <h2 className="text-md text-gray-400">Others</h2>

            <div className={`grid grid-cols-${listMode === 0 ? '2' : '1'} gap-3`}>

                {unPinnedNotes.map((note) => {
                    return <Note key={note._id} note={note} />
                })}

            </div>

        </div>
    );
}

export default Notes;