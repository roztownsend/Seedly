import { Router, Request, Response } from "express";
import { pool } from "../config/dbConnection";
import { z } from "zod";
import { purchaseSchema } from "../schemas/purchaseSchema";
import { paymentSchema } from "schemas/paymentSchema";
import { Purchase } from "../models/purchase.model";
import { PurchaseItem } from "../models/purchaseItem.model";
import { authenticateUser } from "../middleware/authenticateUser";

const router = Router();

router.post(
  "/purchase",
  authenticateUser,
  async (req: Request, res: Response): Promise<void> => {
    console.log("POST /purchase triggered");
    try {
      const parsed = purchaseSchema.parse(req.body);

      const purchase = await Purchase.create({
        user_id: parsed.userId,
        total_items: parsed.cartItems,
      });

      purchase.addPurchaseItem();
      await Promise.all(
        parsed.cartItems.map((item) =>
          PurchaseItem.create({
            purchaseId: (purchase as any).id,
            ProductId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })
        )
      );

      res.status(201).json({
        message: "Purchase completed successfully",
        purchaseId: (purchase as any).id,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res
          .status(400)
          .json({ message: "Validation error", errors: err.errors });
      } else {
        console.error("Error in /purchase:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
);

router.post("/payment", async (req: Request, res: Response): Promise<void> => {
  console.log("POST /payment triggered");

  const parsed = paymentSchema.safeParse(req.body);

  // Check if the request body is valid according to the payment schema
  if (!parsed.success) {
    console.error("Validation failed for payment:", parsed.error.format());
    res.status(400).json({
      error: "Invalid payment data",
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

    res.status(200).json({ message: "Payment stored (no sensitive data)" });
  } catch (error) {
    console.error("Database insert error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
