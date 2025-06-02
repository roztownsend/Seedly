import { Router, Response, Request } from "express";

import { authenticateUser } from "../middleware/authenticateUser";
import { authenticateAdmin } from "../middleware/authenticateAdmin";
import sequelize from "../config/sequelizeConnect";
import { Transaction, Op } from "sequelize";
import { PurchaseItem } from "../models/purchaseItem.model";
import { Plant } from "../models/plant.model";
import { Purchase } from "../models/purchase.model";
import { Payment } from "../models/payment.model";
const router = Router();

interface SalesResults {
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
    })) as SalesResults | null;

    const totalAmount = parseFloat(dailyResults?.totalAmount || "0");
    const orderCount = parseInt(dailyResults?.orderCount || "0");

    const averageOrderValue = orderCount > 0 ? totalAmount / orderCount : 0;

    res.json({
      revenue: {
        title: "Total Revenue",
        amount: totalAmount,
      },
      order: {
        title: "Number of Orders",
        orders: orderCount,
      },
      averageOrderValue: {
        title: "Average order Value",
        value: averageOrderValue,
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

    const now = new Date();

    const currentDay = now.getDay();

    const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() + diffToMonday);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);

    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weeklyResult = (await Purchase.findOne({
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
    })) as SalesResults | null;

    const weeklytopPlants = await PurchaseItem.findAll({
      attributes: [
        [sequelize.col("plant.product_name"), "productName"],
        [sequelize.fn("SUM", sequelize.col("quantity")), "unitsSold"],
        [sequelize.literal(`SUM(quantity * "plant"."price")`), "revenue"],
      ],
      include: [
        {
          model: Plant,
          as: "plant",
          attributes: [],
        },
      ],
      group: ["plant.id", "plant.product_name"],
      order: [
        [sequelize.literal('SUM("quantity")'), "DESC"],
        [sequelize.literal('SUM(quantity * "plant"."price")'), "DESC"],
      ],
      limit: 5,
      raw: true,
    });
    console.log(weeklytopPlants);
    const totalAmount = parseFloat(weeklyResult?.totalAmount || "0");
    const orderCount = parseInt(weeklyResult?.orderCount || "0");

    const averageOrderValue = orderCount > 0 ? totalAmount / orderCount : 0;
    const topPlants = weeklytopPlants;

    res.json({
      generalInfo: [
        {
          type: "revenue",
          title: "Total Revenue",
          value: totalAmount,
        },
        {
          type: "orders",
          title: "Number of Orders",
          value: orderCount,
        },
        {
          type: "averageOrderValue",
          title: "Average Order Value",
          value: averageOrderValue,
        },
      ],
      topPlants: topPlants,
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

    const monthlyResult = (await Purchase.findOne({
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
    })) as SalesResults | null;

    const totalAmount = parseFloat(monthlyResult?.totalAmount || "0");
    const orderCount = parseInt(monthlyResult?.orderCount || "0");

    const averageOrderValue = orderCount > 0 ? totalAmount / orderCount : 0;

    res.json({
      revenue: {
        title: "Total Revenue",
        amount: totalAmount,
      },
      order: {
        title: "Number of Orders",
        orders: orderCount,
      },
      averageOrderValue: {
        title: "Average order Value",
        value: averageOrderValue,
      },
    });
  }
);

export default router;
