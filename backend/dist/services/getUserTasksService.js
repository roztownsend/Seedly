"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTasks = void 0;
const userTask_model_1 = require("../models/userTask.model");
const task_model_1 = require("../models/task.model");
const plant_model_1 = require("../models/plant.model");
const purchase_model_1 = require("../models/purchase.model");
const purchaseItem_model_1 = require("../models/purchaseItem.model");
const getUserTasks = async (userId) => {
    try {
        const userTaskObjects = await purchase_model_1.Purchase.findAll({
            where: { user_id: userId },
            attributes: ["id", "purchase_date"],
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
                            attributes: ["id", "product_name", "image_url"],
                            required: true,
                        },
                    ],
                },
                {
                    model: userTask_model_1.UserTask,
                    as: "user_tasks",
                    required: false,
                    attributes: ["id", "is_completed"],
                    include: [
                        {
                            model: task_model_1.Task,
                            as: "task",
                            required: true,
                            attributes: [
                                "id",
                                "description",
                                "start_month",
                                "end_month",
                                "plant_id",
                            ],
                        },
                    ],
                },
            ],
            order: [
                ["purchase_date", "DESC"],
                [
                    { model: userTask_model_1.UserTask, as: "user_tasks" },
                    { model: task_model_1.Task, as: "task" },
                    "start_month",
                    "ASC",
                ],
            ],
        });
        if (userTaskObjects.length <= 0) {
            return [];
        }
        const groupedTaskData = [];
        for (const purchase of userTaskObjects) {
            if (purchase.purchase_items && purchase.purchase_items.length > 0) {
                for (const item of purchase.purchase_items) {
                    const plantData = {
                        id: item.plant?.id,
                        image_url: item.plant?.image_url,
                        product_name: item.plant?.product_name,
                    };
                    const purchaseData = {
                        id: purchase.id,
                        purchase_date: purchase.purchase_date.toISOString(),
                    };
                    const tasksForThisPlantInThisPurchase = [];
                    if (purchase.user_tasks && purchase.user_tasks.length > 0) {
                        for (const userTask of purchase.user_tasks) {
                            if (userTask.task && userTask.task.plant_id === item.plant?.id) {
                                tasksForThisPlantInThisPurchase.push({
                                    user_task_id: userTask.id,
                                    task_id: userTask.task.id,
                                    is_completed: userTask.is_completed,
                                    description: userTask.task.description,
                                    start_month: userTask.task.start_month,
                                    end_month: userTask.task.end_month,
                                });
                            }
                        }
                    }
                    groupedTaskData.push({
                        plant_data: plantData,
                        purchase_data: purchaseData,
                        tasks: tasksForThisPlantInThisPurchase,
                    });
                }
            }
        }
        return groupedTaskData;
    }
    catch (error) {
        console.error(`Error fetching tasks for user ${userId}`);
        throw error;
    }
};
exports.getUserTasks = getUserTasks;
