import { Purchase } from "../models/purchase.model";
import { ShippingInfo } from "../models/shippingInfo.model";

import { Transaction } from "sequelize";

export const assignOrphanedPurchasesToUser = async (
  userId: string,
  userEmail: string,
  transaction: Transaction
): Promise<Purchase[]> => {
  const purchases = await Purchase.findAll({
    where: { user_id: null },
    include: [
      {
        model: ShippingInfo,
        as: "shipping_info",
        where: { email: userEmail },
      },
    ],
    transaction,
  });
  for (const purchase of purchases) {
    try {
      purchase.user_id = userId;
      await purchase.save({ transaction });
      console.log("updated purchase");
    } catch (error) {
      console.error("Failed to update purchase", error);
      throw error;
    }
  }
  return purchases;
};
