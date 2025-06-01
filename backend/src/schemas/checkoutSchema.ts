import { z } from "zod";

export const purchaseItemSchema = z.object({
  quantity: z.number().positive(),
  plantId: z.string(),
});

export const shippingInfoSchema = z.object({
  name: z.string(),
  email: z.string(),
  address: z.string(),
  apartment: z.string().optional(),
  postalCode: z.string(),
  city: z.string(),
  shippingOptionId: z.string(),
});

export const checkoutSchema = z.object({
  userId: z.string().nullable(),
  totalItems: z.number().positive(),
  shippingPrice: z.number().positive(),
  totalAmount: z.number().positive(),
  purchaseItems: z.array(purchaseItemSchema),
  paymentMethod: z.enum(["card", "swish", "klarna"]),
  shippingInfo: shippingInfoSchema,
});
