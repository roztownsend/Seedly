import { Router, Request, Response } from 'express';
import { pool } from '../config/dbConnection';
import { z } from 'zod';
import { paymentSchema } from '../schemas/paymentSchema';

const router = Router();

// //POST shipping address and shipping option - ROS

// router.post('/shipping', async (_req: Request, res: Response): Promise<void> => {
//     console.log('POST /shipping triggered');
//     try {
//         //
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// POST payment information

// This route handles the payment information submission

router.post('/payment', async (req: Request, res: Response): Promise<void> => {

    console.log('POST /payment triggered');

    const parsed = paymentSchema.safeParse(req.body);

    // Check if the request body is valid according to the payment schema
    if (!parsed.success) {
        console.error('Validation failed for payment:', parsed.error.format());
        res.status(400).json({
            error: 'Invalid payment data',
            details: parsed.error.format(),
        });
        return;
    }

    const {
        cardholderName,
        expMonth,
        expYear,
        saveCard = false,
        userId = null,
    } = parsed.data;

    try {
        await pool.query(
            `INSERT INTO payments (
            user_id, cardholder_name, exp_month, exp_year, save_card, created_at
          ) VALUES ($1, $2, $3, $4, $5, NOW())`,
            [userId, cardholderName, expMonth, expYear, saveCard]
        );

        res.status(200).json({ message: 'Payment stored (no sensitive data)' });
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

export default router; 