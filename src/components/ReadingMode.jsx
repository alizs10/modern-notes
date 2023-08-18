import useAppStore from "../../store/app-store";
import { motion } from 'framer-motion'
import XIcon from "./Common/Icons/XIcon";
import { useSwipeable } from "react-swipeable";
import { config } from "../../libs/swipeable";

function ReadingMode() {

    const { setShowReadingMode, showNote } = useAppStore()

    function handleClose() {

        setShowReadingMode(false)
    }

    const handlers = useSwipeable({
        onSwipedRight: handleClose,
        ...config
    })

    return (


        <motion.div
            initial={{ left: '100%' }}
            animate={{ left: '0' }}
            exit={{ left: '100%' }}
            transition={{ duration: '0.3', bounce: 'none' }}
            className="z-40 h-screen w-screen overflow-scroll absolute inset-0 bg-gray-900 flex flex-col gap-y-2"
            {...handlers}
        >
            <div className="p-5 text-white select-none text-xl font-bold">Reading Mode</div>
            <div className="px-5 flex flex-col gap-y-4">
                <h3 className="text-gray-500 font-bold select-none text-5xl">{showNote.title.length > 0 ? showNote.title : 'No Title'}</h3>
                <p className="text-xl text-gray-300 break-words select-none leading-[1.4] pb-24">
                    {showNote.note}
                </p>
            </div>

            <button onClick={handleClose} className="fixed bottom-5 left-1/2 -translate-x-1/2 text-white font-bold text-lg rounded-xl px-3 py-2 bg-red-900 flex justify-center items-center gap-x-2">
                <span>
                    <XIcon />
                </span>
                <span>Close</span>
            </button>
        </motion.div>
    );
}

export default ReadingMode;