"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const authenticateUser_1 = require("../middleware/authenticateUser");
const sequelizeConnect_1 = __importDefault(require("../config/sequelizeConnect"));
const initModels_1 = require("../models/initModels");
const assignOrphanedPurchase_1 = require("../services/assignOrphanedPurchase");
const taskService_1 = require("../services/taskService");
(0, initModels_1.initModels)(sequelizeConnect_1.default);
const router = (0, express_1.Router)();
router.post("/link-tasks", authenticateUser_1.authenticateUser, async (req, res) => {
    const t = await sequelizeConnect_1.default.transaction();
    try {
        if (!req.user?.id || !req.user.email) {
            throw new Error("Missing user ID");
        }
        const orphanedPurchases = await (0, assignOrphanedPurchase_1.assignOrphanedPurchasesToUser)(req.user.id, req.user.email, t);
        console.log(orphanedPurchases);
        if (orphanedPurchases > 0) {
            await (0, taskService_1.linkUserTasks)(req.user.id, t);
        }
        await t.commit();
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        console.error("Transaction failed", error);
        await t.rollback();
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/complete-signup", authenticateUser_1.authenticateUser, async (req, res) => {
    console.log("User id - ", req.user?.id);
    console.log("User email - ", req.user?.email);
    const t = await sequelizeConnect_1.default.transaction();
    try {
        if (!req.user?.id || !req.user.email) {
            throw new Error("Missing user ID or email");
        }
        const newUser = await user_model_1.User.create({
            id: req.user?.id,
            email: req.user?.email,
        }, { transaction: t });
        if (!newUser) {
            throw new Error("User creation failed");
        }
        const orphanedPurchases = await (0, assignOrphanedPurchase_1.assignOrphanedPurchasesToUser)(req.user.id, req.user.email, t);
        if (orphanedPurchases > 0) {
            await (0, taskService_1.linkUserTasks)(req.user.id, t);
        }
        await t.commit();
        res.json({ data: req.user.email });
    }
    catch (error) {
        console.error("Transaction failed", error);
        await t.rollback();
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
