import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface I_LeadDetailsStore {
    // store
    selectedLead: any;
    // actions
    setLeadDetails: (lead: any) => void;
    resetLeadDetails: () => void;
}

export const LeadDetailsStore = create<I_LeadDetailsStore>((set) => ({
    selectedLead: null,
    setLeadDetails: (LeadDetails: any) => set((state: any) => ({ selectedLead: LeadDetails })),
    resetLeadDetails: () => set({ selectedLead: null }),
}));
