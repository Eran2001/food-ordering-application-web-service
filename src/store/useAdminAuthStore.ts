import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as apiLogin, logout as apiLogout } from "@/api/adminApi";
import type { FetchStatus } from "@/types";

interface AdminAuthState {
  token: string | null;
  email: string | null;
  status: FetchStatus;
  error: string | null;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      token: null,
      email: null,
      status: "idle",
      error: null,

      isAuthenticated: () => !!get().token,

      login: async (email, password) => {
        set({ status: "loading", error: null });
        try {
          const res = await apiLogin(email, password);
          set({ token: res.token, email: res.email, status: "success" });
        } catch (e: any) {
          set({ status: "error", error: e?.message ?? "Login failed" });
          throw e;
        }
      },

      logout: async () => {
        await apiLogout();
        set({ token: null, email: null, status: "idle", error: null });
      },
    }),
    { name: "lankabites-admin-auth", partialize: (s) => ({ token: s.token, email: s.email }) }
  )
);
