import { useEffect, useState } from "react";
import BarsIcon from "./components/Common/Icons/BarsIcon";
import XIcon from "./components/Common/Icons/XIcon";
import RectangleGroupIcon from "./components/Common/Icons/RectangleGroupIcon";
import QueueListIcon from "./components/Common/Icons/QueueListIcon";
import useAppStore from "../store/app-store";
import useSearchStore from "../store/search-store";

function Header() {

    const { listMode, setListMode, notes, setMenuVis, showTrash } = useAppStore()
    const { setSearchRes, showSearchRes, setShowSearchRes, } = useSearchStore()

    function toggleBetweenModes() {
        setListMode(listMode === 0 ? 1 : 0)
    }

    const [searchStr, setSearchStr] = useState('')

    function clearSearchInp() {
        setSearchStr('')
    }

    function handleSearch() {

        // Search Start


        let notesIns = [...notes]
        let searchRes = notesIns.filter(note => {
            if (showTrash === !!note.deletedAt && (note.title.toLowerCase().includes(searchStr.toLowerCase()) || note.note.toLowerCase().includes(searchStr.toLowerCase()))) {
                return true
            }

            return false
        })

        setSearchRes(searchRes)

        if (!showSearchRes) {
            setShowSearchRes(true)
        }
    }

    useEffect(() => {

        if (searchStr.length === 0) {
            setShowSearchRes(false)
            return
        }

        handleSearch()

    }, [searchStr, showTrash, notes])

    return (
        <div className="flex flex-col p-3 gap-y-5">

            <div className="sticky top-0 flex justify-between p-2 overflow-hidden bg-gray-100 rounded-full shadow-sm h-14 dark:bg-gray-900">
                <div className="absolute top-0 bottom-0 left-0 z-20 flex items-center justify-center p-3">

                    <button
                        onClick={() => setMenuVis(true)}
                        className="flex items-center justify-center p-1 text-black transition-all duration-300 scale-110 bg-gray-100 rounded-full dark:bg-gray-900 bottom-2 aspect-square dark:text-white dark:hover:bg-gray-800 hover:bg-gray-200">
                        <BarsIcon />
                    </button>
                </div>
                {searchStr.length > 0 && (
                    <div className="absolute top-0 bottom-0 right-0 z-20 flex items-center justify-center p-3">
                        <button onClick={clearSearchInp} className="flex items-center justify-center p-1 text-black transition-all duration-300 scale-110 bg-gray-100 rounded-full dark:bg-gray-900 bottom-2 aspect-square dark:text-white dark:hover:bg-gray-800 hover:bg-gray-200">
                            <XIcon />
                        </button>
                    </div>
                )}
                <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}
                    className="absolute inset-0 z-0 w-full h-full text-xl text-center text-black bg-gray-100 rounded-full outline-none dark:bg-gray-900 placeholder:text-lg px-14 dark:text-white" placeholder="Search your notes" />
            </div>

            <div className="flex justify-between item-center">
                <h2 className="text-2xl font-bold text-black dark:text-white">My Notes
                    <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{notes.filter(note => !note.deletedAt).length}</span>
                </h2>

                {listMode === 0 ? (
                    <button onClick={toggleBetweenModes} className="dark:text-white text-black scale-110 transition-all duration-300 dark:hover:bg-gray-700 hover:bg-gray-300 rounded-full p-[0.4rem]">
                        <QueueListIcon />
                    </button>
                ) : (
                    <button onClick={toggleBetweenModes} className="dark:text-white text-black scale-110 transition-all duration-300 dark:hover:bg-gray-700 hover:bg-gray-300 rounded-full p-[0.4rem]">
                        <RectangleGroupIcon />
                    </button>
                )}

            </div>
        </div>
    );
}

export default Header;