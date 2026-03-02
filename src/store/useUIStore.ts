import { create } from "zustand";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface UIState {
  toasts: Toast[];
  cartDrawerOpen: boolean;
  quickViewProductId: string | null;
  mobileCartBarVisible: boolean;

  showToast: (message: string, type?: Toast["type"]) => void;
  hideToast: (id: string) => void;
  setCartDrawerOpen: (open: boolean) => void;
  setQuickViewProductId: (id: string | null) => void;
  setMobileCartBarVisible: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  toasts: [],
  cartDrawerOpen: false,
  quickViewProductId: null,
  mobileCartBarVisible: true,

  showToast: (message, type = "info") => {
    const id = Date.now().toString(36);
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3500);
  },

  hideToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
  setQuickViewProductId: (id) => set({ quickViewProductId: id }),
  setMobileCartBarVisible: (v) => set({ mobileCartBarVisible: v }),
}));
