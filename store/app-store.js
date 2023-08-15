import { create } from "zustand";


const useAppStore = create((set) => ({

    notes: [],
    pinnedNotes: [],
    setNotes: (payload) => set(() => ({ notes: payload })),

    createNewNote: (payload) => set((state) => {

        let newNoteObj = {};
        let d = Date.now()
        newNoteObj._id = new Date().getTime();
        newNoteObj.color = 0;
        newNoteObj.title = payload.title;
        newNoteObj.note = payload.note;
        newNoteObj.createdAt = d;
        newNoteObj.updatedAt = d;
        newNoteObj.deletedAt = null;
        newNoteObj.isPinned = false;

        if (newNoteObj.note.length <= 120) {
            newNoteObj.size = 0;
        }

        if (newNoteObj.note.length > 120 && newNoteObj.note.length <= 200) {
            newNoteObj.size = 1;
        }

        if (newNoteObj.note.length > 200 && newNoteObj.note.length <= 300) {
            newNoteObj.size = 2;
        }

        if (newNoteObj.note.length > 300) {
            newNoteObj.size = 3;
        }


        return { notes: [newNoteObj, ...state.notes] }
    }),

    noteInBlurMode: null,
    setNoteInBlurMode: (payload) => set(() => ({ noteInBlurMode: payload })),

    newNoteEditorVis: false,
    setNewNoteEditorVis: (payload) => set(() => ({ newNoteEditorVis: payload }))
}))


export default useAppStore;