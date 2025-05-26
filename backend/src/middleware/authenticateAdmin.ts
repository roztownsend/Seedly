import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenticateUser";
import { supabaseAdmin } from "../config/supabaseClient";
import { User } from "../models/user.model";
export const authenticateAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = req.user;

  if (!user?.id) {
    res.status(401).json({ message: "Unauthorized: No user ID" });
    return;
  }

  try {
    const dbUser = await User.findByPk(user.id);
    if (!dbUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (dbUser.role !== "admin") {
      res.status(403).json({ message: "Forbidden: Admins only" });
      return;
    }
    next();
  } catch (error) {
    console.error("Unexpected sequelize error during admin auth", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
