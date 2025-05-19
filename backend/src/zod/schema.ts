import { z } from "zod";

export const idSchema = z.string().uuid();

export const seedSchema = z.object({
  id: z.string().uuid(),
  product_name: z.string(),
  price: z.number(),
  description: z.string(),
  cycle: z.string(),
  image_url: z.string().url(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
  isEdible: z.boolean().nullable().optional(),
  Sunlight: z.string().max(50).nullable().optional()
});

