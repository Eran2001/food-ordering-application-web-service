// ── LankaBites Type Definitions ──

export type SpiceLevel = "mild" | "medium" | "hot";

export interface Category {
  id: string;
  name: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  tags: string[];
  isAvailable: boolean;
  isVeg: boolean;
  spicyLevelsAllowed: SpiceLevel[];
  createdAt: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  qty: number;
  selectedSpice: SpiceLevel;
  selectedAddons: Addon[];
  note?: string;
}

export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "rejected";

export type PaymentMethod = "cod" | "card" | "bank_transfer";

export type OrderType = "delivery" | "pickup";

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  type: OrderType;
  paymentMethod: PaymentMethod;
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  landmark?: string;
  scheduledTime?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export interface CustomerDraft {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  landmark: string;
}

export interface StoreSettings {
  isOpen: boolean;
  deliveryFee: number;
  phone: string;
  address: string;
  minOrderAmount: number;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  minOrder: number;
  active: boolean;
}

export type FetchStatus = "idle" | "loading" | "success" | "error";

export type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
