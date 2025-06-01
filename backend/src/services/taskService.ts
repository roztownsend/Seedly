import { Purchase } from "../models/purchase.model";
import { PurchaseItem } from "../models/purchaseItem.model";
import { Plant } from "../models/plant.model";
import { Task } from "../models/task.model";
import { UserTask } from "../models/userTask.model";

import { Transaction } from "sequelize";

interface UserTaskType {
  user_id: string;
  task_id: string;
  purchase_id: string;
}
interface PurchaseWithTaskRow {
  purchase_items?: {
    plant?: {
      tasks?: {
        id: string;
      };
    };
  };
}
export const linkUserTasks = async (
  userId: string,
  transaction: Transaction
) => {
  try {
    const userPurchasesWithTasks = await Purchase.findAll({
      where: { user_id: userId },
      attributes: ["id"],
      include: [
        {
          model: PurchaseItem,
          as: "purchase_items",
          attributes: ["id"],
          required: true,
          include: [
            {
              model: Plant,
              as: "plant",
              attributes: ["id"],
              required: true,
              include: [
                {
                  model: Task,
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
    const allTasksToAdd: UserTaskType[] = [];
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

    await UserTask.bulkCreate(allTasksToAdd, {
      transaction,
      ignoreDuplicates: true,
    });

    console.log("NEW USER TASKS");
  } catch (error) {
    console.error(`Error during UserTask linking for user ID ${userId}`, error);
    throw error;
  }
};
