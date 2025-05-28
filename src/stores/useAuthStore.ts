// stores/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  accessKey: string | null;
  isAuthenticated: boolean;
  email: string | null;
  setAccessKey: (key: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessKey: localStorage.getItem("accessKey"),
  isAuthenticated: !!localStorage.getItem("accessKey"),
  email: localStorage.getItem("email"),
  setAccessKey: (key, email) => {
    localStorage.setItem("accessKey", key);
    localStorage.setItem("email", email);
    set({ accessKey: key, isAuthenticated: true, email });
  },
  logout: () => {
    localStorage.removeItem("accessKey");
    localStorage.removeItem("email");
    set({ accessKey: null, isAuthenticated: false, email: null });
  },
}));
