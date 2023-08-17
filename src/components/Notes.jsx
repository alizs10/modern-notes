import useAppStore from "../../store/app-store";
import Note from "./Note";

function EmptyNotes() {
    return (
        <div className="relative p-3 flex flex-col gap-y-4">


            <div className="mt-4 font-bold text-5xl leading-[1.5] text-gray-500 w-full mx-auto text-center py-10">
                Take Your First Note :)
            </div>

        </div>
    )
}

function Notes() {

    const { notes, showSearchRes, searchRes, listMode, showTrash } = useAppStore()

    let othersNotes = showSearchRes ? searchRes.filter(note => (!note.isPinned && !note.deletedAt)) : notes.filter(note => (!note.isPinned && !note.deletedAt))

    if (notes.length === 0 && !showTrash) {
        return <EmptyNotes />
    }


    // function notesWithDir(notes) {

    //     // set dir for new note
    //     // 0 => left, 1 => right

    //     let notesHolder = [];

    //     let newNotesArr = notes.map((note, index) => {

    //         if (index === 0) {
    //             note.dir = 0;
    //             notesHolder = [...notesHolder, note]
    //             return note;
    //         }

    //         if (index === 1) {
    //             note.dir = 1;
    //             notesHolder = [...notesHolder, note]
    //             return note;
    //         }

    //         let leftNotes = notesHolder.filter(note => note.dir === 0)
    //         let rightNotes = notesHolder.filter(note => note.dir === 1)
    //         let leftNotesCount = leftNotes.length;
    //         let rightNotesCount = rightNotes.length;
    //         let leftGapsCount = leftNotesCount - 1;
    //         let rightGapsCount = rightNotesCount - 1;
    //         let leftUnitsCount = 0;
    //         let rightUnitsCount = 0;

    //         notesHolder.map(noteHolder => {
    //             if (noteHolder.dir === 0) {
    //                 leftUnitsCount += (noteHolder.size + 1)
    //             } else {

    //                 rightUnitsCount += (noteHolder.size + 1)
    //             }
    //         })

    //         let g = 10
    //         let leftVal = (leftGapsCount * g) + leftUnitsCount;
    //         let rightVal = (rightGapsCount * g) + rightUnitsCount;
    //         note.dir = leftVal > rightVal ? 1 : 0;

    //         notesHolder = [...notesHolder, note]

    //         console.log(index, leftVal, rightVal, note.dir);
    //         return note;
    //     })



    //     return newNotesArr;
    // }

    if (showTrash) return

    return (
        <div className="relative p-3 flex flex-col gap-y-4">

            <h2 className="text-md text-gray-400">Others
                <span className="text-xs text-gray-400 ml-2">{othersNotes.length}</span>
            </h2>

            <div className={`grid ${listMode === 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>

                {othersNotes.map((note) => {
                    return <Note key={note._id} note={note} />
                })}

            </div>

        </div>
    );
}

export default Notes;