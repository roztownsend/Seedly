"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dbConnection_1 = require("../config/dbConnection");
const zod_1 = require("zod");
const paymentSchema_1 = require("../schemas/paymentSchema");
const checkoutSchema_1 = require("../schemas/checkoutSchema");
const authenticateUser_1 = require("../middleware/authenticateUser");
const sequelizeConnect_1 = __importDefault(require("../config/sequelizeConnect"));
const checkoutService_1 = require("../services/checkoutService");
const taskService_1 = require("../services/taskService");
const router = (0, express_1.Router)();
router.post("/user", authenticateUser_1.authenticateUser, async (req, res) => {
    console.log("POST /purchase triggered");
    const t = await sequelizeConnect_1.default.transaction();
    try {
        const parsed = checkoutSchema_1.checkoutSchema.parse(req.body);
        await (0, checkoutService_1.processCheckout)(parsed, t);
        if (parsed.userId) {
            await (0, taskService_1.linkUserTasks)(parsed.userId, t);
        }
        await t.commit();
        res.status(200).json({ message: "Purchase completed successfuly" });
    }
    catch (err) {
        await t.rollback();
        if (err instanceof zod_1.z.ZodError) {
            res
                .status(400)
                .json({ message: "Validation error", errors: err.errors });
        }
        else {
            console.error("Error in /purchase:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
router.post("/anon-user", async (req, res) => {
    console.log("POST /purchase triggered");
    const t = await sequelizeConnect_1.default.transaction();
    try {
        const parsed = checkoutSchema_1.checkoutSchema.parse(req.body);
        await (0, checkoutService_1.processCheckout)(parsed, t);
        await t.commit();
        res.status(200).json({ message: "Purchase completed successfuly" });
    }
    catch (err) {
        await t.rollback();
        if (err instanceof zod_1.z.ZodError) {
            res
                .status(400)
                .json({ message: "Validation error", errors: err.errors });
        }
        else {
            console.error("Error in /purchase:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
router.post("/payment", async (req, res) => {
    console.log("POST /payment triggered");
    const parsed = paymentSchema_1.paymentSchema.safeParse(req.body);
    // Check if the request body is valid according to the payment schema
    if (!parsed.success) {
        console.error("Validation failed for payment:", parsed.error.format());
        res.status(400).json({
            error: "Invalid payment data",
            details: parsed.error.format(),
        });
        return;
    }
    const { cardholderName, expMonth, expYear, saveCard = false, userId = null, } = parsed.data;
    try {
        await dbConnection_1.pool.query(`INSERT INTO payments (
            user_id, cardholder_name, exp_month, exp_year, save_card, created_at
          ) VALUES ($1, $2, $3, $4, $5, NOW())`, [userId, cardholderName, expMonth, expYear, saveCard]);
        res.status(200).json({ message: "Payment stored (no sensitive data)" });
    }
    catch (error) {
        console.error("Database insert error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;
