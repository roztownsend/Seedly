"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateUser_1 = require("../middleware/authenticateUser");
const getUserTasksService_1 = require("../services/getUserTasksService");
const sequelizeConnect_1 = __importDefault(require("../config/sequelizeConnect"));
const initModels_1 = require("../models/initModels");
const updateUserTaskService_1 = require("../services/updateUserTaskService");
const router = (0, express_1.Router)();
(0, initModels_1.initModels)(sequelizeConnect_1.default);
router.get("/", authenticateUser_1.authenticateUser, async (req, res) => {
    try {
        if (!req.user?.id) {
            res.json({ message: "Missing user ID" });
            return;
        }
        const userTasks = await (0, getUserTasksService_1.getUserTasks)(req.user.id);
        console.log("DONE FETCHING TASKS!");
        res.status(200).json({ tasks: userTasks });
    }
    catch (error) {
        console.error("Unexpected error occured");
        res.status(500).json({ message: "Unexpected error occured" });
    }
});
router.put("/update", authenticateUser_1.authenticateUser, async (req, res) => {
    const t = await sequelizeConnect_1.default.transaction();
    const tasksToUpdate = req.body;
    if (!req.user?.id) {
        throw new Error("Missing user ID");
    }
    try {
        const amountOfUpdatedTasks = await (0, updateUserTaskService_1.updateUserTask)(tasksToUpdate, req.user?.id, t);
        if (amountOfUpdatedTasks <= 0) {
            res.status(404).json({ message: "No tasks were updated" });
            throw new Error("No tasks were updated");
        }
        await t.commit();
        res.status(200).json({
            message: `${amountOfUpdatedTasks} task(s) successfully updated`,
        });
    }
    catch (error) {
        await t.rollback();
        console.error("Unexpected error occured");
        res.status(500).json({ message: "Unexpected error occured" });
    }
});
exports.default = router;
