import React, { useEffect, useState } from 'react'
import OptionsIcon from './Common/Icons/OptionsIcon'
import TrashIcon from './Common/Icons/TrashIcon'
import UnPinIcon from './Common/Icons/UnPinIcon'
import PinIcon from './Common/Icons/PinIcon'
import EditIcon from './Common/Icons/EditIcon'

function NoteOptions({ note, left, optionsHandlers, setDeleteNotePopupVis, handleTogglePinNote, handleShowEditNoteEditor }) {

    return (
        <div
            style={{ left }}
            {...optionsHandlers} className="absolute transition-all duration-300 w-full top-0 bottom-0 backdrop-blur-[2px] rounded-xl flex items-end pb-4 justify-center gap-x-2">

            {note.deletedAt && (

                <button onClick={() => setDeleteNotePopupVis(true)} className={`p-2 aspect-square shadow-md rounded-full bg-gray-100 text-gray-600 text-sm`}>
                    <div className="scale-90">
                        <OptionsIcon />
                    </div>
                </button>
            )}

            {!note.deletedAt && (
                <>


                    <button onClick={() => setDeleteNotePopupVis(true)} className={`p-2 aspect-square shadow-md rounded-full bg-red-50 text-red-500 text-sm`}>
                        <div className="scale-90">
                            <TrashIcon />
                        </div>
                    </button>

                    <button onClick={handleTogglePinNote} className="p-2 aspect-square shadow-md rounded-full bg-gray-200 fill-gray-600 text-sm">


                        <div className="scale-90 relative">
                            {note.isPinned ? (
                                <UnPinIcon />
                            ) : (
                                <PinIcon />
                            )}
                        </div>
                    </button>

                    <button onClick={handleShowEditNoteEditor} className="p-2 aspect-square shadow-md rounded-full bg-yellow-50 text-yellow-600 text-sm">
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