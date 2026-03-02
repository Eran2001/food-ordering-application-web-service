import { useEffect } from "react";
import { useProductsStore } from "@/store/useProductsStore";
import { CategoryChips } from "@/components/shared/CategoryChips";
import { SearchBar } from "@/components/shared/SearchBar";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import type { SortOption } from "@/types";

export default function MenuPage() {
  const {
    categories, status, error,
    vegOnly, sort,
    loadCatalog, setVegOnly, setSort, filteredProducts,
  } = useProductsStore();

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const products = filteredProducts();

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold mb-1">Our Menu</h1>
        <p className="text-muted-foreground">Explore our authentic Sri Lankan dishes</p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <SearchBar />
        <CategoryChips categories={categories} />

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch id="veg-only" checked={vegOnly} onCheckedChange={setVegOnly} />
            <Label htmlFor="veg-only" className="text-sm cursor-pointer">Veg Only</Label>
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
              <SelectItem value="name-asc">Name: A → Z</SelectItem>
              <SelectItem value="name-desc">Name: Z → A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error state */}
      {status === "error" && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">{error}</p>
          <Button variant="outline" size="sm" onClick={() => loadCatalog(true)} className="ml-auto">
            Retry
          </Button>
        </div>
      )}

      <ProductGrid products={products} loading={status === "loading"} />
    </div>
  );
}
