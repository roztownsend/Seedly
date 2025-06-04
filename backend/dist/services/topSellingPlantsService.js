"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topSellingPlant = void 0;
const sequelizeConnect_1 = __importDefault(require("../config/sequelizeConnect"));
const sequelize_1 = require("sequelize");
const purchaseItem_model_1 = require("../models/purchaseItem.model");
const plant_model_1 = require("../models/plant.model");
const topSellingPlant = async (start, end) => {
    const weeklytopPlants = await purchaseItem_model_1.PurchaseItem.findAll({
        where: {
            createdAt: {
                [sequelize_1.Op.between]: [start, end],
            },
        },
        attributes: [
            [sequelizeConnect_1.default.col("plant.product_name"), "productName"],
            [sequelizeConnect_1.default.fn("SUM", sequelizeConnect_1.default.col("quantity")), "unitsSold"],
            [sequelizeConnect_1.default.literal(`SUM(quantity * "plant"."price")`), "revenue"],
        ],
        include: [
            {
                model: plant_model_1.Plant,
                as: "plant",
                attributes: [],
            },
        ],
        group: ["plant.id", "plant.product_name"],
        order: [
            [sequelizeConnect_1.default.literal('SUM("quantity")'), "DESC"],
            [sequelizeConnect_1.default.literal('SUM(quantity * "plant"."price")'), "DESC"],
        ],
        limit: 5,
        raw: true,
    });
    return weeklytopPlants;
};
exports.topSellingPlant = topSellingPlant;
