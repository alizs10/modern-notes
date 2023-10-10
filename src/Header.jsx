import { useEffect, useState } from "react";
import BarsIcon from "./components/Common/Icons/BarsIcon";
import XIcon from "./components/Common/Icons/XIcon";
import RectangleGroupIcon from "./components/Common/Icons/RectangleGroupIcon";
import QueueListIcon from "./components/Common/Icons/QueueListIcon";
import useAppStore from "../store/app-store";

function Header() {

    const { listMode, setListMode, notes, setSearchRes, showSearchRes, setShowSearchRes, setMenuVis, showTrash } = useAppStore()

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
        <div className="flex flex-col gap-y-5 p-3">

            <div className="relative overflow-hidden flex h-14 justify-between rounded-full p-2 dark:bg-gray-900 bg-gray-100 shadow-md dark:shadow-gray-900 shadow-gray-100">
                <div className="absolute left-0 top-0 bottom-0 z-20 flex justify-center items-center p-3">

                    <button
                        onClick={() => setMenuVis(true)}
                        className="dark:bg-gray-900 bg-gray-100 p-1 flex justify-center items-center bottom-2 aspect-square dark:text-white text-black scale-110 transition-all duration-300 dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full">
                        <BarsIcon />
                    </button>
                </div>
                {searchStr.length > 0 && (
                    <div className="absolute right-0 top-0 bottom-0 z-20 flex justify-center items-center p-3">
                        <button onClick={clearSearchInp} className="dark:bg-gray-900 bg-gray-100 flex justify-center items-center bottom-2 aspect-square dark:text-white text-black scale-110 transition-all duration-300 dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full p-1">
                            <XIcon />
                        </button>
                    </div>
                )}
                <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}
                    className="absolute inset-0 outline-none z-0 text-center dark:bg-gray-900 bg-gray-100 text-xl placeholder:text-lg rounded-full h-full w-full px-14 dark:text-white text-black" placeholder="Search your notes" />
            </div>

            <div className="flex justify-between item-center">
                <h2 className="text-2xl dark:text-white text-black font-bold">My Notes
                    <span className="text-xs dark:text-gray-400 text-gray-600 ml-2">{notes.filter(note => !note.deletedAt).length}</span>
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