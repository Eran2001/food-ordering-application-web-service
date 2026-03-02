import { z } from "zod";

export const customerDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(9, "Enter a valid phone number").max(15),
  email: z.string().email("Enter a valid email").or(z.literal("")),
});

export const addressSchema = z.object({
  address: z.string().min(5, "Enter your delivery address"),
  city: z.string().min(2, "Enter your city"),
  landmark: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type CustomerDetailsFormData = z.infer<typeof customerDetailsSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
