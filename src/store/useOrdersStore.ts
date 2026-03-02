import { create } from "zustand";
import type { Order, FetchStatus } from "@/types";
import { createOrder, getOrder, listAllOrders, setOrderStatus } from "@/api/ordersApi";
import { useCartStore } from "./useCartStore";
import { storeSettings } from "@/api/mockDb";

interface OrdersState {
  currentOrder: Order | null;
  orders: Order[];
  status: FetchStatus;
  error: string | null;

  placeOrder: () => Promise<Order>;
  loadOrder: (id: string) => Promise<void>;
  adminLoadOrders: () => Promise<void>;
  adminUpdateStatus: (id: string, status: Order["status"]) => Promise<void>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  currentOrder: null,
  orders: [],
  status: "idle",
  error: null,

  placeOrder: async () => {
    const cart = useCartStore.getState();
    const sub = cart.subtotal();
    const deliveryFee = cart.orderType === "delivery" ? storeSettings.deliveryFee : 0;
    const discount = cart.promoDiscount > 0 ? Math.round(sub * (cart.promoDiscount / 100)) : 0;
    const total = sub + deliveryFee - discount;

    set({ status: "loading", error: null });
    try {
      const order = await createOrder({
        type: cart.orderType,
        paymentMethod: "cod",
        customerName: cart.customerDraft.name,
        phone: cart.customerDraft.phone,
        email: cart.customerDraft.email || undefined,
        address: cart.orderType === "delivery" ? cart.customerDraft.address : undefined,
        city: cart.orderType === "delivery" ? cart.customerDraft.city : undefined,
        landmark: cart.orderType === "delivery" ? cart.customerDraft.landmark : undefined,
        items: cart.items,
        subtotal: sub,
        deliveryFee,
        discount,
        total,
      });
      set({ currentOrder: order, status: "success" });
      cart.clearCart();
      return order;
    } catch (e: any) {
      set({ status: "error", error: e?.message ?? "Failed to place order" });
      throw e;
    }
  },

  loadOrder: async (id) => {
    set({ status: "loading", error: null });
    try {
      const order = await getOrder(id);
      set({ currentOrder: order, status: "success" });
    } catch (e: any) {
      set({ status: "error", error: e?.message ?? "Failed to load order" });
    }
  },

  adminLoadOrders: async () => {
    set({ status: "loading", error: null });
    try {
      const orders = await listAllOrders();
      set({ orders, status: "success" });
    } catch (e: any) {
      set({ status: "error", error: e?.message ?? "Failed to load orders" });
    }
  },

  adminUpdateStatus: async (id, status) => {
    // Optimistic update
    set((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }));
    try {
      await setOrderStatus(id, status);
    } catch {
      // Revert on failure – reload
      const orders = await listAllOrders();
      set({ orders });
    }
  },
}));
