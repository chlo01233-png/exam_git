import {create} from 'zustand'

const useAuthStore = create((set) => ({
    token: sessionStorage.getItem("token") || null,
    loginId: sessionStorage.getItem("loginId") || null,
    login: (result) => {
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("loginId",result.id );
        set({ token: result.token, loginId: result.id });
    },
    logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("loginId");
        set({ token: null, loginId: null });
    },
}));

export default useAuthStore;