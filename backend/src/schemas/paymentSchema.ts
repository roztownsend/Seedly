import { z } from 'zod';

export const paymentSchema = z.object({
    cardholderName: z.string().min(1, 'Cardholder name is required'),
    expMonth: z.string().regex(/^\d{2}$/, 'Month must be 2 digits'),
    expYear: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
    saveCard: z.boolean().optional(),
    userId: z.string().uuid().optional(), // Optional if user is not logged in
});

export type PaymentFormData = z.infer<typeof paymentSchema>;