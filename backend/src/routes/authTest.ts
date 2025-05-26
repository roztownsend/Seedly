//there are a few debug console.logs, shouldnt be touched

import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import { Purchase } from "../models/purchase.model";
import { ShippingInfo } from "../models/shippingInfo.model";
import {
  AuthenticatedRequest,
  authenticateUser,
} from "../middleware/authMiddleware";
import { sequelize } from "sequelizeDefinitions";
import { Transaction } from "sequelize";
interface UserType {
  id: string;
  email: string;
}
const router = Router();

router.post(
  "/complete-signup",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    console.log(req);
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
      console.log(newUser instanceof User);
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
