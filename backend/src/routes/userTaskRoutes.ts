import { Router, Response } from "express";

import {
  AuthenticatedRequest,
  authenticateUser,
} from "../middleware/authenticateUser";
import sequelize from "../config/sequelizeConnect";
import { Transaction, where } from "sequelize";
import { UserTask } from "../models/userTask.model";

const router = Router();

router.get(
  "/",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    const t: Transaction = await sequelize.transaction();
    try {
      if (!req.user?.id) {
        throw new Error("Missing user ID");
      }
      const userTasks = await UserTask.findAll({
        where: { user_id: req.user.id },
      });
      res.json({ data: userTasks });
    } catch (error) {}
  }
);

export default router;
