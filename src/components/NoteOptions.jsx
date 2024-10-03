import React, { useEffect, useState } from 'react'
import OptionsIcon from './Common/Icons/OptionsIcon'
import TrashIcon from './Common/Icons/TrashIcon'
import UnPinIcon from './Common/Icons/UnPinIcon'
import PinIcon from './Common/Icons/PinIcon'
import EditIcon from './Common/Icons/EditIcon'

function NoteOptions({ note, left, optionsHandlers, onTrash, onTogglePin, onEdit }) {

    return (
        <div
            style={{ left }}
            {...optionsHandlers} className="absolute transition-all duration-300 w-full top-0 bottom-0 backdrop-blur-[2px] rounded-xl flex items-center pb-4 justify-center gap-x-2">

            {note.deletedAt && (

                <button onClick={onTrash} className={`p-2 aspect-square shadow-md rounded-full bg-gray-100 text-gray-600 text-sm`}>
                    <div className="scale-90">
                        <OptionsIcon />
                    </div>
                </button>
            )}

            {!note.deletedAt && (
                <>


                    <button onClick={onTrash} className={`p-2 aspect-square shadow-md rounded-full bg-red-50 text-red-500 text-sm`}>
                        <div className="scale-90">
                            <TrashIcon />
                        </div>
                    </button>

                    <button onClick={onTogglePin} className="p-2 text-sm bg-gray-200 rounded-full shadow-md aspect-square fill-gray-600">


                        <div className="relative scale-90">
                            {note.isPinned ? (
                                <UnPinIcon />
                            ) : (
                                <PinIcon />
                            )}
                        </div>
                    </button>

                    <button onClick={onEdit} className="p-2 text-sm text-yellow-600 rounded-full shadow-md aspect-square bg-yellow-50">
                        <div className="scale-90">
                            <EditIcon />
                        </div>
                    </button>

                </>
            )}
        </div>
    )
}

export default NoteOptions