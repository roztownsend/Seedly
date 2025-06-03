"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkUserTasks = void 0;
const purchase_model_1 = require("../models/purchase.model");
const purchaseItem_model_1 = require("../models/purchaseItem.model");
const plant_model_1 = require("../models/plant.model");
const task_model_1 = require("../models/task.model");
const userTask_model_1 = require("../models/userTask.model");
const linkUserTasks = async (userId, transaction) => {
    try {
        const userPurchasesWithTasks = await purchase_model_1.Purchase.findAll({
            where: { user_id: userId },
            attributes: ["id"],
            include: [
                {
                    model: purchaseItem_model_1.PurchaseItem,
                    as: "purchase_items",
                    attributes: ["id"],
                    required: true,
                    include: [
                        {
                            model: plant_model_1.Plant,
                            as: "plant",
                            attributes: ["id"],
                            required: true,
                            include: [
                                {
                                    model: task_model_1.Task,
                                    as: "tasks",
                                    attributes: ["id"],
                                    required: false,
                                },
                            ],
                        },
                    ],
                },
            ],
            transaction,
            logging: console.log,
        });
        console.log(JSON.stringify(userPurchasesWithTasks, null, 2));
        const allTasksToAdd = [];
        for (const purchase of userPurchasesWithTasks) {
            if (purchase.purchase_items && purchase.purchase_items.length > 0) {
                for (const item of purchase.purchase_items) {
                    if (item.plant && item.plant.tasks && item.plant.tasks.length > 0) {
                        for (const task of item.plant.tasks) {
                            allTasksToAdd.push({
                                user_id: userId,
                                task_id: task.id,
                                purchase_id: purchase.id,
                            });
                        }
                    }
                }
            }
        }
        if (allTasksToAdd.length === 0) {
            console.log(`No new tasks to link for user ID ${userId}`);
        }
        await userTask_model_1.UserTask.bulkCreate(allTasksToAdd, {
            transaction,
            ignoreDuplicates: true,
        });
        console.log("NEW USER TASKS");
    }
    catch (error) {
        console.error(`Error during UserTask linking for user ID ${userId}`, error);
        throw error;
    }
};
exports.linkUserTasks = linkUserTasks;
