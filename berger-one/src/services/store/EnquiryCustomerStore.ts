import { create } from 'zustand';

interface I_CustomerListStore {
    // store
    selectedCustomerProfile: any;
    // actions
    setCustomerProfile: (customerProfile: any) => void;
    resetCustomerProfile: () => void;
}
export const EnquiryCustomerStore = create<I_CustomerListStore>((set) => ({
    selectedCustomerProfile: null,
    setCustomerProfile: (customerProfile) => set(() => ({ selectedCustomerProfile: customerProfile })),
    resetCustomerProfile: () => set({ selectedCustomerProfile: null }),
}));
