"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topUsers = void 0;
const sequelizeConnect_1 = __importDefault(require("../config/sequelizeConnect"));
const user_model_1 = require("../models/user.model");
const purchase_model_1 = require("../models/purchase.model");
const sequelize_1 = require("sequelize");
const topUsers = async (start, end) => {
    try {
        const topUsersData = await user_model_1.User.findAll({
            attributes: [
                "email",
                "created_at",
                [sequelizeConnect_1.default.fn("COUNT", sequelizeConnect_1.default.col("purchases.id")), "purchaseCount"],
                [
                    sequelizeConnect_1.default.fn("SUM", sequelizeConnect_1.default.col("purchases.total_amount")),
                    "totalSpent",
                ],
            ],
            include: [
                {
                    model: purchase_model_1.Purchase,
                    as: "purchases",
                    attributes: [],
                    where: {
                        createdAt: {
                            [sequelize_1.Op.between]: [start, end],
                        },
                    },
                    required: true,
                },
            ],
            group: ["User.id", "User.email", "User.created_at"],
            order: [
                [sequelizeConnect_1.default.fn("SUM", sequelizeConnect_1.default.col("purchases.total_amount")), "DESC"],
            ],
            limit: 5,
            raw: true,
            subQuery: false,
        });
        return topUsersData;
    }
    catch (error) {
        console.error("Unexpected error while fetching top Users", error);
        throw error;
    }
};
exports.topUsers = topUsers;
