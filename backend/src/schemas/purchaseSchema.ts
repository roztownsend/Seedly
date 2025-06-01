import { z } from 'zod';

export const purchaseItemSchema = z.object({
  quantity: z.number().positive(),
  plantId: z.string()
});

export const shippingInfoSchema = z.object({
  name: z.string(),
  email: z.string(),
  address: z.string(),
  apartment: z.string().optional(),
  postalCode: z.number(),
  city: z.string()
});

export const purchaseSchema = z.object({
  userId: z.string(),
  totalItems: z.number().positive(),
  shippingPrice: z.number().positive(),
  totalAmount: z.number().positive(),
  paymentMethod: z.string()
  });

