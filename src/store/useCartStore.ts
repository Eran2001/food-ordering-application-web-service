import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, OrderType, CustomerDraft, Addon, SpiceLevel } from "@/types";
import { promoCodes } from "@/api/mockDb";

interface CartState {
  items: CartItem[];
  orderType: OrderType;
  promoCode: string;
  promoDiscount: number;
  customerDraft: CustomerDraft;

  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  setSpice: (id: string, spice: SpiceLevel) => void;
  toggleAddon: (id: string, addon: Addon) => void;
  setNote: (id: string, note: string) => void;
  setOrderType: (type: OrderType) => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  updateCustomerDraft: (draft: Partial<CustomerDraft>) => void;
  clearCart: () => void;
  subtotal: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orderType: "delivery",
      promoCode: "",
      promoDiscount: 0,
      customerDraft: { name: "", phone: "", email: "", address: "", city: "", landmark: "" },

      addItem: (item) => {
        const id = `cart-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        set((s) => ({ items: [...s.items, { ...item, id }] }));
      },

      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0
            ? s.items.filter((i) => i.id !== id)
            : s.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),

      setSpice: (id, spice) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, selectedSpice: spice } : i)),
        })),

      toggleAddon: (id, addon) =>
        set((s) => ({
          items: s.items.map((i) => {
            if (i.id !== id) return i;
            const has = i.selectedAddons.some((a) => a.id === addon.id);
            return {
              ...i,
              selectedAddons: has
                ? i.selectedAddons.filter((a) => a.id !== addon.id)
                : [...i.selectedAddons, addon],
            };
          }),
        })),

      setNote: (id, note) =>
        set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, note } : i)) })),

      setOrderType: (type) => set({ orderType: type }),

      applyPromo: (code) => {
        const promo = promoCodes.find((p) => p.code === code.toUpperCase() && p.active);
        if (!promo) return false;
        const sub = get().subtotal();
        if (sub < promo.minOrder) return false;
        set({ promoCode: promo.code, promoDiscount: promo.discountPercent });
        return true;
      },

      clearPromo: () => set({ promoCode: "", promoDiscount: 0 }),

      updateCustomerDraft: (draft) =>
        set((s) => ({ customerDraft: { ...s.customerDraft, ...draft } })),

      clearCart: () =>
        set({
          items: [],
          promoCode: "",
          promoDiscount: 0,
          customerDraft: { name: "", phone: "", email: "", address: "", city: "", landmark: "" },
        }),

      subtotal: () =>
        get().items.reduce(
          (sum, i) => sum + (i.price + i.selectedAddons.reduce((a, ad) => a + ad.price, 0)) * i.qty,
          0
        ),

      itemCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: "lankabites-cart" }
  )
);
