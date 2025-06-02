import sequelize from "../config/sequelizeConnect";
import { User } from "../models/user.model";
import { Purchase } from "../models/purchase.model";
import { Op } from "sequelize";
export const topUsers = async (start: Date, end: Date) => {
  try {
    const topUsersData = await User.findAll({
      attributes: [
        "email",
        "created_at",
        [sequelize.fn("COUNT", sequelize.col("purchases.id")), "purchaseCount"],
        [
          sequelize.fn("SUM", sequelize.col("purchases.total_amount")),
          "totalSpent",
        ],
      ],
      include: [
        {
          model: Purchase,
          as: "purchases",
          attributes: [],
          where: {
            createdAt: {
              [Op.between]: [start, end],
            },
          },
          required: true,
        },
      ],
      group: ["User.id", "User.email", "User.created_at"],
      order: [
        [sequelize.fn("SUM", sequelize.col("purchases.total_amount")), "DESC"],
      ],
      limit: 5,
      raw: true,
      subQuery: false,
    });
    return topUsersData;
  } catch (error) {
    console.error("Unexpected error while fetching top Users", error);
    throw error;
  }
};
