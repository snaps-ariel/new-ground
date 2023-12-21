import { create } from 'zustand'

interface IBearStore {
    bears: number;
    increasePopulation : (by:number) => void;
    removeAllBears : () => void;
}

const useBearStore = create<IBearStore>((set) => ({
    bears: 0,
    increasePopulation: (by) => set((state) => ({ bears: state.bears + by })),
    removeAllBears: () => set({ bears: 0 }),
}))

export default useBearStore