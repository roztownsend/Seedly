import { Router, Response } from "express";

import {
  AuthenticatedRequest,
  authenticateUser,
} from "../middleware/authenticateUser";
import { getUserTasks } from "../services/getUserTasksService";
import sequelize from "../config/sequelizeConnect";
import { initModels } from "../models/initModels";
import { Transaction } from "sequelize";
import { updateUserTask } from "../services/updateUserTaskService";
const router = Router();

initModels(sequelize);

type TaskUpdateBody = {
  user_task_id: string;
  is_completed: boolean;
};

router.get(
  "/",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user?.id) {
        res.json({ message: "Missing user ID" });
        return;
      }
      const userTasks = await getUserTasks(req.user.id);
      console.log("DONE FETCHING TASKS!");
      res.status(200).json({ tasks: userTasks });
    } catch (error) {
      console.error("Unexpected error occured");
      res.status(500).json({ message: "Unexpected error occured" });
    }
  }
);

router.put(
  "/update",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    const t: Transaction = await sequelize.transaction();
    const tasksToUpdate: TaskUpdateBody[] = req.body;

    if (!req.user?.id) {
      throw new Error("Missing user ID");
    }

    try {
      const amountOfUpdatedTasks = await updateUserTask(
        tasksToUpdate,
        req.user?.id,
        t
      );
      if (amountOfUpdatedTasks <= 0) {
        res.status(404).json({ message: "No tasks were updated" });
        throw new Error("No tasks were updated");
      }
      await t.commit();
      res.status(200).json({
        message: `${amountOfUpdatedTasks} task(s) successfully updated`,
      });
    } catch (error) {
      await t.rollback();
      console.error("Unexpected error occured");
      res.status(500).json({ message: "Unexpected error occured" });
    }
  }
);

export default router;
