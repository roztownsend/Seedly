import { z } from 'zod';

export const purchaseSchema = z.object({
  userId: z.string(),
  cartItems: z.array(z.object({
    productId: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
  })),
  shipping: z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string()
  }),
  payment: z.object({
    method: z.string(),
    transactionId: z.string().optional()
  })
});
