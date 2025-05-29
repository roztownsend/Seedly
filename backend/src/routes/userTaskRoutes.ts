import { Router, Response } from "express";

import {
  AuthenticatedRequest,
  authenticateUser,
} from "../middleware/authenticateUser";
import sequelize from "../config/sequelizeConnect";
import { Transaction } from "sequelize";
import { UserTask } from "../models/userTask.model";
import { getUserTasks } from "../services/getUserTasksService";

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
      const userTasks = await getUserTasks(req.user.id, t);
      res.json(userTasks);
    } catch (error) {}
  }
);

export default router;
