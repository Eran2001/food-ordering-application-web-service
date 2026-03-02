import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/useCartStore";
import { useOrdersStore } from "@/store/useOrdersStore";
import { useUIStore } from "@/store/useUIStore";
import { formatLKR } from "@/lib/utils";
import { storeSettings } from "@/api/mockDb";
import { customerDetailsSchema, addressSchema } from "@/lib/validators";
import { Check, Loader2 } from "lucide-react";
import type { PaymentMethod } from "@/types";

const STEPS = ["Details", "Address", "Payment", "Review"] as const;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const orderType = useCartStore((s) => s.orderType);
  const subtotal = useCartStore((s) => s.subtotal());
  const promoDiscount = useCartStore((s) => s.promoDiscount);
  const customerDraft = useCartStore((s) => s.customerDraft);
  const updateCustomerDraft = useCartStore((s) => s.updateCustomerDraft);
  const { placeOrder, status: orderStatus } = useOrdersStore();
  const showToast = useUIStore((s) => s.showToast);

  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const deliveryFee = orderType === "delivery" ? storeSettings.deliveryFee : 0;
  const discount = promoDiscount > 0 ? Math.round(subtotal * (promoDiscount / 100)) : 0;
  const total = subtotal + deliveryFee - discount;

  // Steps differ for pickup vs delivery
  const activeSteps = orderType === "pickup"
    ? STEPS.filter((s) => s !== "Address")
    : [...STEPS];

  const detailsForm = useForm({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: { name: customerDraft.name, phone: customerDraft.phone, email: customerDraft.email },
  });

  const addressForm = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: { address: customerDraft.address, city: customerDraft.city, landmark: customerDraft.landmark },
  });

  const handleNext = async () => {
    const currentStep = activeSteps[step];
    if (currentStep === "Details") {
      const valid = await detailsForm.trigger();
      if (!valid) return;
      const vals = detailsForm.getValues();
      updateCustomerDraft(vals);
    } else if (currentStep === "Address") {
      const valid = await addressForm.trigger();
      if (!valid) return;
      const vals = addressForm.getValues();
      updateCustomerDraft(vals);
    }
    setStep((s) => Math.min(s + 1, activeSteps.length - 1));
  };

  const handlePlace = async () => {
    try {
      const order = await placeOrder();
      showToast("Order placed successfully!", "success");
      navigate(`/order/${order.id}`);
    } catch {
      showToast("Failed to place order. Please try again.", "error");
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const currentStep = activeSteps[step];

  return (
    <div className="container py-6 max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {activeSteps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold transition-colors ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm hidden sm:inline ${i <= step ? "font-medium" : "text-muted-foreground"}`}>{s}</span>
            {i < activeSteps.length - 1 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Details Step */}
          {currentStep === "Details" && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold">Customer Details</h3>
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" {...detailsForm.register("name")} />
                {detailsForm.formState.errors.name && <p className="text-xs text-destructive mt-1">{detailsForm.formState.errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" {...detailsForm.register("phone")} />
                {detailsForm.formState.errors.phone && <p className="text-xs text-destructive mt-1">{detailsForm.formState.errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...detailsForm.register("email")} />
                {detailsForm.formState.errors.email && <p className="text-xs text-destructive mt-1">{detailsForm.formState.errors.email.message}</p>}
              </div>
            </div>
          )}

          {/* Address Step */}
          {currentStep === "Address" && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold">Delivery Address</h3>
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input id="address" {...addressForm.register("address")} />
                {addressForm.formState.errors.address && <p className="text-xs text-destructive mt-1">{addressForm.formState.errors.address.message}</p>}
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" {...addressForm.register("city")} />
                {addressForm.formState.errors.city && <p className="text-xs text-destructive mt-1">{addressForm.formState.errors.city.message}</p>}
              </div>
              <div>
                <Label htmlFor="landmark">Landmark</Label>
                <Input id="landmark" {...addressForm.register("landmark")} />
              </div>
            </div>
          )}

          {/* Payment Step */}
          {currentStep === "Payment" && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                {([
                  { value: "cod", label: "Cash on Delivery" },
                  { value: "card", label: "Card Payment" },
                  { value: "bank_transfer", label: "Bank Transfer" },
                ] as const).map((pm) => (
                  <div key={pm.value} className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value={pm.value} id={`pm-${pm.value}`} />
                    <Label htmlFor={`pm-${pm.value}`} className="cursor-pointer flex-1">{pm.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Review Step */}
          {currentStep === "Review" && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold">Review Order</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.qty}</span>
                    <span>{formatLKR((item.price + item.selectedAddons.reduce((s, a) => s + a.price, 0)) * item.qty)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatLKR(subtotal)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{deliveryFee > 0 ? formatLKR(deliveryFee) : "Free"}</span></div>
                {discount > 0 && <div className="flex justify-between text-lanka-leaf"><span>Discount</span><span>-{formatLKR(discount)}</span></div>}
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-primary">{formatLKR(total)}</span></div>
              <div className="text-sm text-muted-foreground">
                <p><strong>Name:</strong> {customerDraft.name}</p>
                <p><strong>Phone:</strong> {customerDraft.phone}</p>
                {orderType === "delivery" && <p><strong>Address:</strong> {customerDraft.address}, {customerDraft.city}</p>}
                <p><strong>Payment:</strong> {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "card" ? "Card" : "Bank Transfer"}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </Button>
        {currentStep === "Review" ? (
          <Button onClick={handlePlace} disabled={orderStatus === "loading"}>
            {orderStatus === "loading" && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Place Order
          </Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </div>
  );
}
