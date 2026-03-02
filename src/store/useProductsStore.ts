import { create } from "zustand";
import type { Category, Product, Addon, FetchStatus, SortOption, SpiceLevel } from "@/types";
import { listCategories, listProducts, listAddons } from "@/api/productsApi";

interface ProductsState {
  categories: Category[];
  products: Product[];
  addons: Addon[];
  status: FetchStatus;
  error: string | null;

  // Filters
  categoryId: string | null;
  search: string;
  vegOnly: boolean;
  spicyLevel: SpiceLevel | null;
  sort: SortOption;

  // Actions
  loadCatalog: (force?: boolean) => Promise<void>;
  setCategoryId: (id: string | null) => void;
  setSearch: (q: string) => void;
  setVegOnly: (v: boolean) => void;
  setSpicyLevel: (l: SpiceLevel | null) => void;
  setSort: (s: SortOption) => void;
  filteredProducts: () => Product[];
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  categories: [],
  products: [],
  addons: [],
  status: "idle",
  error: null,
  categoryId: null,
  search: "",
  vegOnly: false,
  spicyLevel: null,
  sort: "default",

  loadCatalog: async (force = false) => {
    const state = get();
    if (!force && state.status === "success") return;
    set({ status: "loading", error: null });
    try {
      const [cats, prods, adds] = await Promise.all([
        listCategories(),
        listProducts(),
        listAddons(),
      ]);
      set({ categories: cats, products: prods, addons: adds, status: "success" });
    } catch (e: any) {
      set({ status: "error", error: e?.message ?? "Failed to load catalog" });
    }
  },

  setCategoryId: (id) => set({ categoryId: id }),
  setSearch: (q) => set({ search: q }),
  setVegOnly: (v) => set({ vegOnly: v }),
  setSpicyLevel: (l) => set({ spicyLevel: l }),
  setSort: (s) => set({ sort: s }),

  filteredProducts: () => {
    const { products, categoryId, search, vegOnly, spicyLevel, sort } = get();
    let filtered = [...products];
    if (categoryId) filtered = filtered.filter((p) => p.categoryId === categoryId);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (vegOnly) filtered = filtered.filter((p) => p.isVeg);
    if (spicyLevel) filtered = filtered.filter((p) => p.spicyLevelsAllowed.includes(spicyLevel));

    switch (sort) {
      case "price-asc": filtered.sort((a, b) => a.price - b.price); break;
      case "price-desc": filtered.sort((a, b) => b.price - a.price); break;
      case "name-asc": filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "name-desc": filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
    }
    return filtered;
  },
}));
