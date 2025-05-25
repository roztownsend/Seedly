//there are a few debug console.logs, shouldnt be touched

import { Router, Request, Response } from "express";
import { pool } from "../config/dbConnection";
import { z } from "zod";
import { Plant } from "../models/plant.model";
import { Task } from "../models/task.model";
import {
  AuthenticatedRequest,
  authenticateUser,
} from "../middleware/authMiddleware";
const router = Router();

router.post(
  "/",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    console.log(req);
    res.json({ data: req.user?.email });
  }
);

export default router;
