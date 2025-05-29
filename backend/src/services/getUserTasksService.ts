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
    console.log(JSON.stringify(userTaskObjects, null, 2));
    const formattedTasks = userTaskObjects.map((task) => ({
      user_task_data: {
        id: task.id,
        is_completed: task.is_completed,
        task_data: {
          id: task.task.id,
          description: task.task.description,
          start_month: task.task.start_month,
          end_month: task.task.end_month,
        },
        plant_data: {
          id: task.task.plant.id,
          image_url: task.task.plant.image_url,
          product_name: task.task.plant.product_name,
        },
        purchase_data: {
          id: task.user.purchases.id,
          purchase_date: task.user.purchases.purchase_date,
        },
      },
    }));
    return formattedTasks;
  } catch (error) {
    console.error(`Error fetching tasks for user ${userId}`);
    throw error;
  }
};
