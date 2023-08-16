import { useState } from "react";
import BarsIcon from "./components/Common/Icons/BarsIcon";
import XIcon from "./components/Common/Icons/XIcon";
import RectangleGroupIcon from "./components/Common/Icons/RectangleGroupIcon";
import SearchIcon from "./components/Common/Icons/SearchIcon";
import QueueListIcon from "./components/Common/Icons/QueueListIcon";
import useAppStore from "../store/app-store";

function Header() {

    const { listMode, setListMode } = useAppStore()

    function toggleBetweenModes() {
        setListMode(listMode === 0 ? 1 : 0)
    }

    const [searchStr, setSearchStr] = useState('')

    function clearSearchInp() {
        setSearchStr('')
    }

    return (
        <div className="flex flex-col gap-y-5 p-3">

            <div className="relative overflow-hidden flex h-14 justify-between rounded-full p-2 bg-gray-900 shadow-md shadow-gray-900">
                <button className="bg-gray-900 absolute left-2 z-20 top-2 flex justify-center items-center bottom-2 aspect-square text-white scale-110 transition-all duration-300 hover:bg-gray-800 rounded-full p-1">
                    <BarsIcon />
                </button>
                {searchStr.length > 0 && (
                    <button onClick={clearSearchInp} className="bg-gray-900 absolute right-2 z-20 top-2 flex justify-center items-center bottom-2 aspect-square text-white scale-110 transition-all duration-300 hover:bg-gray-800 rounded-full p-1">
                        <XIcon />
                    </button>
                )}
                <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)} className="absolute inset-0 z-0 text-center bg-transparent px-14 text-white" placeholder="Search your notes" />
            </div>

            <div className="flex justify-between item-center">
                <h2 className="text-2xl text-white font-bold">My Notes</h2>

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