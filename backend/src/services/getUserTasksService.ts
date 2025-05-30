import { UserTask } from "../models/userTask.model";
import { Task } from "../models/task.model";
import { Plant } from "../models/plant.model";
import { User } from "../models/user.model";
import { Purchase } from "../models/purchase.model";
import { PurchaseItem } from "../models/purchaseItem.model";
import { CreationAttributes } from "sequelize";

interface UserTaskData {
  id: string;
  is_completed: boolean;
  task: {
    id: string;
    description: string;
    start_month: number;
    end_month: number;
    plant: {
      id: string;
      image_url: string;
      product_name: string;
    };
  };
  user: {
    purchases: {
      id: string;
      purchase_date: string;
    };
  };
}

interface Tasks {
  user_task_id: string;
  task_id: string;
  is_completed: boolean;
  description: string;
  start_month: number;
  end_month: number;
}

interface GroupedTaskData {
  plant_data: {
    id: string | undefined;
    image_url: string | null | undefined;
    product_name: string | undefined;
  };
  purchase_data: {
    id: string;
    purchase_date: string;
  };
  tasks: Tasks[];
}

export const getUserTasks = async (userId: string) => {
  try {
    const userTaskObjects = await Purchase.findAll({
      where: { user_id: userId },
      attributes: ["id", "purchase_date"],
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
              attributes: ["id", "product_name", "image_url"],
              required: true,
            },
          ],
        },
        {
          model: UserTask,
          as: "user_tasks",
          required: false,
          attributes: ["id", "is_completed"],
          include: [
            {
              model: Task,
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
          { model: UserTask, as: "user_tasks" },
          { model: Task, as: "task" },
          "start_month",
          "ASC",
        ],
      ],
    });

    if (userTaskObjects.length <= 0) {
      return [];
    }

    const groupedTaskData: GroupedTaskData[] = [];

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
          const tasksForThisPlantInThisPurchase: Tasks[] = [];

          if (purchase.user_tasks && purchase.user_tasks.length > 0) {
            for (const userTask of purchase.user_tasks) {
              if (userTask.task && userTask.task.plant_id === item.plant?.id) {
                tasksForThisPlantInThisPurchase.push({
                  user_task_id: userTask.id,
                  task_id: userTask.task.id,
                  is_completed: userTask.is_completed,
                  description: userTask.task.description!,
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
  } catch (error) {
    console.error(`Error fetching tasks for user ${userId}`);
    throw error;
  }
};
