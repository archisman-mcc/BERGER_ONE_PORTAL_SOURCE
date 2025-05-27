import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface I_UserProfileFormStore {
    // store
    selectedUser: any;
    // actions
    setUserProfileForm: (userForm: any) => void;
    resetUserProfileForm: () => void;
}

export const UserProfileFormStore = create<I_UserProfileFormStore>((set) => ({
    selectedUser: null,
    setUserProfileForm: (userdata: any) => set((state: any) => ({ selectedUser: userdata })),
    resetUserProfileForm: () => set({ selectedUser: null }),
}));
