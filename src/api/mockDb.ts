import type { Category, Product, Addon, Order, PromoCode, StoreSettings } from "@/types";

// ── Categories ──
export const categories: Category[] = [
  { id: "rice", name: "Rice", sortOrder: 1 },
  { id: "kottu", name: "Kottu", sortOrder: 2 },
  { id: "fried-rice", name: "Fried Rice", sortOrder: 3 },
  { id: "biriyani", name: "Biriyani", sortOrder: 4 },
  { id: "drinks", name: "Drinks", sortOrder: 5 },
  { id: "desserts", name: "Desserts", sortOrder: 6 },
];

// ── Products ──
export const products: Product[] = [
  {
    id: "mix-rice",
    name: "Mix Rice",
    description: "A hearty plate of steamed rice with a selection of curries – dhal, chicken, pol sambol, and seasonal vegetables.",
    price: 650,
    categoryId: "rice",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    tags: ["popular"],
    isAvailable: true,
    isVeg: false,
    spicyLevelsAllowed: ["mild", "medium", "hot"],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "chicken-rice",
    name: "Chicken Rice",
    description: "Fragrant rice served with tender chicken curry, dhal, and fresh pol sambol.",
    price: 750,
    categoryId: "rice",
    imageUrl: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&h=300&fit=crop",
    tags: ["popular"],
    isAvailable: true,
    isVeg: false,
    spicyLevelsAllowed: ["mild", "medium", "hot"],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "fish-rice",
    name: "Fish Rice",
    description: "Rice plate with spicy fish curry, tempered dhal, and coconut sambol.",
    price: 700,
    categoryId: "rice",
    imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: false,
    spicyLevelsAllowed: ["mild", "medium", "hot"],
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "chicken-kottu",
    name: "Chicken Kottu",
    description: "Chopped roti stir-fried with chicken, vegetables, eggs, and aromatic spices on the hot griddle.",
    price: 850,
    categoryId: "kottu",
    imageUrl: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=400&h=300&fit=crop",
    tags: ["popular", "bestseller"],
    isAvailable: true,
    isVeg: false,
    spicyLevelsAllowed: ["mild", "medium", "hot"],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "egg-kottu",
    name: "Egg Kottu",
    description: "Classic kottu roti with scrambled eggs, vegetables, and a blend of Sri Lankan spices.",
    price: 650,
    categoryId: "kottu",
    imageUrl: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: false,
    spicyLevelsAllowed: ["mild", "medium", "hot"],
    createdAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "cheese-kottu",
    name: "Cheese Kottu",
    description: "Indulgent kottu roti loaded with melted cheese, chicken, and a special sauce.",
    price: 950,
    categoryId: "kottu",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    tags: ["popular"],
    isAvailable: true,
    isVeg: false,
    spicyLevelsAllowed: ["mild", "medium"],
    createdAt: "2024-01-04T00:00:00Z",
  },
  {
    id: "veg-kottu",
    name: "Vegetable Kottu",
    description: "A vegetarian delight – chopped roti with fresh vegetables, spices, and coconut milk.",
    price: 550,
    categoryId: "kottu",
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: true,
    spicyLevelsAllowed: ["mild", "medium", "hot"],
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "chicken-fried-rice",
    name: "Chicken Fried Rice",
    description: "Wok-fried rice with chicken, vegetables, soy sauce, and a fried egg on top.",
    price: 800,
    categoryId: "fried-rice",
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    tags: ["popular"],
    isAvailable: true,
    isVeg: false,
    spicyLevelsAllowed: ["mild", "medium", "hot"],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "egg-fried-rice",
    name: "Egg Fried Rice",
    description: "Simple and satisfying fried rice with scrambled eggs and fresh vegetables.",
    price: 600,
    categoryId: "fried-rice",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: false,
    spicyLevelsAllowed: ["mild", "medium"],
    createdAt: "2024-01-06T00:00:00Z",
  },
  {
    id: "seafood-fried-rice",
    name: "Seafood Fried Rice",
    description: "Premium fried rice with prawns, calamari, and crab sticks in a spicy wok sauce.",
    price: 1100,
    categoryId: "fried-rice",
    imageUrl: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: false,
    spicyLevelsAllowed: ["mild", "medium", "hot"],
    createdAt: "2024-01-07T00:00:00Z",
  },
  {
    id: "veg-fried-rice",
    name: "Vegetable Fried Rice",
    description: "Colorful wok-fried rice with mixed vegetables, tofu, and light soy seasoning.",
    price: 550,
    categoryId: "fried-rice",
    imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: true,
    spicyLevelsAllowed: ["mild", "medium"],
    createdAt: "2024-01-08T00:00:00Z",
  },
  {
    id: "chicken-biriyani",
    name: "Chicken Biriyani",
    description: "Aromatic basmati rice layered with spiced chicken, caramelized onions, and saffron.",
    price: 950,
    categoryId: "biriyani",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    tags: ["popular"],
    isAvailable: true,
    isVeg: false,
    spicyLevelsAllowed: ["mild", "medium", "hot"],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "lamb-biriyani",
    name: "Lamb Biriyani",
    description: "Slow-cooked lamb with fragrant biriyani rice, dried fruits, and a side of raita.",
    price: 1450,
    categoryId: "biriyani",
    imageUrl: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400&h=300&fit=crop",
    tags: ["premium"],
    isAvailable: true,
    isVeg: false,
    spicyLevelsAllowed: ["mild", "medium", "hot"],
    createdAt: "2024-01-09T00:00:00Z",
  },
  {
    id: "veg-biriyani",
    name: "Vegetable Biriyani",
    description: "Fragrant basmati rice with seasonal vegetables, paneer, and aromatic spices.",
    price: 750,
    categoryId: "biriyani",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: true,
    spicyLevelsAllowed: ["mild", "medium"],
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "faluda",
    name: "Faluda",
    description: "A refreshing dessert drink with rose syrup, vermicelli, basil seeds, and ice cream.",
    price: 350,
    categoryId: "drinks",
    imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
    tags: ["popular"],
    isAvailable: true,
    isVeg: true,
    spicyLevelsAllowed: [],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "mango-lassi",
    name: "Mango Lassi",
    description: "Creamy yoghurt smoothie blended with ripe mangoes and a hint of cardamom.",
    price: 300,
    categoryId: "drinks",
    imageUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: true,
    spicyLevelsAllowed: [],
    createdAt: "2024-01-11T00:00:00Z",
  },
  {
    id: "iced-tea",
    name: "Ceylon Iced Tea",
    description: "Chilled premium Ceylon tea with a squeeze of lime and a touch of honey.",
    price: 200,
    categoryId: "drinks",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: true,
    spicyLevelsAllowed: [],
    createdAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "fresh-lime",
    name: "Fresh Lime Juice",
    description: "Freshly squeezed lime juice served with sugar or salt on the side.",
    price: 180,
    categoryId: "drinks",
    imageUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: true,
    spicyLevelsAllowed: [],
    createdAt: "2024-01-13T00:00:00Z",
  },
  {
    id: "watalappam",
    name: "Watalappam",
    description: "Traditional Sri Lankan coconut custard pudding with jaggery and cardamom.",
    price: 250,
    categoryId: "desserts",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    tags: ["popular"],
    isAvailable: true,
    isVeg: true,
    spicyLevelsAllowed: [],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "kavum",
    name: "Kavum",
    description: "Deep-fried sweet oil cake made with rice flour and treacle – a festive favorite.",
    price: 200,
    categoryId: "desserts",
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: true,
    spicyLevelsAllowed: [],
    createdAt: "2024-01-14T00:00:00Z",
  },
  {
    id: "kokis",
    name: "Kokis",
    description: "Crispy, lace-patterned rice flour cookies – a beloved Sri Lankan New Year treat.",
    price: 180,
    categoryId: "desserts",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
    tags: [],
    isAvailable: true,
    isVeg: true,
    spicyLevelsAllowed: [],
    createdAt: "2024-01-15T00:00:00Z",
  },
];

