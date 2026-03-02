import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductsStore } from "@/store/useProductsStore";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLKR } from "@/lib/utils";
import { ArrowLeft, Leaf, Flame, Plus, Minus } from "lucide-react";
import type { SpiceLevel, Addon } from "@/types";
import { ProductCard } from "@/components/shared/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { products, addons, status, loadCatalog } = useProductsStore();
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useUIStore((s) => s.showToast);

  const [qty, setQty] = useState(1);
  const [spice, setSpice] = useState<SpiceLevel>("mild");
  const [selAddons, setSelAddons] = useState<Addon[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => { loadCatalog(); }, [loadCatalog]);

  const product = products.find((p) => p.id === id);
  const related = products.filter((p) => p.categoryId === product?.categoryId && p.id !== id).slice(0, 3);

  const toggleAddon = (a: Addon) =>
    setSelAddons((prev) =>
      prev.some((x) => x.id === a.id) ? prev.filter((x) => x.id !== a.id) : [...prev, a]
    );

  const handleAdd = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty,
      selectedSpice: spice,
      selectedAddons: selAddons,
      note: note || undefined,
    });
    showToast(`${product.name} added to cart`, "success");
  };

  if (status === "loading") {
    return (
      <div className="container py-8 space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="aspect-video w-full max-w-2xl rounded-lg" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h2 className="font-display text-2xl mb-4">Product not found</h2>
        <Button asChild><Link to="/menu">Back to Menu</Link></Button>
      </div>
    );
  }

  const addonTotal = selAddons.reduce((s, a) => s + a.price, 0);
  const lineTotal = (product.price + addonTotal) * qty;

  return (
    <div className="container py-6 space-y-8">
      <Button asChild variant="ghost" size="sm">
        <Link to="/menu"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Menu</Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.imageUrl} alt={product.name} className="w-full aspect-video object-cover rounded-xl" />

        <div className="space-y-6">
          <div>
            <div className="flex gap-2 mb-2">
              {product.isVeg && <Badge variant="secondary" className="bg-lanka-leaf text-primary-foreground gap-1"><Leaf className="h-3 w-3" /> Veg</Badge>}
              {product.spicyLevelsAllowed.includes("hot") && <Badge variant="secondary" className="bg-accent text-accent-foreground gap-1"><Flame className="h-3 w-3" /> Spicy</Badge>}
            </div>
            <h1 className="font-display text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground mt-2">{product.description}</p>
            <p className="text-2xl font-bold text-primary mt-3">{formatLKR(product.price)}</p>
          </div>

          {product.spicyLevelsAllowed.length > 0 && (
            <div>
              <Label className="font-semibold mb-2 block">Spice Level</Label>
              <RadioGroup value={spice} onValueChange={(v) => setSpice(v as SpiceLevel)} className="flex gap-3">
                {product.spicyLevelsAllowed.map((l) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <RadioGroupItem value={l} id={`d-spice-${l}`} />
                    <Label htmlFor={`d-spice-${l}`} className="capitalize cursor-pointer">{l}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {addons.length > 0 && (
            <div>
              <Label className="font-semibold mb-2 block">Add-ons</Label>
              <div className="space-y-2">
                {addons.map((a) => (
                  <div key={a.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`d-addon-${a.id}`} checked={selAddons.some((s) => s.id === a.id)} onCheckedChange={() => toggleAddon(a)} />
                      <Label htmlFor={`d-addon-${a.id}`} className="cursor-pointer">{a.name}</Label>
                    </div>
                    <span className="text-sm text-muted-foreground">+{formatLKR(a.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label className="font-semibold mb-2 block">Special Note</Label>
            <Textarea placeholder="Any special requests?" value={note} onChange={(e) => setNote(e.target.value)} rows={2} />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <Button variant="outline" size="icon" onClick={() => setQty(qty + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
            <Button onClick={handleAdd} size="lg" className="flex-1">
              Add to Cart — {formatLKR(lineTotal)}
            </Button>
          </div>
        </div>
      </div>

      {/* Related Items */}
      {related.length > 0 && (
        <section>
          <h2 className="font-display text-xl font-bold mb-4">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
