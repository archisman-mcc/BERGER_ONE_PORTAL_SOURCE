import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface I_EpcaCustomerStore {
    // store
    selectedCustomerProfile: any;
    // actions
    setCustomerProfile: (userProfile: any) => void;
    resetCustomerProfile: () => void;
}

export const EpcaCustomerStore = create<I_EpcaCustomerStore>((set) => ({
    selectedCustomerProfile: null,
    setCustomerProfile: (customerProfile: any) => set((state: any) => ({ selectedCustomerProfile: customerProfile })),
    resetCustomerProfile: () => set({ selectedCustomerProfile: null }),
}));

interface I_EpcaRsmApprovalDetailsStore {
    // store
    selectedEcpaRsmApprovalDetailsStore: any;
    // actions
    setEpcaRsmApprovalDetails: (approvalDetails: any) => void;
    resetEpcaRsmApprovalDetails: () => void;
}

export const EpcaRsmApprovalDetailsStore = create<I_EpcaRsmApprovalDetailsStore>((set) => ({
    selectedEcpaRsmApprovalDetailsStore: null,
    setEpcaRsmApprovalDetails: (rsmApprovalDetails: any) => set((state: any) => ({ selectedEcpaRsmApprovalDetailsStore: rsmApprovalDetails })),
    resetEpcaRsmApprovalDetails: () => set({ selectedEcpaRsmApprovalDetailsStore: null }),
}));

interface I_EpcaHoApprovalDetailsStore {
    // store
    selectedEcpaHoApprovalDetailsStore: any;
    // actions
    setEpcaHoApprovalDetails: (approvalDetails: any) => void;
    resetEpcaHoApprovalDetails: () => void;
}

export const EpcaHoApprovalDetailsStore = create<I_EpcaHoApprovalDetailsStore>((set) => ({
    selectedEcpaHoApprovalDetailsStore: null,
    setEpcaHoApprovalDetails: (customerProfile: any) => set((state: any) => ({ selectedEcpaHoApprovalDetailsStore: customerProfile })),
    resetEpcaHoApprovalDetails: () => set({ selectedEcpaHoApprovalDetailsStore: null }),
}));
