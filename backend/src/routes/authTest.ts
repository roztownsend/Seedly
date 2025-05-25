//there are a few debug console.logs, shouldnt be touched

import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import { Purchase } from "../models/purchase.model";
import { ShippingInfo } from "../models/shippingInfo.model";
import {
  AuthenticatedRequest,
  authenticateUser,
} from "../middleware/authMiddleware";
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
    if (req.user?.id && req.user.email) {
      const newUser = await User.create({
        id: req.user?.id,
        email: req.user?.email,
      });
      const purchases = await Purchase.findAll({
        include: [
          {
            model: ShippingInfo,
            as: "shipping_info",
            where: { email: req.user.email },
          },
        ],
      });
      for (const purchase of purchases) {
        try {
          purchase.user_id = req.user.id;
          await purchase.save();
          console.log("updated purchase");
        } catch (error) {
          console.error("Failed to update purchase", error);
        }
      }
      console.log(newUser instanceof User);
    } else {
      res.json({ message: "Error creating new user" });
    }

    res.json({ data: req.user?.email });
  }
);

export default router;
