import { z } from "zod";

export const idSchema = z.string().uuid();

export const cycleEnum = z.enum(["Annual", "Biennial", "Perennial"]);

export const sunlightEnum = z.enum([
  "Full",
  "Full to part shade",
  "Partial shade to full shade",
]);

export const seedSchema = z.object({
  id: z.string().uuid(),
  product_name: z.string(),
  price: z.number(),
  description: z.string(),
  cycle: z.array(cycleEnum),
  image_url: z.string().url(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  isedible: z.boolean().nullable().optional(),
  sunlight: sunlightEnum,
});
