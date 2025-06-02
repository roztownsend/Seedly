import sequelize from "../config/sequelizeConnect";
import { Op } from "sequelize";
import { User } from "../models/user.model";
import { UserTask } from "../models/userTask.model";

type CountResult = { [totalUserCount: string]: string } | null;
type NewUserCountResult = { [newUserCount: string]: string } | null;
type CompletedTaskResult = { [taskCount: string]: string } | null;

export const usersDataService = async (start: Date, end: Date) => {
  try {
    const [totalUserCount, newUserCount, taskCount] = await Promise.all([
      User.findOne({
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("id")), "totalUserCount"],
        ],
        raw: true,
      }) as Promise<CountResult>,
      User.findOne({
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("id")), "newUserCount"],
        ],
        where: {
          createdAt: {
            [Op.between]: [start, end],
          },
        },
        raw: true,
      }) as Promise<NewUserCountResult>,
      UserTask.findOne({
        attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "taskCount"]],
        where: {
          is_completed: true,
          updatedAt: {
            [Op.between]: [start, end],
          },
        },
        raw: true,
      }) as Promise<CompletedTaskResult>,
    ]);

    const parsedTotalUserCount = totalUserCount?.totalUserCount
      ? parseInt(totalUserCount?.totalUserCount)
      : 0;
    const parsedNewUserCount = newUserCount?.newUserCount
      ? parseInt(newUserCount?.newUserCount)
      : 0;
    const parsedUserTasksCompleted = taskCount?.taskCount
      ? parseInt(taskCount?.taskCount)
      : 0;

    return {
      parsedNewUserCount,
      parsedTotalUserCount,
      parsedUserTasksCompleted,
    };
  } catch (error) {
    console.error("Unexpected error while fetching user data", error);
    throw error;
  }
};
