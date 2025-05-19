import { Sequelize } from "sequelize";
import { Plant } from "./plant.model";
import { Purchase } from "./purchase.model";
import { PurchaseItem } from "./purchaseItem.model";
import { Payment } from "./payment.model";
import { ShippingInfo } from "./shippingInfo.model";

export const initModels = (sequelize: Sequelize): void => {
  Plant.initModel(sequelize);
  Purchase.initModel(sequelize);
  PurchaseItem.initModel(sequelize);
  Payment.initModel(sequelize);
  ShippingInfo.initModel(sequelize);

  Purchase.associate({ PurchaseItem, Payment, ShippingInfo });
  Plant.associate({ PurchaseItem });
  Payment.associate({ Purchase });
  ShippingInfo.associate({ Purchase });
  PurchaseItem.associate({ Purchase, Plant });
};
