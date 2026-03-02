import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { formatLKR } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Separator } from "@/components/ui/separator";
import { storeSettings } from "@/api/mockDb";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const orderType = useCartStore((s) => s.orderType);
  const setOrderType = useCartStore((s) => s.setOrderType);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const promoDiscount = useCartStore((s) => s.promoDiscount);

  const deliveryFee = orderType === "delivery" ? storeSettings.deliveryFee : 0;
  const discount = promoDiscount > 0 ? Math.round(subtotal * (promoDiscount / 100)) : 0;
  const total = subtotal + deliveryFee - discount;

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={<ShoppingBag className="h-16 w-16" />}
          title="Your cart is empty"
          description="Browse our menu and add some delicious items!"
          action={<Button asChild><Link to="/menu">Browse Menu</Link></Button>}
        />
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="font-display text-3xl font-bold">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Spice: {item.selectedSpice}
                    {item.selectedAddons.length > 0 && ` • ${item.selectedAddons.map((a) => a.name).join(", ")}`}
                  </p>
                  {item.note && <p className="text-xs text-muted-foreground italic mt-1">Note: {item.note}</p>}
                  <p className="font-semibold text-primary mt-2">
                    {formatLKR((item.price + item.selectedAddons.reduce((s, a) => s + a.price, 0)) * item.qty)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQty(item.id, item.qty - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.qty}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQty(item.id, item.qty + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-display text-lg font-semibold">Order Summary</h3>

            {/* Order type toggle */}
            <div className="flex rounded-lg border overflow-hidden">
              {(["delivery", "pickup"] as const).map((t) => (
                <button
                  key={t}
                  className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
                    orderType === t ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
                  }`}
                  onClick={() => setOrderType(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatLKR(subtotal)}</span></div>
              <div className="flex justify-between"><span>Delivery Fee</span><span>{deliveryFee > 0 ? formatLKR(deliveryFee) : "Free"}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-lanka-leaf"><span>Discount</span><span>-{formatLKR(discount)}</span></div>
              )}
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">{formatLKR(total)}</span>
            </div>

            <Button asChild size="lg" className="w-full">
              <Link to="/checkout">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
