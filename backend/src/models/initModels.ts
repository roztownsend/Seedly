import { Sequelize } from "sequelize";
import { Plant } from "./plant.model";
import { Purchase } from "./purchase.model";
import { PurchaseItem } from "./purchaseItem.model";
import { Payment } from "./payment.model";
import { ShippingInfo } from "./shippingInfo.model";
import { Task } from "./task.model";
import { UserTask } from "./userTask.model";
import { User } from "./user.model";
import { ShippingOption } from "./shippingOption.model";

export const initModels = (sequelize: Sequelize): void => {
  Plant.initModel(sequelize);
  Purchase.initModel(sequelize);
  PurchaseItem.initModel(sequelize);
  Payment.initModel(sequelize);
  ShippingInfo.initModel(sequelize);
  Task.initModel(sequelize);
  UserTask.initModel(sequelize);
  User.initModel(sequelize);
  ShippingOption.initModel(sequelize);

  Purchase.associate({ PurchaseItem, Payment, ShippingInfo });
  Plant.associate({ PurchaseItem, Task });
  Payment.associate({ Purchase });
  ShippingInfo.associate({ Purchase, ShippingOption });
  PurchaseItem.associate({ Purchase, Plant });
  Task.associate({ Plant });
  UserTask.associate({ Task, User });
  User.associate({ UserTask });
  ShippingOption.associate({ ShippingInfo });
};
