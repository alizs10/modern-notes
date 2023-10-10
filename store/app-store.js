import { create } from "zustand";


const useAppStore = create((set) => ({

    notes: [],
    setNotes: (payload) => set(() => ({ notes: payload })),

    searchRes: [],
    setSearchRes: (payload) => set(() => ({ searchRes: payload })),

    showSearchRes: false,
    setShowSearchRes: (payload) => set(() => ({ showSearchRes: payload })),

    createNewNote: (payload) => set((state) => {

        let newNoteObj = {};
        let d = Date.now()
        newNoteObj._id = new Date().getTime();
        newNoteObj.color = payload.color;
        newNoteObj.title = payload.title;
        newNoteObj.note = payload.note;
        newNoteObj.isPinned = false;
        newNoteObj.createdAt = d;
        newNoteObj.updatedAt = d;
        newNoteObj.deletedAt = null;

        return { notes: [newNoteObj, ...state.notes], showTrash: false }
    }),

    updateNote: (payload) => set((state) => {

        let { noteId, title, note, color, isPinned } = payload;

        let updatedAt = Date.now()
        let notesIns = [...state.notes]
        let updatableNoteIndex = notesIns.findIndex(n => n._id === noteId)
        notesIns[updatableNoteIndex] = { ...notesIns[updatableNoteIndex], title, note, color, isPinned, updatedAt }

        return { notes: notesIns, noteInBlurMode: null }
    }),

    deleteNote: (payload) => set((state) => {

        let { noteId } = payload;

        let notesIns = [...state.notes]
        let filteredNotes = notesIns.filter(n => n._id !== noteId)

        return { notes: filteredNotes, deleteNotePopupVis: false }
    }),

    trashNote: (payload) => set((state) => {

        let { noteId } = payload;

        let deletedAt = Date.now()
        let notesIns = [...state.notes]
        let updatableNoteIndex = notesIns.findIndex(n => n._id === noteId)
        notesIns[updatableNoteIndex] = { ...notesIns[updatableNoteIndex], deletedAt }

        return { notes: notesIns, deleteNotePopupVis: false }
    }),

    unTrashNote: (payload) => set((state) => {
        let { noteId } = payload;

        let notesIns = [...state.notes]
        let updatableNoteIndex = notesIns.findIndex(n => n._id === noteId)
        notesIns[updatableNoteIndex] = { ...notesIns[updatableNoteIndex], deletedAt: null }

        return { notes: notesIns, deleteNotePopupVis: false }
    }),

    pinNote: (payload) => set((state) => {

        let { noteId } = payload;

        let notesIns = [...state.notes]
        let updatableNoteIndex = notesIns.findIndex(n => n._id === noteId)
        notesIns[updatableNoteIndex] = { ...notesIns[updatableNoteIndex], isPinned: true }

        return { notes: notesIns }
    }),

    unPinNote: (payload) => set((state) => {

        let { noteId } = payload;

        let notesIns = [...state.notes]
        let updatableNoteIndex = notesIns.findIndex(n => n._id === noteId)
        notesIns[updatableNoteIndex] = { ...notesIns[updatableNoteIndex], isPinned: false }

        return { notes: notesIns }
    }),

    deleteNotePopupVis: false,
    setDeleteNotePopupVis: (payload) => set(() => ({ deleteNotePopupVis: payload })),

    menuVis: false,
    setMenuVis: (payload) => set(() => ({ menuVis: payload })),

    listMode: 0,
    setListMode: (payload) => set(() => ({ listMode: payload })),

    noteInBlurMode: null,
    setNoteInBlurMode: (payload) => set(() => ({ noteInBlurMode: payload })),

    newNoteEditorVis: false,
    setNewNoteEditorVis: (payload) => set(() => ({ newNoteEditorVis: payload })),

    showTrash: false,
    setShowTrash: (payload) => set(() => ({ showTrash: payload })),

    showAbout: false,
    setShowAbout: (payload) => set(() => ({ showAbout: payload })),

    showNote: null,
    setShowNote: (payload) => set(() => ({ showNote: payload })),

    showReadingMode: false,
    setShowReadingMode: (payload) => set(() => ({ showReadingMode: payload })),


    editNoteEditorVis: false,
    setEditNoteEditorVis: (payload) => set(() => ({ editNoteEditorVis: payload })),

    editableNote: null,
    setEditableNote: (payload) => set(() => ({ editableNote: payload })),


    notificationVis: true,
    setNotificationVis: (payload) => set(() => ({ notificationVis: payload })),

    notifications: [],
    setNotifications: (payload) => set(() => ({ notifications: payload })),
    addNotification: (payload) => set((state) => {

        let newNotify = payload

        let newNotifications = state.notifications.map(notify => ({ ...notify, index: notify.index + 1 }))

        return { notifications: [...newNotifications, newNotify] }
    }),
    removeNotification: (payload) => set((state) => {

        let noId = payload;
        let noIns = [...state.notifications]
        let filteredNotifications = noIns.filter(n => n._id !== noId)

        return { notifications: filteredNotifications }

    }),

    version: '1.0.0'
}))


export default useAppStore;