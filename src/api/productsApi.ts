import { mockFetch } from "./client";
import { categories, products, addons } from "./mockDb";
import type { Category, Product, Addon } from "@/types";

export function listCategories(): Promise<Category[]> {
  return mockFetch(() => [...categories].sort((a, b) => a.sortOrder - b.sortOrder));
}

export function listProducts(): Promise<Product[]> {
  return mockFetch(() => products.filter((p) => p.isAvailable));
}

export function getProduct(id: string): Promise<Product | null> {
  return mockFetch(() => products.find((p) => p.id === id) ?? null);
}

export function listAddons(): Promise<Addon[]> {
  return mockFetch(() => [...addons]);
}
