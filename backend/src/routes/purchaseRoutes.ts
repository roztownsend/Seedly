import { Router, Request, Response } from "express";
import { pool } from "../config/dbConnection";
import { z } from "zod";
import { paymentSchema } from "../schemas/paymentSchema";
import { checkoutSchema } from "../schemas/checkoutSchema";
import { authenticateUser } from "../middleware/authenticateUser";
import sequelize from "../config/sequelizeConnect";
import { initModels } from "../models/initModels";
import { Transaction } from "sequelize";
import { processCheckout } from "../services/checkoutService";
import { linkUserTasks } from "../services/taskService";
const router = Router();

router.post(
  "/user",
  authenticateUser,
  async (req: Request, res: Response): Promise<void> => {
    console.log("POST /purchase triggered");
    const t: Transaction = await sequelize.transaction();
    try {
      const parsed = checkoutSchema.parse(req.body);

      await processCheckout(parsed, t);

      if (parsed.userId) {
        await linkUserTasks(parsed.userId, t);
      }

      await t.commit();
      res.status(200).json({ message: "Purchase completed successfuly" });
    } catch (err) {
      await t.rollback();
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

router.post(
  "/anon-user",
  async (req: Request, res: Response): Promise<void> => {
    console.log("POST /purchase triggered");
    const t: Transaction = await sequelize.transaction();
    try {
      const parsed = checkoutSchema.parse(req.body);

      await processCheckout(parsed, t);

      await t.commit();
      res.status(200).json({ message: "Purchase completed successfuly" });
    } catch (err) {
      await t.rollback();
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
