import { useRef, useState } from "react";
import ChevronLeftIcon from "./Common/Icons/ChevronLeftIcon";
import { motion } from 'framer-motion'
import useAppStore from "../../store/app-store";
import CheckCircleIcon from "./Common/Icons/CheckCircleIcon";

function NewNoteEditor() {

    const { setNewNoteEditorVis, createNewNote } = useAppStore()

    const noteEditorRef = useRef(null)
    const titleRef = useRef(null)

    function saveNewNote() {
        console.log(noteEditorRef.current.textContent);
        if (noteEditorRef?.current?.textContent.length > 0) {
            createNewNote({
                title: titleRef.current.value,
                note: noteEditorRef.current.textContent,
                color
            })
        }
        setNewNoteEditorVis(false)
    }

    const [placeholderVis, setPlaceholderVis] = useState(true)

    function onInput(e) {
        if (e.target && e.target.textContent.length > 0) {
            setPlaceholderVis(false)
        } else {
            setPlaceholderVis(true)
        }
    }

    function handleCloseNewNoteEditor() {
        setNewNoteEditorVis(false)
    }

    const [color, setColor] = useState(0)

    return (
        <motion.div
            initial={{ top: '100%' }}
            animate={{ top: '0' }}
            exit={{ top: '100%' }}
            transition={{ duration: '0.2', bounce: 'none' }}
            className="absolute inset-0 h-screen bg-gray-900 p-5 overflow-y-scroll z-30">

            <div className="sticky top-0 flex justify-between item-center bg-gray-900">
                <button onClick={handleCloseNewNoteEditor} className="text-white scale-125 px-1">
                    <ChevronLeftIcon />
                </button>
                <button onClick={saveNewNote} className="text-white px-3 py-2 text-sm  bg-gray-700 rounded-3xl">
                    Save
                </button>
            </div>

            <div className="flex flex-col gap-y-2 mt-4">
                <div className="flex flex-nowrap gap-3">
                    <div
                        onClick={() => setColor(0)}
                        className="aspect-video h-6 bg-gray-900 outline outline-[.2rem] flex justify-center items-center outline-gray-900 rounded-full">
                        {color === 0 && (
                            <span className="text-white scale-75">
                                <CheckCircleIcon />
                            </span>
                        )}
                    </div>
                    <div
                        onClick={() => setColor(1)}
                        className="aspect-video h-6 bg-emerald-300 outline outline-[.2rem] flex justify-center items-center outline-emerald-500 rounded-full">
                        {color === 1 && (
                            <span className="text-white scale-75">
                                <CheckCircleIcon />
                            </span>
                        )}
                    </div>
                    <div
                        onClick={() => setColor(2)}
                        className="aspect-video h-6 bg-purple-300 outline outline-[.2rem] flex justify-center items-center outline-purple-500 rounded-full">
                        {color === 2 && (
                            <span className="text-white scale-75">
                                <CheckCircleIcon />
                            </span>
                        )}
                    </div>
                    <div
                        onClick={() => setColor(3)}
                        className="aspect-video h-6 bg-red-300 outline outline-[.2rem] flex justify-center items-center outline-red-500 rounded-full">
                        {color === 3 && (
                            <span className="text-white scale-75">
                                <CheckCircleIcon />
                            </span>
                        )}
                    </div>
                    <div
                        onClick={() => setColor(4)}
                        className="aspect-video h-6 bg-gray-400 outline outline-[.2rem] flex justify-center items-center outline-gray-500 rounded-full">
                        {color === 4 && (
                            <span className="text-white scale-75">
                                <CheckCircleIcon />
                            </span>
                        )}
                    </div>
                    <div
                        onClick={() => setColor(5)}
                        className="aspect-video h-6 bg-orange-300 outline outline-[.2rem] flex justify-center items-center outline-orange-500 rounded-full">
                        {color === 5 && (
                            <span className="text-white scale-75">
                                <CheckCircleIcon />
                            </span>
                        )}
                    </div>
                </div>
                <input ref={titleRef} className="bg-transparent text-3xl outline-none text-white font-bold placeholder:font-normal placeholder:text-gray-500" placeholder="Title" />
                <div className="relative">
                    {placeholderVis && (<span className="absolute top-0 left-0 py-2 text-xl text-gray-700">Note...</span>)}
                    <div ref={noteEditorRef} onInput={onInput} contentEditable="true" className="relative pb-32 bg-transparent text-xl break-words text-gray-300 outline-none py-2">
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default NewNoteEditor;