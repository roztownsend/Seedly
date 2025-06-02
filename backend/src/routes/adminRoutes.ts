import { Router, Response, Request } from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import { authenticateAdmin } from "../middleware/authenticateAdmin";
import { salesService } from "../services/salesService";
import { topSellingPlant } from "../services/topSellingPlantsService";
import { User } from "../models/user.model";
import sequelize from "../config/sequelizeConnect";
import { UserTask } from "../models/userTask.model";
import { Op } from "sequelize";
import { Purchase } from "../models/purchase.model";
import { topUsers } from "../services/topUsersService";
import { usersDataService } from "../services/usersDataService";
const router = Router();
type CountResult = { [totalUserCount: string]: string } | null;
type NewUserCountResult = { [newUserCount: string]: string } | null;
type CompletedTaskResult = { [taskCount: string]: string } | null;
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

    try {
      const { totalAmount, averageOrderValue, orderCount } = await salesService(
        todayStart,
        todayEnd
      );

      const topPlants = await topSellingPlant(todayStart, todayEnd);

      res.json({
        generalInfo: [
          {
            type: "revenue",
            title: "Revenue",
            value: totalAmount,
          },
          {
            type: "orders",
            title: "Number of Orders",
            value: orderCount,
          },
          {
            type: "averageOrderValue",
            title: "Average Purchase Amount",
            value: averageOrderValue,
          },
        ],
        topPlants: topPlants,
      });
    } catch (error) {
      console.error("Failed to fetch sales for today", error);
      res
        .status(500)
        .json({ message: "Unexpected error fetching sales today" });
    }
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

    try {
      const { totalAmount, averageOrderValue, orderCount } = await salesService(
        weekStart,
        weekEnd
      );

      const topPlants = await topSellingPlant(weekStart, weekEnd);

      res.json({
        generalInfo: [
          {
            type: "revenue",
            title: "Revenue",
            value: totalAmount,
          },
          {
            type: "orders",
            title: "Number of Orders",
            value: orderCount,
          },
          {
            type: "averageOrderValue",
            title: "Average Purchase Amount",
            value: averageOrderValue,
          },
        ],
        topPlants: topPlants,
      });
    } catch (error) {
      console.error("Failed to fetch weekly sales", error);
      res
        .status(500)
        .json({ mesage: "Unexpected error fetching weekly sales" });
    }
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

    try {
      const { totalAmount, averageOrderValue, orderCount } = await salesService(
        monthStart,
        monthEnd
      );

      const topPlants = await topSellingPlant(monthStart, monthEnd);

      res.json({
        generalInfo: [
          {
            type: "revenue",
            title: "Revenue",
            value: totalAmount,
          },
          {
            type: "orders",
            title: "Number of Orders",
            value: orderCount,
          },
          {
            type: "averageOrderValue",
            title: "Average Purchase Amount",
            value: averageOrderValue,
          },
        ],
        topPlants: topPlants,
      });
    } catch (error) {
      console.error("Failed to fetch sales for the month", error);
      res
        .status(500)
        .json({ message: "Unexpected error fetching mothly sales" });
    }
  }
);

router.get(
  "/users/day",
  authenticateUser,
  authenticateAdmin,
  async (req: Request, res: Response) => {
    console.log("Admin route triggerd");

    const todayStart = new Date();
    const todayEnd = new Date();
    todayStart.setHours(0, 0, 0, 0);
    todayEnd.setHours(23, 59, 59, 999);

    try {
      const topUsersData = await topUsers(todayStart, todayEnd);
      const {
        parsedNewUserCount,
        parsedTotalUserCount,
        parsedUserTasksCompleted,
      } = await usersDataService(todayStart, todayEnd);
      res.json({
        generalInfo: [
          {
            type: "totalUsers",
            title: "Total users",
            value: parsedTotalUserCount,
          },
          {
            type: "newSignups",
            title: "New Signups",
            value: parsedNewUserCount,
          },
          {
            type: "UserCompletedTasks",
            title: "User Completed Tasks",
            value: parsedUserTasksCompleted,
          },
        ],
        topUsers: topUsersData,
      });
    } catch (error) {
      console.error(
        "Unexpected error occured when fetching user daily data",
        error
      );
      res.status(500).json({
        message: "Unexpected error occured when fetching user daily data",
      });
    }
  }
);
router.get(
  "/users/week",
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
    try {
      const topUsersData = await topUsers(weekStart, weekEnd);
      const {
        parsedNewUserCount,
        parsedTotalUserCount,
        parsedUserTasksCompleted,
      } = await usersDataService(weekStart, weekEnd);
      res.json({
        generalInfo: [
          {
            type: "totalUsers",
            title: "Total users",
            value: parsedTotalUserCount,
          },
          {
            type: "newSignups",
            title: "New Signups",
            value: parsedNewUserCount,
          },
          {
            type: "UserCompletedTasks",
            title: "User Completed Tasks",
            value: parsedUserTasksCompleted,
          },
        ],
        topUsers: topUsersData,
      });
    } catch (error) {
      console.error(
        "Unexpected error occured when fetching user daily data",
        error
      );
      res.status(500).json({
        message: "Unexpected error occured when fetching user daily data",
      });
    }
  }
);
router.get(
  "/users/month",
  authenticateUser,
  authenticateAdmin,
  async (req: Request, res: Response) => {
    console.log("Admin route triggerd");
    const now = new Date();

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    monthStart.setHours(0, 0, 0, 0);

    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    monthEnd.setHours(23, 59, 59, 999);

    try {
      const topUsersData = await topUsers(monthStart, monthEnd);
      const {
        parsedNewUserCount,
        parsedTotalUserCount,
        parsedUserTasksCompleted,
      } = await usersDataService(monthStart, monthEnd);
      res.json({
        generalInfo: [
          {
            type: "totalUsers",
            title: "Total users",
            value: parsedTotalUserCount,
          },
          {
            type: "newSignups",
            title: "New Signups",
            value: parsedNewUserCount,
          },
          {
            type: "UserCompletedTasks",
            title: "User Completed Tasks",
            value: parsedUserTasksCompleted,
          },
        ],
        topUsers: topUsersData,
      });
    } catch (error) {
      console.error(
        "Unexpected error occured when fetching user daily data",
        error
      );
      res.status(500).json({
        message: "Unexpected error occured when fetching user daily data",
      });
    }
  }
);

export default router;
