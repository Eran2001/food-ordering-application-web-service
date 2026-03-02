import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Flame, Plus, Minus } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { useProductsStore } from "@/store/useProductsStore";
import { useCartStore } from "@/store/useCartStore";
import { formatLKR } from "@/lib/utils";
import { useState } from "react";
import type { SpiceLevel, Addon } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function QuickViewModal() {
  const productId = useUIStore((s) => s.quickViewProductId);
  const setProductId = useUIStore((s) => s.setQuickViewProductId);
  const products = useProductsStore((s) => s.products);
  const addons = useProductsStore((s) => s.addons);
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useUIStore((s) => s.showToast);

  const product = products.find((p) => p.id === productId);

  const [qty, setQty] = useState(1);
  const [spice, setSpice] = useState<SpiceLevel>("mild");
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [note, setNote] = useState("");

  const handleClose = () => {
    setProductId(null);
    setQty(1);
    setSpice("mild");
    setSelectedAddons([]);
    setNote("");
  };

  const handleAdd = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty,
      selectedSpice: spice,
      selectedAddons,
      note: note || undefined,
    });
    showToast(`${product.name} added to cart`, "success");
    handleClose();
  };

  const toggleAddon = (addon: Addon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const addonTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
  const lineTotal = product ? (product.price + addonTotal) * qty : 0;

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {product && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display">{product.name}</DialogTitle>
            </DialogHeader>

            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full aspect-video object-cover rounded-lg"
            />

            <div className="flex gap-2 flex-wrap">
              {product.isVeg && (
                <Badge variant="secondary" className="bg-lanka-leaf text-primary-foreground gap-1">
                  <Leaf className="h-3 w-3" /> Vegetarian
                </Badge>
              )}
              {product.spicyLevelsAllowed.includes("hot") && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground gap-1">
                  <Flame className="h-3 w-3" /> Spicy options
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground">{product.description}</p>
            <p className="text-lg font-semibold text-primary">{formatLKR(product.price)}</p>

            {/* Spice Level */}
            {product.spicyLevelsAllowed.length > 0 && (
              <div>
                <Label className="text-sm font-semibold mb-2 block">Spice Level</Label>
                <RadioGroup value={spice} onValueChange={(v) => setSpice(v as SpiceLevel)} className="flex gap-3">
                  {product.spicyLevelsAllowed.map((l) => (
                    <div key={l} className="flex items-center gap-1.5">
                      <RadioGroupItem value={l} id={`spice-${l}`} />
                      <Label htmlFor={`spice-${l}`} className="text-sm capitalize cursor-pointer">{l}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Add-ons */}
            {addons.length > 0 && (
              <div>
                <Label className="text-sm font-semibold mb-2 block">Add-ons</Label>
                <div className="space-y-2">
                  {addons.map((a) => (
                    <div key={a.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`addon-${a.id}`}
                          checked={selectedAddons.some((s) => s.id === a.id)}
                          onCheckedChange={() => toggleAddon(a)}
                        />
                        <Label htmlFor={`addon-${a.id}`} className="text-sm cursor-pointer">{a.name}</Label>
                      </div>
                      <span className="text-sm text-muted-foreground">+{formatLKR(a.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            <div>
              <Label className="text-sm font-semibold mb-2 block">Special Note</Label>
              <Textarea
                placeholder="Any special requests?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
              />
            </div>

            {/* Quantity + Add */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setQty(Math.max(1, qty - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <Button variant="outline" size="icon" onClick={() => setQty(qty + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleAdd} size="lg">
                Add {formatLKR(lineTotal)}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
