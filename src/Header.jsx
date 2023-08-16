import { useEffect, useState } from "react";
import BarsIcon from "./components/Common/Icons/BarsIcon";
import XIcon from "./components/Common/Icons/XIcon";
import RectangleGroupIcon from "./components/Common/Icons/RectangleGroupIcon";
import QueueListIcon from "./components/Common/Icons/QueueListIcon";
import useAppStore from "../store/app-store";

function Header() {

    const { listMode, setListMode, notes, setSearchRes, showSearchRes, setShowSearchRes, setMenuVis } = useAppStore()

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
            if (note.title.toLowerCase().includes(searchStr.toLowerCase()) || note.note.toLowerCase().includes(searchStr.toLowerCase())) {
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

    }, [searchStr])

    return (
        <div className="flex flex-col gap-y-5 p-3">

            <div className="relative overflow-hidden flex h-14 justify-between rounded-full p-2 bg-gray-900 shadow-md shadow-gray-900">
                <div className="absolute left-0 top-0 bottom-0 z-20 flex justify-center items-center p-3">

                    <button
                        onClick={() => setMenuVis(true)}
                        className="bg-gray-900 p-1 flex justify-center items-center bottom-2 aspect-square text-white scale-110 transition-all duration-300 hover:bg-gray-800 rounded-full">
                        <BarsIcon />
                    </button>
                </div>
                {searchStr.length > 0 && (
                    <button onClick={clearSearchInp} className="bg-gray-900 absolute right-2 z-20 top-2 flex justify-center items-center bottom-2 aspect-square text-white scale-110 transition-all duration-300 hover:bg-gray-800 rounded-full p-1">
                        <XIcon />
                    </button>
                )}
                <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}
                    className="absolute inset-0 outline-none z-0 text-center bg-gray-900 text-xl placeholder:text-lg rounded-full h-full w-full px-14 text-white" placeholder="Search your notes" />
            </div>

            <div className="flex justify-between item-center">
                <h2 className="text-2xl text-white font-bold">My Notes
                    <span className="text-xs text-gray-400 ml-2">{notes.length}</span>
                </h2>

                {listMode === 0 ? (
                    <button onClick={toggleBetweenModes} className="text-white scale-110 transition-all duration-300 hover:bg-gray-700 rounded-full p-[0.4rem]">
                        <RectangleGroupIcon />
                    </button>
                ) : (
                    <button onClick={toggleBetweenModes} className="text-white scale-110 transition-all duration-300 hover:bg-gray-700 rounded-full p-[0.4rem]">
                        <QueueListIcon />
                    </button>
                )}

            </div>
        </div>
    );
}

export default Header;