import { useEffect, useRef } from "react"

export default function useClickOutside(handler) {

    const domRef = useRef(null)


    useEffect(() => {

        function handleClickOutside(event) {

            if (domRef.current && !domRef.current.contains(event.target)) {
                handler()
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return domRef
}
