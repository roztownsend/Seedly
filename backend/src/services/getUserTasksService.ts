import { UserTask } from "../models/userTask.model";
import { Task } from "../models/task.model";
import { Plant } from "../models/plant.model";
import { User } from "../models/user.model";
import { Purchase } from "../models/purchase.model";

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
    id: string;
    image_url: string;
    product_name: string;
  };
  purchase_data: {
    id: string;
    purchase_date: string;
  };
  tasks: Tasks[];
}

export const getUserTasks = async (userId: string) => {
  try {
    const userTaskObjects = (await UserTask.findAll({
      where: { user_id: userId },
      attributes: ["id", "is_completed"],
      include: [
        {
          model: Task,
          as: "task",
          required: true,
          attributes: ["id", "description", "start_month", "end_month"],
          include: [
            {
              model: Plant,
              as: "plant",
              required: false,
              attributes: ["id", "product_name", "image_url"],
            },
          ],
        },
        {
          model: User,
          as: "user",
          attributes: [],
          required: true,
          include: [
            {
              model: Purchase,
              as: "purchases",
              attributes: ["id", "purchase_date"],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    })) as unknown as UserTaskData[];

    if (userTaskObjects.length <= 0) {
      return [];
    }

    const groupedData = new Map<string, GroupedTaskData>();

    for (const userTask of userTaskObjects) {
      const plantId = userTask.task.plant.id;

      const groupKey = plantId;

      if (!groupedData.has(groupKey)) {
        groupedData.set(groupKey, {
          plant_data: {
            id: userTask.task.plant.id,
            image_url: userTask.task.plant.image_url,
            product_name: userTask.task.plant.product_name,
          },
          purchase_data: {
            id: userTask.user.purchases.id,
            purchase_date: userTask.user.purchases.purchase_date,
          },
          tasks: [],
        });
      }
      const currentGroup = groupedData.get(groupKey);

      currentGroup?.tasks.push({
        user_task_id: userTask.id,
        task_id: userTask.task.id,
        is_completed: userTask.is_completed,
        description: userTask.task.description,
        start_month: userTask.task.start_month,
        end_month: userTask.task.end_month,
      });
    }

    const formattedTasks = Array.from(groupedData.values());
    return formattedTasks;
  } catch (error) {
    console.error(`Error fetching tasks for user ${userId}`);
    throw error;
  }
};
