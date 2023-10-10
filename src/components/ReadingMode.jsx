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

        <div className="bg-yellow-200">

            <motion.div
                initial={{ left: '200%', x: '-50%' }}
                animate={{ left: '50%', x: '-50%' }}
                exit={{ left: '200%' }}
                transition={{ duration: '0.3', bounce: 'none' }}
                className="z-40 h-screen w-full max-w-[600px] overflow-scroll fixed inset-0 dark:bg-gray-900 bg-gray-200 flex flex-col gap-y-2"
                {...handlers}
            >
                <div className="p-5 dark:text-white text-gray-800 select-none text-xl font-bold">Reading Mode</div>
                <div className="px-5 flex flex-col gap-y-4">
                    <h3 className="text-gray-500 font-bold select-none text-5xl">{showNote.title.length > 0 ? showNote.title : 'No Title'}</h3>
                    <pre className="text-xl whitespace-pre-wrap dark:text-gray-300 text-gray-700 break-words select-none leading-[1.4] pb-44">
                        {showNote.note}
                    </pre>
                </div>

            </motion.div>
            <motion.button
                initial={{ bottom: '-5rem' }}
                animate={{ bottom: '1.25rem' }}
                exit={{ bottom: '-5rem' }}
                onClick={handleClose} className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 text-white font-bold text-lg rounded-xl px-3 py-2 dark:bg-red-900 bg-red-600 flex justify-center items-center gap-x-2">
                <span>
                    <XIcon />
                </span>
                <span>Close</span>
            </motion.button>
        </div>

    );
}

export default ReadingMode;