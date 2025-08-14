import { create } from 'zustand';
interface I_CustomerDetailsStore {
    // store
    selectedCustomer: any;
    // actions
    setCustomerDetails: (lead: any) => void;
    resetCustomerDetails: () => void;
}

export const CustomerDetailsStore = create<I_CustomerDetailsStore>((set) => ({
    selectedCustomer: null,
    setCustomerDetails: (CustomerDetails: any) => set(() => ({ selectedCustomer: CustomerDetails })),
    resetCustomerDetails: () => set({ selectedCustomer: null }),
}));