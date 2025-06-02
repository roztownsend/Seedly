import { Purchase } from "../models/purchase.model";
import sequelize from "../config/sequelizeConnect";
import { Op } from "sequelize";
interface SalesResults {
  totalAmount: string;
  orderCount: string;
}
export const salesService = async (start: Date, end: Date) => {
  const result = (await Purchase.findOne({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("total_amount")), "totalAmount"],
      [sequelize.fn("COUNT", sequelize.col("id")), "orderCount"],
    ],
    where: {
      purchase_date: {
        [Op.between]: [start, end],
      },
    },
    raw: true,
  })) as SalesResults | null;

  const totalAmount = parseFloat(result?.totalAmount || "0");
  const orderCount = parseInt(result?.orderCount || "0");

  const averageOrderValue =
    orderCount > 0 ? Math.floor(totalAmount / orderCount) : 0;

  return { totalAmount, orderCount, averageOrderValue };
};
