//there are a few debug console.logs, shouldnt be touched

import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import { Purchase } from "../models/purchase.model";
import { ShippingInfo } from "../models/shippingInfo.model";
import { PurchaseItem } from "../models/purchaseItem.model";
import { Plant } from "../models/plant.model";
import { Task } from "../models/task.model";
import { UserTask } from "../models/userTask.model";
import {
  AuthenticatedRequest,
  authenticateUser,
} from "../middleware/authenticateUser";
import { authenticateAdmin } from "../middleware/authenticateAdmin";
import sequelize from "../config/sequelizeConnect";
import { Transaction } from "sequelize";
import { assignOrphanedPurchasesToUser } from "../services/assignOrphanedPurchase";
import { linkUserTasks } from "../services/taskService";

const router = Router();
router.post(
  "/link-tasks",
  authenticateUser,
  authenticateAdmin,
  async (req: AuthenticatedRequest, res: Response) => {
    const t: Transaction = await sequelize.transaction();
    try {
      if (!req.user?.id || !req.user.email) {
        throw new Error("Missing user ID");
      }

      const orphanedPurchases = await assignOrphanedPurchasesToUser(
        req.user.id,
        req.user.email,
        t
      );
      if (orphanedPurchases.length > 0) {
        await linkUserTasks(req.user.id, t);
      }

      await t.commit();
      res.json({ message: "success" });
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
      const orphPurchases = await assignOrphanedPurchasesToUser(
        req.user.id,
        req.user.email,
        t
      );

      await t.commit();
      res.json({ data: req.user.email });
    } catch (error) {
      console.error("Transaction failed", error);
      await t.rollback();
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
