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
): Promise<void> => {
  const userPurchasesWithTasks = (await Purchase.findAll({
    where: { user_id: userId },
    attributes: [],
    include: [
      {
        model: PurchaseItem,
        as: "purchase_items",
        attributes: [],
        required: true,
        include: [
          {
            model: Plant,
            as: "plant",
            attributes: [],
            required: true,
            include: [
              {
                model: Task,
                as: "tasks",
                attributes: ["id"],
                required: true,
              },
            ],
          },
        ],
      },
    ],
    transaction,
    raw: true,
    nest: true,
  })) as PurchaseWithTaskRow[];
  console.log(JSON.stringify(userPurchasesWithTasks, null, 2));
  const uniqueTaskIds = new Set<string>();
  for (const row of userPurchasesWithTasks) {
    const taskId = row.purchase_items?.plant?.tasks?.id;
    if (taskId) {
      {
        uniqueTaskIds.add(taskId);
      }
    }
  }

  const allTaskIds = Array.from(uniqueTaskIds);

  const tasksToAdd: UserTaskType[] = allTaskIds.map((taskId) => ({
    user_id: userId,
    task_id: taskId,
  }));
};
