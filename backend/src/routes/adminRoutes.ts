import { Router, Response, Request } from "express";

import { authenticateUser } from "../middleware/authenticateUser";
import { authenticateAdmin } from "../middleware/authenticateAdmin";
import sequelize from "../config/sequelizeConnect";
import { Transaction } from "sequelize";
import { assignOrphanedPurchasesToUser } from "../services/assignOrphanedPurchase";
import { linkUserTasks } from "../services/taskService";

const router = Router();

router.get(
  "/",
  authenticateUser,
  authenticateAdmin,
  async (req: Request, res: Response) => {
    console.log("Admin route triggerd");
    res.json({ message: "This is todays sales" });
  }
);

export default router;
