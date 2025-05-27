import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface I_CustomerDetailsStore {
    // store
    selectedCustomer: any;
    // actions
    setCustomerDetails: (lead: any) => void;
    resetCustomerDetails: () => void;
}

export const CustomerDetailsStore = create<I_CustomerDetailsStore>((set) => ({
    selectedCustomer: null,
    setCustomerDetails: (CustomerDetails: any) => set((state: any) => ({ selectedCustomer: CustomerDetails })),
    resetCustomerDetails: () => set({ selectedCustomer: null }),
}));