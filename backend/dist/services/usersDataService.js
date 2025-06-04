"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersDataService = void 0;
const sequelizeConnect_1 = __importDefault(require("../config/sequelizeConnect"));
const sequelize_1 = require("sequelize");
const user_model_1 = require("../models/user.model");
const userTask_model_1 = require("../models/userTask.model");
const usersDataService = async (start, end) => {
    try {
        const [totalUserCount, newUserCount, taskCount] = await Promise.all([
            user_model_1.User.findOne({
                attributes: [
                    [sequelizeConnect_1.default.fn("COUNT", sequelizeConnect_1.default.col("id")), "totalUserCount"],
                ],
                raw: true,
            }),
            user_model_1.User.findOne({
                attributes: [
                    [sequelizeConnect_1.default.fn("COUNT", sequelizeConnect_1.default.col("id")), "newUserCount"],
                ],
                where: {
                    createdAt: {
                        [sequelize_1.Op.between]: [start, end],
                    },
                },
                raw: true,
            }),
            userTask_model_1.UserTask.findOne({
                attributes: [[sequelizeConnect_1.default.fn("COUNT", sequelizeConnect_1.default.col("id")), "taskCount"]],
                where: {
                    is_completed: true,
                    updatedAt: {
                        [sequelize_1.Op.between]: [start, end],
                    },
                },
                raw: true,
            }),
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
    }
    catch (error) {
        console.error("Unexpected error while fetching user data", error);
        throw error;
    }
};
exports.usersDataService = usersDataService;
