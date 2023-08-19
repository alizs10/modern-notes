import InfoIcon from "../Common/Icons/InfoIcon";
import { motion } from 'framer-motion'

function Notification({ notification }) {


    function notificationStatus(status, part) {

        if (part === 0) {

            switch (status) {
                case 0:
                    return 'bg-emerald-700 text-white'
                    break;
                case 1:
                    return 'bg-red-800 text-white'
                    break;
                case 2:
                    return 'bg-yellow-600 text-white'
                    break;
                case 3:
                    return 'bg-gray-700 text-white'
                    break;

                default:
                    return 'bg-gray-700 text-white'
                    break;
            }
        }
        else {

            switch (status) {
                case 0:
                    return 'bg-emerald-800 text-white'
                    break;
                case 1:
                    return 'bg-red-900 text-white'
                    break;
                case 2:
                    return 'bg-yellow-700 text-white'
                    break;
                case 3:
                    return 'bg-gray-800 text-white'
                    break;

                default:
                    return 'bg-gray-800 text-white'
                    break;
            }
        }
    }


    let h = 0 + (notification.index) * 50;
    let startY = (notification.index + 1) * 250;

    return (
        <motion.div
            initial={{ y: -startY, left: '50%', x: '-50%' }}
            animate={{ y: h }}
            exit={{ opacity: [1, 0], scale: [1, 0] }}
            transition={{ duration: '.3', delay: '0.1' }}
            className={`${notificationStatus(notification.status, 0)} select-none fixed overflow-hidden whitespace-nowrap flex items-center top-5 z-30 text-white text-md font-bold rounded-full shadow-lg shadow-gray-900`}>
            <span className={`py-2 pl-3 pr-2 ${notificationStatus(notification.status, 1)}`}>
                <InfoIcon />
            </span>
            <span className="py-2 pr-3 pl-2">
                {notification.message}
            </span>
        </motion.div>
    )
}

export default Notification;