import { useSwipeable } from "react-swipeable";
import useAppStore from "../../store/app-store";
import BackdropWrapper from "./Common/BackdropWrapper";
import { motion } from 'framer-motion'
import { config } from "../../libs/swipeable";

function About() {

    const handlers = useSwipeable({
        onSwipedDown: handleClose,
        ...config
    })

    const { setShowAbout, version } = useAppStore()

    function handleClose() {
        setShowAbout(false)
    }

    return (
        <BackdropWrapper handleClick={handleClose}>
            <motion.div
                initial={{ y: '100%', x: '-50%' }}
                animate={{ y: ['100%', '25%'] }}
                exit={{ y: '100%' }}
                transition={{ bounce: 'none', duration: '0.3' }}
                {...handlers}
                onClick={e => e.stopPropagation()}
                className="fixed bottom-0 left-1/2 w-full max-w-[600px] dark:bg-gray-900 bg-gray-100 p-16 rounded-t-[50px] flex flex-col gap-y-4">

                <div className="w-24 h-1 dark:bg-gray-500 bg-gray-300 rounded-full absolute top-2 left-1/2 -translate-x-1/2"></div>

                <h1 className="text-3xl dark:text-gray-500">About App
                    <span className="text-xs ml-2 text-gray-700">version: {version}</span>
                </h1>

                <p className="dark:text-gray-300 text-gray-700 text-3xl leading-[1.3]">
                    A Modern, Nice Looking and Useful Note App that <span className="dark:text-yellow-200 text-yellow-500">ACTUALLY</span> WORKS!
                </p>

                <p className="mt-4 dark:text-gray-300 text-gray-700 whitespace-pre-wrap text-lg">
                    Developed and designed by @alizs10
                </p>
                <p className="mt-10 dark:text-gray-300 text-gray-700 whitespace-pre-wrap text-lg text-center">2023</p>
            </motion.div>
        </BackdropWrapper>
    );
}

export default About;