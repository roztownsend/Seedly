import { Purchase } from "../models/purchase.model";
import { PurchaseItem } from "../models/purchaseItem.model";
import { Plant } from "../models/plant.model";
import { Task } from "../models/task.model";
import { UserTask } from "../models/userTask.model";

import { Transaction } from "sequelize";

interface UserTaskType {
  user_id: string;
  task_id: string;
}

export const linkUserTasks = async (
  userId: string,
  transaction: Transaction
): Promise<void> => {
  const userPurchasesWithTasks = await Purchase.findAll({
    where: { user_id: userId },
    include: [
      {
        model: PurchaseItem,
        as: "purchase_items",
        include: [
          {
            model: Plant,
            as: "plant",
            include: [
              {
                model: Task,
                as: "tasks",
              },
            ],
          },
        ],
      },
    ],
    transaction,
  });
  const allTasks: Task[] = [];
  for (const purchase of userPurchasesWithTasks) {
    console.log(`Purchase ID: ${purchase.id}`);
    for (const item of purchase.purchase_items || []) {
      const plantId = item.plant_id;
      console.log(`Plant ID: ${plantId}`);
      if (item.plant?.tasks) {
        for (const task of item.plant.tasks) {
          allTasks.push(task);
          console.log(
            `Task ID - ${task.id}, Task description - ${task.description}`
          );
        }
      }
    }
  }

  const uniqueTasksMap = new Map<string, Task>();

  for (const task of allTasks) {
    uniqueTasksMap.set(task.id, task);
  }

  const uniqueTasks = Array.from(uniqueTasksMap.values());

  const existingUserTasks = await UserTask.findAll({
    where: { user_id: userId },
    transaction,
  });
  const existingTaskIds = new Set<string>(
    existingUserTasks.map((ut) => ut.task_id)
  );

  const tasksToAdd = uniqueTasks.filter(
    (task) => !existingTaskIds.has(task.id)
  );

  try {
    await Promise.all(
      tasksToAdd.map((task) => {
        const newTask: UserTaskType = {
          user_id: userId,
          task_id: task.id,
        };
        console.log(`new task added ${task.id}`);
        return UserTask.create(newTask, { transaction });
      })
    );
  } catch (error) {
    console.log("Error mapping and creating tasks");
    throw error;
  }
};
