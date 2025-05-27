import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface I_UserProfileStore {
    // store
    selectedUserProfile: any;
    // actions
    setUserProfile: (userProfile: any) => void;
    resatUserProfile: () => void;
}

export const UserProfileStore = create<I_UserProfileStore>((set) => ({
    selectedUserProfile: null,
    setUserProfile: (userProfile: any) => set((state: any) => ({ selectedUserProfile: userProfile })),
    resatUserProfile: () => set({ selectedUserProfile: null }),
}));
