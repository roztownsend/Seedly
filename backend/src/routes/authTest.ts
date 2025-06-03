import { Router, Response } from "express";
import { User } from "../models/user.model";
import {
  AuthenticatedRequest,
  authenticateUser,
} from "../middleware/authenticateUser";
import sequelize from "../config/sequelizeConnect";
import { initModels } from "../models/initModels";
import { Transaction } from "sequelize";
import { assignOrphanedPurchasesToUser } from "../services/assignOrphanedPurchase";
import { linkUserTasks } from "../services/taskService";

initModels(sequelize);
const router = Router();
router.post(
  "/link-tasks",
  authenticateUser,
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
      console.log(orphanedPurchases);
      if (orphanedPurchases > 0) {
        await linkUserTasks(req.user.id, t);
      }

      await t.commit();
      res.status(200).json({ message: "success" });
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
      const orphanedPurchases = await assignOrphanedPurchasesToUser(
        req.user.id,
        req.user.email,
        t
      );

      if (orphanedPurchases > 0) {
        await linkUserTasks(req.user.id, t);
      }
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
