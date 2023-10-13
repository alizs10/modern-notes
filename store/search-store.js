import { create } from 'zustand'

const useSearchStore = create((set) => ({

    searchRes: [],
    setSearchRes: (payload) => set(() => ({ searchRes: payload })),

    showSearchRes: false,
    setShowSearchRes: (payload) => set(() => ({ showSearchRes: payload })),

}))

export default useSearchStore;