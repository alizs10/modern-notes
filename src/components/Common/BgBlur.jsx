import { AnimatePresence, motion } from "framer-motion";
import useAppStore from "../../../store/app-store";


function BgBlur() {

    const { deleteNotePopupVis, menuVis } = useAppStore()

    return (
        <AnimatePresence>
            {(deleteNotePopupVis || menuVis) && (
                <motion.div
                    initial={{ backdropFilter: 'blur(0px)' }}
                    animate={{ backdropFilter: 'blur(8px)' }}
                    exit={{ backdropFilter: 'blur(0px)' }}
                    transition={{ duration: '.7' }}
                    className="fixed inset-0 backdrop-blur z-[99]"></motion.div>
            )}
        </AnimatePresence>
    )
}

export default BgBlur;