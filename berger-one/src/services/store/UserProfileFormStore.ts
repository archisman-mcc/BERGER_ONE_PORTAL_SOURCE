import { create } from 'zustand';
interface I_UserProfileFormStore {
    // store
    selectedUser: any;
    // actions
    setUserProfileForm: (userForm: any) => void;
    resetUserProfileForm: () => void;
}

export const UserProfileFormStore = create<I_UserProfileFormStore>((set) => ({
    selectedUser: null,
    setUserProfileForm: (userdata: any) => set(() => ({ selectedUser: userdata })),
    resetUserProfileForm: () => set({ selectedUser: null }),
}));
