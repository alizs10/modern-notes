import { AnimatePresence } from "framer-motion";
import useAppStore from "../../../store/app-store";
import Notification from "./Notification";

function Notifications() {

    const { notifications } = useAppStore()

    return (
        <AnimatePresence>
            {notifications.map((notification) => <Notification key={notification._id} notification={notification} />)}
        </AnimatePresence>
    );
}

export default Notifications;