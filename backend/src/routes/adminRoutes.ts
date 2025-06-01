import { Router, Response, Request } from "express";

import { authenticateUser } from "../middleware/authenticateUser";
import { authenticateAdmin } from "../middleware/authenticateAdmin";
import sequelize from "../config/sequelizeConnect";
import { Transaction, Op } from "sequelize";
import { Purchase } from "../models/purchase.model";

const router = Router();

interface DailyResults {
  totalAmount: string;
  orderCount: string;
}

router.get(
  "/sales/day",
  authenticateUser,
  authenticateAdmin,
  async (req: Request, res: Response) => {
    console.log("Admin route triggerd");
    const todayStart = new Date();
    const todayEnd = new Date();
    todayStart.setHours(0, 0, 0, 0);
    todayEnd.setHours(23, 59, 59, 999);
    const dailyResults = (await Purchase.findOne({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("total_amount")), "totalAmount"],
        [sequelize.fn("COUNT", sequelize.col("id")), "orderCount"],
      ],
      where: {
        purchase_date: {
          [Op.between]: [todayStart, todayEnd],
        },
      },
      raw: true,
    })) as DailyResults | null;

    res.json({
      revenue: {
        title: "Total Revenue",
        amount: dailyResults?.totalAmount
          ? parseFloat(dailyResults.totalAmount)
          : 0,
      },
      order: {
        title: "Number of Orders",
        orders: dailyResults?.orderCount
          ? parseFloat(dailyResults.orderCount)
          : 0,
      },
    });
  }
);

router.get(
  "/sales/week",
  authenticateUser,
  authenticateAdmin,
  async (req: Request, res: Response) => {
    console.log("Admin route triggerd");

    const weekStart = new Date();

    const day = weekStart.getDay();

    const diffToMonday = day === 0 ? -6 : 1 - day;

    weekStart.setDate(weekStart.getDate() + diffToMonday);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);

    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weeklyResult = await Purchase.findOne({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("total_amount")), "totalAmount"],
        [sequelize.fn("COUNT", sequelize.col("id")), "orderCount"],
      ],
      where: {
        purchase_date: {
          [Op.between]: [weekStart, weekEnd],
        },
      },
      raw: true,
    });

    res.json({
      weekly: weeklyResult,
    });
  }
);
router.get(
  "/sales/month",
  authenticateUser,
  authenticateAdmin,
  async (req: Request, res: Response) => {
    console.log("Admin route triggerd");
    const now = new Date();

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    monthStart.setHours(0, 0, 0, 0);

    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    monthEnd.setHours(23, 59, 59, 999);

    const monthlyResult = await Purchase.findOne({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("total_amount")), "totalAmount"],
        [sequelize.fn("COUNT", sequelize.col("id")), "orderCount"],
      ],
      where: {
        purchase_date: {
          [Op.between]: [monthStart, monthEnd],
        },
      },
      raw: true,
    });

    res.json({
      monthly: monthlyResult,
    });
  }
);

export default router;
