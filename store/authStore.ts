import { create } from "zustand";

interface AuthState {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  username: null,
  login: (token, username) => {
    document.cookie = `token=${token}; path=/`;
    set({ token, username });
  },
  logout: () => {
    document.cookie = "token=; path=/; max-age=0";
    set({ token: null, username: null });
  },
}));
