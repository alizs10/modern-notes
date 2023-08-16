import useAppStore from "../../store/app-store";
import BackdropWrapper from "./Common/BackdropWrapper";
import InfoIcon from "./Common/Icons/InfoIcon";
import LightIcon from "./Common/Icons/LightIcon";
import SunIcon from "./Common/Icons/SunIcon";
import TrashIcon from "./Common/Icons/TrashIcon";
import { motion } from 'framer-motion'

function Menu() {

    const { setMenuVis, lightTheme, setLightTheme, showTrash, setShowTrash } = useAppStore()
    function handleClose() {
        setMenuVis(false)
    }

    function toggleLightMode() {
        setLightTheme(!lightTheme)
    }

    function toggleTrash(mode) {
        setShowTrash(mode)
        handleClose()
    }

    return (
        <BackdropWrapper handleClick={handleClose}>
            <div onClick={e => e.stopPropagation()} className="fixed top-20 left-3 flex flex-col gap-y-3">
                <motion.button
                    initial={{ x: -250 }}
                    animate={{ x: [-250, 0] }}
                    transition={{ duration: '0.3', bounce: 'none' }}
                    exit={{ x: [0, -250], transition: { delay: 0.3 } }}
                    onClick={() => toggleTrash(false)}
                    className={`text-left text-lg w-fit flex items-center gap-x-1 bg-gray-900 ${showTrash ? 'text-gray-300' : 'text-yellow-300 outline outline-2 outline-yellow-300'} rounded-3xl py-3 px-5`}>
                    <span className="scale-[85%]">
                        <LightIcon />
                    </span>
                    <span>
                        Notes
                    </span>

                </motion.button>
                <motion.button
                    initial={{ x: -250 }}
                    animate={{ x: [-250, 0] }}
                    transition={{ duration: '0.3', bounce: 'none', delay: 0.1 }}
                    exit={{ x: [0, -250], transition: { delay: 0.2 } }}
                    onClick={() => toggleTrash(true)}
                    className={`text-left text-lg w-fit flex items-center gap-x-1 ${showTrash ? 'outline outline-2 outline-yellow-300 text-yellow-300' : 'text-gray-300'} bg-gray-900 rounded-3xl py-3 px-5`}>
                    <span className="scale-[85%]">
                        <TrashIcon />
                    </span>
                    <span>
                        Notes In Trash
                    </span>

                </motion.button>
                <motion.button
                    initial={{ x: -250 }}
                    animate={{ x: [-250, 0] }}
                    transition={{ duration: '0.3', bounce: 'none', delay: 0.2 }}
                    exit={{ x: [0, -250], transition: { delay: 0.1 } }}
                    onClick={toggleLightMode}
                    className={`text-left text-lg w-fit flex items-center gap-x-1 ${lightTheme ? 'bg-gray-300 shadow-lg shadow-gray-300 text-gray-900' : 'text-gray-300 bg-gray-900'} rounded-3xl py-3 px-5`}>
                    <span className="scale-[85%]">
                        <SunIcon />
                    </span>
                    <span>
                        Light Theme
                    </span>

                </motion.button>
                <motion.button
                    initial={{ x: -250 }}
                    animate={{ x: [-250, 0] }}
                    transition={{ duration: '0.3', bounce: 'none', delay: 0.3 }}
                    exit={{ x: [0, -250], transition: { delay: 0 } }}
                    className="text-left text-lg w-fit flex items-center gap-x-1 text-gray-300 bg-gray-900 rounded-3xl py-3 px-5">
                    <span className="scale-[85%]">
                        <InfoIcon />
                    </span>
                    <span>
                        About
                    </span>

                </motion.button>

            </div>
        </BackdropWrapper>
    );
}

export default Menu;