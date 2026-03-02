import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useOrdersStore } from "@/store/useOrdersStore";
import { OrderStatusTimeline } from "@/components/shared/OrderStatusTimeline";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLKR } from "@/lib/utils";
import { ArrowLeft, Clock } from "lucide-react";

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const { currentOrder, status, loadOrder } = useOrdersStore();

  useEffect(() => {
    if (id) loadOrder(id);
  }, [id, loadOrder]);

  if (status === "loading") {
    return (
      <div className="container py-8 max-w-2xl space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="container py-12 text-center">
        <h2 className="font-display text-2xl mb-4">Order not found</h2>
        <Button asChild><Link to="/">Go Home</Link></Button>
      </div>
    );
  }

  return (
    <div className="container py-6 max-w-2xl space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Home</Link>
      </Button>

      <div className="text-center space-y-2">
        <div className="text-4xl">🎉</div>
        <h1 className="font-display text-2xl font-bold">Order Confirmed!</h1>
        <p className="text-muted-foreground">Order ID: <span className="font-mono font-semibold">{currentOrder.id}</span></p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-display font-semibold mb-4">Order Status</h3>
            <OrderStatusTimeline currentStatus={currentOrder.status} orderType={currentOrder.type} />
            <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-muted text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                Estimated {currentOrder.type === "delivery" ? "delivery" : "pickup"}: <strong>30-45 mins</strong>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="font-display font-semibold">Order Summary</h3>
            <div className="space-y-2">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.qty}</span>
                  <span>{formatLKR((item.price + item.selectedAddons.reduce((s, a) => s + a.price, 0)) * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatLKR(currentOrder.subtotal)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{currentOrder.deliveryFee > 0 ? formatLKR(currentOrder.deliveryFee) : "Free"}</span></div>
              {currentOrder.discount > 0 && <div className="flex justify-between text-lanka-leaf"><span>Discount</span><span>-{formatLKR(currentOrder.discount)}</span></div>}
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">{formatLKR(currentOrder.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
