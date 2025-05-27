import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface I_EpcaDepotApprovalStore {
    // store
    selectedCustomerProfile: any;
    // actions
    setCustomerProfile: (userProfile: any) => void;
    resetCustomerProfile: () => void;
}

export const EpcaDepotApprovalStore = create<I_EpcaDepotApprovalStore>((set) => ({
    selectedCustomerProfile: null,
    setCustomerProfile: (customerProfile: any) => set((state: any) => ({ selectedCustomerProfile: customerProfile })),
    resetCustomerProfile: () => set({ selectedCustomerProfile: null }),
}));
