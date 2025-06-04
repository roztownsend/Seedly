"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateUser_1 = require("../middleware/authenticateUser");
const authenticateAdmin_1 = require("../middleware/authenticateAdmin");
const salesService_1 = require("../services/salesService");
const topSellingPlantsService_1 = require("../services/topSellingPlantsService");
const topUsersService_1 = require("../services/topUsersService");
const usersDataService_1 = require("../services/usersDataService");
const router = (0, express_1.Router)();
router.get("/sales/day", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, async (req, res) => {
    console.log("Admin route triggerd");
    const todayStart = new Date();
    const todayEnd = new Date();
    todayStart.setHours(0, 0, 0, 0);
    todayEnd.setHours(23, 59, 59, 999);
    try {
        const { totalAmount, averageOrderValue, orderCount } = await (0, salesService_1.salesService)(todayStart, todayEnd);
        const topPlants = await (0, topSellingPlantsService_1.topSellingPlant)(todayStart, todayEnd);
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
    }
    catch (error) {
        console.error("Failed to fetch sales for today", error);
        res
            .status(500)
            .json({ message: "Unexpected error fetching sales today" });
    }
});
router.get("/sales/week", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, async (req, res) => {
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
        const { totalAmount, averageOrderValue, orderCount } = await (0, salesService_1.salesService)(weekStart, weekEnd);
        const topPlants = await (0, topSellingPlantsService_1.topSellingPlant)(weekStart, weekEnd);
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
    }
    catch (error) {
        console.error("Failed to fetch weekly sales", error);
        res
            .status(500)
            .json({ mesage: "Unexpected error fetching weekly sales" });
    }
});
router.get("/sales/month", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, async (req, res) => {
    console.log("Admin route triggerd");
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    monthStart.setHours(0, 0, 0, 0);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    monthEnd.setHours(23, 59, 59, 999);
    try {
        const { totalAmount, averageOrderValue, orderCount } = await (0, salesService_1.salesService)(monthStart, monthEnd);
        const topPlants = await (0, topSellingPlantsService_1.topSellingPlant)(monthStart, monthEnd);
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
    }
    catch (error) {
        console.error("Failed to fetch sales for the month", error);
        res
            .status(500)
            .json({ message: "Unexpected error fetching mothly sales" });
    }
});
router.get("/users/day", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, async (req, res) => {
    console.log("Admin route triggerd");
    const todayStart = new Date();
    const todayEnd = new Date();
    todayStart.setHours(0, 0, 0, 0);
    todayEnd.setHours(23, 59, 59, 999);
    try {
        const topUsersData = await (0, topUsersService_1.topUsers)(todayStart, todayEnd);
        const { parsedNewUserCount, parsedTotalUserCount, parsedUserTasksCompleted, } = await (0, usersDataService_1.usersDataService)(todayStart, todayEnd);
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
                    type: "userCompletedTasks",
                    title: "User Completed Tasks",
                    value: parsedUserTasksCompleted,
                },
            ],
            topUsers: topUsersData,
        });
    }
    catch (error) {
        console.error("Unexpected error occured when fetching user daily data", error);
        res.status(500).json({
            message: "Unexpected error occured when fetching user daily data",
        });
    }
});
router.get("/users/week", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, async (req, res) => {
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
        const topUsersData = await (0, topUsersService_1.topUsers)(weekStart, weekEnd);
        const { parsedNewUserCount, parsedTotalUserCount, parsedUserTasksCompleted, } = await (0, usersDataService_1.usersDataService)(weekStart, weekEnd);
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
                    type: "userCompletedTasks",
                    title: "User Completed Tasks",
                    value: parsedUserTasksCompleted,
                },
            ],
            topUsers: topUsersData,
        });
    }
    catch (error) {
        console.error("Unexpected error occured when fetching user daily data", error);
        res.status(500).json({
            message: "Unexpected error occured when fetching user daily data",
        });
    }
});
router.get("/users/month", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, async (req, res) => {
    console.log("Admin route triggerd");
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    monthStart.setHours(0, 0, 0, 0);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    monthEnd.setHours(23, 59, 59, 999);
    try {
        const topUsersData = await (0, topUsersService_1.topUsers)(monthStart, monthEnd);
        const { parsedNewUserCount, parsedTotalUserCount, parsedUserTasksCompleted, } = await (0, usersDataService_1.usersDataService)(monthStart, monthEnd);
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
                    type: "userCompletedTasks",
                    title: "User Completed Tasks",
                    value: parsedUserTasksCompleted,
                },
            ],
            topUsers: topUsersData,
        });
    }
    catch (error) {
        console.error("Unexpected error occured when fetching user daily data", error);
        res.status(500).json({
            message: "Unexpected error occured when fetching user daily data",
        });
    }
});
exports.default = router;
