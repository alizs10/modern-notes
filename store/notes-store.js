import { create } from 'zustand'

const useNotesStore = create((set) => ({

    noteInBlurMode: null,
    setNoteInBlurMode: (payload) => set(() => ({ noteInBlurMode: payload }))
}))

export default useNotesStore;