import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const UseAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            userDetails: null,
            authToken: '',
            login: (user: any) => set({ isLoggedIn: true, userDetails: user.userDetails.data, authToken: user.userDetails.token }),
            logout: () => set({ isLoggedIn: false, userDetails: null, authToken: '' }),
        }),
        {
            name: 'auth',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default { UseAuthStore };
