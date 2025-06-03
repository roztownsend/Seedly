"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserTask = void 0;
const userTask_model_1 = require("../models/userTask.model");
const updateUserTask = async (tasks, userId, transaction) => {
    try {
        const results = await Promise.all(tasks.map((task) => {
            return userTask_model_1.UserTask.update({ is_completed: task.is_completed }, {
                where: {
                    id: task.user_task_id,
                    user_id: userId,
                },
                transaction,
            });
        }));
        const totalAffected = results.reduce((sum, [count]) => sum + count, 0);
        return totalAffected;
    }
    catch (error) {
        console.error("Failed to update tasks", error);
        throw error;
    }
};
exports.updateUserTask = updateUserTask;
