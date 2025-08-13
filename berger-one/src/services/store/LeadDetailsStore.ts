import { create } from 'zustand';
interface I_LeadDetailsStore {
    // store
    selectedLead: any;
    // actions
    setLeadDetails: (lead: any) => void;
    resetLeadDetails: () => void;
}

export const LeadDetailsStore = create<I_LeadDetailsStore>((set) => ({
    selectedLead: null,
    setLeadDetails: (LeadDetails: any) => set(() => ({ selectedLead: LeadDetails })),
    resetLeadDetails: () => set({ selectedLead: null }),
}));
