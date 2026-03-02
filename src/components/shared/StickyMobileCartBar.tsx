import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatLKR } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

export function StickyMobileCartBar() {
  const items = useCartStore((s) => s.items);
  const itemCount = useCartStore((s) => s.itemCount());
  const subtotal = useCartStore((s) => s.subtotal());
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on cart/checkout pages or when empty
  if (items.length === 0 || ["/cart", "/checkout"].includes(location.pathname)) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <button
        onClick={() => navigate("/cart")}
        className="w-full flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground shadow-lg"
        aria-label="View cart"
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          <span className="font-medium text-sm">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
        </div>
        <span className="font-semibold">{formatLKR(subtotal)}</span>
      </button>
    </div>
  );
}