// ── Addons ──
export const addons: Addon[] = [
  { id: "extra-egg", name: "Extra Egg", price: 80 },
  { id: "extra-cheese", name: "Extra Cheese", price: 120 },
  { id: "extra-chicken", name: "Extra Chicken", price: 200 },
  { id: "papadam", name: "Papadam", price: 50 },
  { id: "raita", name: "Raita", price: 100 },
  { id: "extra-gravy", name: "Extra Gravy", price: 80 },
];

// ── Promo Codes ──
export const promoCodes: PromoCode[] = [
  { code: "WELCOME10", discountPercent: 10, minOrder: 500, active: true },
  { code: "SPICY20", discountPercent: 20, minOrder: 1500, active: true },
];

// ── Store Settings ──
export const storeSettings: StoreSettings = {
  isOpen: true,
  deliveryFee: 250,
  phone: "+94 77 123 4567",
  address: "42 Galle Road, Colombo 03, Sri Lanka",
  minOrderAmount: 400,
};

// ── Orders (persisted via localStorage) ──
const ORDERS_KEY = "lankabites_orders";

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addOrder(order: Order) {
  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);
}

export function updateOrderStatus(orderId: string, status: Order["status"]) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = status;
    saveOrders(orders);
  }
  return orders[idx] ?? null;
}
