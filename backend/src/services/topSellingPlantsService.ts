import sequelize from "../config/sequelizeConnect";
import { Op } from "sequelize";
import { PurchaseItem } from "../models/purchaseItem.model";
import { Plant } from "../models/plant.model";
export const topSellingPlant = async (start: Date, end: Date) => {
  const weeklytopPlants = await PurchaseItem.findAll({
    where: {
      createdAt: {
        [Op.between]: [start, end],
      },
    },
    attributes: [
      [sequelize.col("plant.product_name"), "productName"],
      [sequelize.fn("SUM", sequelize.col("quantity")), "unitsSold"],
      [sequelize.literal(`SUM(quantity * "plant"."price")`), "revenue"],
    ],
    include: [
      {
        model: Plant,
        as: "plant",
        attributes: [],
      },
    ],
    group: ["plant.id", "plant.product_name"],
    order: [
      [sequelize.literal('SUM("quantity")'), "DESC"],
      [sequelize.literal('SUM(quantity * "plant"."price")'), "DESC"],
    ],
    limit: 5,
    raw: true,
  });

  return weeklytopPlants;
};
