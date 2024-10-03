import { useEffect, useRef } from "react";
import useAppStore from "../../store/app-store";
import useSearchStore from "../../store/search-store";
import Note from "./Note";
import Bricks from 'bricks.js'

function EmptyNotes() {
    return (
        <div className="relative flex flex-col p-3 gap-y-4">


            <div className="mt-4 font-bold text-5xl leading-[1.5] text-gray-500 w-full mx-auto text-center py-10">
                Take Your First Note :)
            </div>

        </div>
    )
}

function Notes() {

    const { notes, listMode, showTrash } = useAppStore()
    const { showSearchRes, searchRes } = useSearchStore()

    let othersNotes = showSearchRes ? searchRes.filter(note => (!note.isPinned && !note.deletedAt)) : notes.filter(note => (!note.isPinned && !note.deletedAt))

    if (notes.length === 0 && !showTrash) {
        return <EmptyNotes />
    }

    if (showTrash) return


    return (
        <div className="relative flex flex-col gap-4 p-3">

            <h2 className="text-gray-600 text-md dark:text-gray-400">Others
                <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{othersNotes.length}</span>
            </h2>

            <div className={`space-y-4 ${listMode === 0 ? 'columns-2' : 'columns-1'} gap-3`}>
                {othersNotes.map((note) => {
                    return <Note key={note._id} note={note} />
                })}

            </div>
        </div>
    );
}

export default Notes;