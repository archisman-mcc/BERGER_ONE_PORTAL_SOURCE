import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface I_EnquriDetailsStore {
    // store
    selectedEnquriDetails: any;
    // actions
    setEnquriDetails: (enquriData: any) => void;
    resatEnquriDetails: () => void;
}

export const EnquriDetailsStore = create<I_EnquriDetailsStore>((set) => ({
    selectedEnquriDetails: null,
    setEnquriDetails: (enquriData: any) => set((state: any) => ({ selectedEnquriDetails: enquriData })),
    resatEnquriDetails: () => set({ selectedEnquriDetails: null }),
}));
