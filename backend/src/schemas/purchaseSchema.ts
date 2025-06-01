import { z } from 'zod';

export const purchaseSchema = z.object({
  userId: z.string(),
  totalItems: z.number().positive(),
  shippingPrice: z.number().positive(),
  totalAmount: z.number().positive()
  });