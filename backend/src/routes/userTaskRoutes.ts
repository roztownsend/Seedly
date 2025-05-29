import { Router, Response } from "express";

import {
  AuthenticatedRequest,
  authenticateUser,
} from "../middleware/authenticateUser";
import { getUserTasks } from "../services/getUserTasksService";

const router = Router();

router.get(
  "/",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user?.id) {
        throw new Error("Missing user ID");
      }
      const userTasks = await getUserTasks(req.user.id);
      res.status(200).json({ tasks: userTasks });
    } catch (error) {
      console.error("Unexpected error occured");
      res.status(500).json({ message: "Unexpected error occured" });
    }
  }
);

export default router;
