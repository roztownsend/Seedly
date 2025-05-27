import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenticateUser";
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
  if (user.app_metadata?.role !== "admin") {
    res.status(403).json({ message: "Forbidden: Admin privileged required." });
    return;
  }

  next();
};
