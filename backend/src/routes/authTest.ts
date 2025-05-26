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
} from "../middleware/authMiddleware";
import sequelize from "../config/sequelizeConnect";
import { Transaction } from "sequelize";

interface UserTaskType {
  user_id: string;
  task_id: string;
}

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
      const allTasks: Task[] = [];
      for (const purchase of userPurchasesWithTasks) {
        console.log(`Purchase ID: ${purchase.id}`);
        for (const item of purchase.purchase_items || []) {
          const plantId = item.plant_id;
          console.log(`Plant ID: ${plantId}`);
          if (item.plant?.tasks) {
            for (const task of item.plant.tasks) {
              allTasks.push(task);
              console.log(
                `Task ID - ${task.id}, Task description - ${task.description}`
              );
            }
          }
        }
      }
      try {
        await Promise.all(
          allTasks.map((task) => {
            const newTask: UserTaskType = {
              task_id: task.id,
              user_id: req.user!.id,
            };
            return UserTask.create(newTask, { transaction: t });
          })
        );
      } catch (error) {
        console.log("Error mapping and creating tasks");
        throw new Error("Failed to create task");
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
