import { Check, Clock, ChefHat, PackageCheck, Truck, XCircle } from "lucide-react";
import type { OrderStatus } from "@/types";

const steps: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { status: "pending", label: "Order Placed", icon: <Clock className="h-4 w-4" /> },
  { status: "accepted", label: "Accepted", icon: <Check className="h-4 w-4" /> },
  { status: "preparing", label: "Preparing", icon: <ChefHat className="h-4 w-4" /> },
  { status: "ready", label: "Ready", icon: <PackageCheck className="h-4 w-4" /> },
  { status: "out_for_delivery", label: "On the Way", icon: <Truck className="h-4 w-4" /> },
  { status: "delivered", label: "Delivered", icon: <Check className="h-4 w-4" /> },
];

const statusOrder: OrderStatus[] = ["pending", "accepted", "preparing", "ready", "out_for_delivery", "delivered"];

interface OrderStatusTimelineProps {
  currentStatus: OrderStatus;
  orderType?: "delivery" | "pickup";
}

export function OrderStatusTimeline({ currentStatus, orderType = "delivery" }: OrderStatusTimelineProps) {
  if (currentStatus === "rejected") {
    return (
      <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
        <XCircle className="h-6 w-6" />
        <div>
          <p className="font-semibold">Order Rejected</p>
          <p className="text-sm">Sorry, your order was rejected. Please contact us for assistance.</p>
        </div>
      </div>
    );
  }

  const currentIdx = statusOrder.indexOf(currentStatus);
  const displaySteps = orderType === "pickup"
    ? steps.filter((s) => s.status !== "out_for_delivery")
    : steps;

  return (
    <div className="space-y-0">
      {displaySteps.map((step, i) => {
        const stepIdx = statusOrder.indexOf(step.status);
        const isActive = stepIdx <= currentIdx;
        const isCurrent = step.status === currentStatus;

        return (
          <div key={step.status} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full border-2 transition-colors ${
                  isActive
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                } ${isCurrent ? "ring-2 ring-primary/30 ring-offset-2" : ""}`}
              >
                {step.icon}
              </div>
              {i < displaySteps.length - 1 && (
                <div className={`w-0.5 h-8 ${isActive ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
            <div className="pt-1">
              <p className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
