import { Purchase } from "../models/purchase.model";
import { ShippingInfo } from "../models/shippingInfo.model";

import { Transaction, Op } from "sequelize";

interface PurchaseIdObject {
  id: string;
}

export const assignOrphanedPurchasesToUser = async (
  userId: string,
  userEmail: string,
  transaction: Transaction
): Promise<number> => {
  const purchaseIdObjects: PurchaseIdObject[] = await Purchase.findAll({
    where: { user_id: null },
    attributes: ["id"],
    include: [
      {
        model: ShippingInfo,
        as: "shipping_info",
        attributes: [],
        where: { email: userEmail },
      },
    ],
    raw: true,
    transaction,
  });

  const purchaseIdsToUpdate: string[] = purchaseIdObjects.map(
    (purchase) => purchase.id
  );

  if (purchaseIdsToUpdate.length <= 0) {
    return 0;
  }

  const [numberOfAffectedRows] = await Purchase.update(
    { user_id: userId },
    {
      where: {
        id: { [Op.in]: purchaseIdsToUpdate },
      },
      transaction,
    }
  );
  return numberOfAffectedRows;
};
