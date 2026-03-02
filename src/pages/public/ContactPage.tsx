import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { contactFormSchema, type ContactFormData } from "@/lib/validators";
import { useUIStore } from "@/store/useUIStore";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  const showToast = useUIStore((s) => s.showToast);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    showToast("Message sent! We'll get back to you soon.", "success");
    reset();
  };

  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="font-display text-4xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you!
          </p>

          <div className="space-y-4">
            {[
              { icon: <MapPin className="h-5 w-5 text-primary" />, text: "42 Galle Road, Colombo 03, Sri Lanka" },
              { icon: <Phone className="h-5 w-5 text-primary" />, text: "+94 77 123 4567" },
              { icon: <Mail className="h-5 w-5 text-primary" />, text: "hello@lankabites.lk" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                {item.icon}
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="contact-name">Name *</Label>
                <Input id="contact-name" {...register("name")} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="contact-email">Email *</Label>
                <Input id="contact-email" type="email" {...register("email")} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea id="contact-message" rows={4} {...register("message")} />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
