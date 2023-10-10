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


    if (showTrash) return

    return (
        <div className="relative p-3 flex flex-col gap-4">

            <h2 className="text-md dark:text-gray-400 text-gray-600">Others
                <span className="text-xs dark:text-gray-400 text-gray-600 ml-2">{othersNotes.length}</span>
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