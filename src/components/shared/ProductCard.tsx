import { Plus, Leaf, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatLKR } from "@/lib/utils";
import type { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";

interface ProductCardProps {
  product: Product;
  onQuickView?: () => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useUIStore((s) => s.showToast);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      selectedSpice: product.spicyLevelsAllowed[0] ?? "mild",
      selectedAddons: [],
    });
    showToast(`${product.name} added to cart`, "success");
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div
        className="relative aspect-[4/3] overflow-hidden cursor-pointer"
        onClick={onQuickView}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {product.isVeg && (
            <Badge variant="secondary" className="bg-lanka-leaf text-primary-foreground gap-1 text-[10px]">
              <Leaf className="h-3 w-3" /> Veg
            </Badge>
          )}
          {product.spicyLevelsAllowed.includes("hot") && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground gap-1 text-[10px]">
              <Flame className="h-3 w-3" /> Spicy
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-sm truncate">{product.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-primary">{formatLKR(product.price)}</span>
          <Button size="sm" onClick={handleAdd} aria-label={`Add ${product.name} to cart`}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
