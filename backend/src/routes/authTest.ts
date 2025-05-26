//there are a few debug console.logs, shouldnt be touched

import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import { Purchase } from "../models/purchase.model";
import { ShippingInfo } from "../models/shippingInfo.model";
import { PurchaseItem } from "../models/purchaseItem.model";
import { Plant } from "../models/plant.model";
import { Task } from "../models/task.model";
import {
  AuthenticatedRequest,
  authenticateUser,
} from "../middleware/authMiddleware";
import sequelize from "../config/sequelizeConnect";
import { Transaction } from "sequelize";

const router = Router();
router.post(
  "/link-tasks",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    const t: Transaction = await sequelize.transaction();
    try {
      if (!req.user?.id) {
        throw new Error("Missing user ID");
      }
      const userPurchasesWithTasks = await Purchase.findAll({
        where: { user_id: req.user.id },
        include: [
          {
            model: PurchaseItem,
            as: "purchase_items",
            include: [
              {
                model: Plant,
                as: "plant",
                include: [
                  {
                    model: Task,
                    as: "tasks",
                  },
                ],
              },
            ],
          },
        ],
        transaction: t,
      });
      console.log(userPurchasesWithTasks);
      await t.commit();
    } catch (error) {
      console.error("Transaction failed", error);
      await t.rollback();
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
router.post(
  "/complete-signup",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    console.log(req);
    console.log("User id - ", req.user?.id);
    console.log("User email - ", req.user?.email);
    const t: Transaction = await sequelize.transaction();
    try {
      if (!req.user?.id || !req.user.email) {
        throw new Error("Missing user ID or email");
      }
      const newUser = await User.create(
        {
          id: req.user?.id,
          email: req.user?.email,
        },
        { transaction: t }
      );
      if (!newUser) {
        throw new Error("User creation failed");
      }
      const purchases = await Purchase.findAll({
        where: {
          user_id: null,
        },
        include: [
          {
            model: ShippingInfo,
            as: "shipping_info",
            where: { email: req.user.email },
          },
        ],
        transaction: t,
      });
      for (const purchase of purchases) {
        try {
          purchase.user_id = req.user.id;
          await purchase.save({ transaction: t });
          console.log("updated purchase");
        } catch (error) {
          console.error("Failed to update purchase", error);
          throw new Error("Failed to update purchase");
        }
      }

      await t.commit();
      res.json({ data: req.user?.email });
    } catch (error) {
      console.error("Transaction failed", error);
      await t.rollback();
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
