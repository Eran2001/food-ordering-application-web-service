import { mockFetch } from "./client";
import { addOrder, getOrders, updateOrderStatus } from "./mockDb";
import type { Order, OrderStatus } from "@/types";

export function createOrder(order: Omit<Order, "id" | "createdAt" | "status">): Promise<Order> {
  return mockFetch(() => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    addOrder(newOrder);
    return newOrder;
  }, { failRate: 0.02 });
}

export function getOrder(id: string): Promise<Order | null> {
  return mockFetch(() => {
    const orders = getOrders();
    return orders.find((o) => o.id === id) ?? null;
  });
}

export function listAllOrders(): Promise<Order[]> {
  return mockFetch(() => getOrders().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
}

export function setOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
  return mockFetch(() => updateOrderStatus(id, status));
}
