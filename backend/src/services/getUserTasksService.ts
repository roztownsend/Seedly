import { UserTask } from "../models/userTask.model";
import { Task } from "../models/task.model";
import { Plant } from "../models/plant.model";
import { User } from "../models/user.model";
import { Purchase } from "../models/purchase.model";

export const getUserTasks = async (userId: string) => {
  try {
    const userTaskObjects = await UserTask.findAll({
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
              attributes: ["product_name", "image_url"],
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
              attributes: ["purchase_date"],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });
    console.log(JSON.stringify(userTaskObjects, null, 2));
    return userTaskObjects;
  } catch (error) {
    console.error(`Error fetching tasks for user ${userId}`);
    throw error;
  }
};
