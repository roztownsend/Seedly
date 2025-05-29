import { Transaction } from "sequelize";
import { UserTask } from "../models/userTask.model";
import { count } from "console";
interface TaskUpdateBody {
  user_task_id: string;
  is_completed: boolean;
}

export const updateUserTask = async (
  tasks: TaskUpdateBody[],
  userId: string,
  transaction: Transaction
) => {
  try {
    const results = await Promise.all(
      tasks.map((task) => {
        return UserTask.update(
          { is_completed: task.is_completed },
          {
            where: {
              id: task.user_task_id,
              user_id: userId,
            },
            transaction,
          }
        );
      })
    );
    const totalAffected = results.reduce((sum, [count]) => sum + count, 0);
    return totalAffected;
  } catch (error) {
    console.error("Failed to update tasks", error);
    throw error;
  }
};
