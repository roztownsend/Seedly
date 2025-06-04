"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesService = void 0;
const purchase_model_1 = require("../models/purchase.model");
const sequelizeConnect_1 = __importDefault(require("../config/sequelizeConnect"));
const sequelize_1 = require("sequelize");
const salesService = async (start, end) => {
    const result = (await purchase_model_1.Purchase.findOne({
        attributes: [
            [sequelizeConnect_1.default.fn("SUM", sequelizeConnect_1.default.col("total_amount")), "totalAmount"],
            [sequelizeConnect_1.default.fn("COUNT", sequelizeConnect_1.default.col("id")), "orderCount"],
        ],
        where: {
            purchase_date: {
                [sequelize_1.Op.between]: [start, end],
            },
        },
        raw: true,
    }));
    const totalAmount = parseFloat(result?.totalAmount || "0");
    const orderCount = parseInt(result?.orderCount || "0");
    const averageOrderValue = orderCount > 0 ? Math.floor(totalAmount / orderCount) : 0;
    return { totalAmount, orderCount, averageOrderValue };
};
exports.salesService = salesService;
