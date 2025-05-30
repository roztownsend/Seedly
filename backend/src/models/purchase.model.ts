import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
} from "sequelize";
import { PurchaseItem } from "./purchaseItem.model";
import { Payment } from "./payment.model";
import { ShippingInfo } from "./shippingInfo.model";
import { User } from "./user.model";
import { Plant } from "./plant.model";
import { UserTask } from "./userTask.model";
export class Purchase extends Model<
  InferAttributes<Purchase>,
  InferCreationAttributes<Purchase>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<User["id"]> | null;

  declare total_items: number;
  declare shipping_price: number;
  declare total_amount: number;
  declare purchase_date: CreationOptional<Date>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare purchase_items?: PurchaseItem[];
  declare plant?: Plant;
  declare getItems: HasManyGetAssociationsMixin<PurchaseItem>;
  declare getPayment: HasOneGetAssociationMixin<Payment>;
  declare getShippingInfo: HasOneGetAssociationMixin<ShippingInfo>;

  static initModel(sequelize: Sequelize): typeof Purchase {
    return Purchase.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        total_items: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        shipping_price: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        total_amount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        purchase_date: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: "Purchase",
        tableName: "purchases",
        timestamps: true,
        underscored: true,
        indexes: [{ name: "idx_purchases_user_id", fields: ["user_id"] }],
      }
    );
  }
  static associate(models: {
    PurchaseItem: typeof PurchaseItem;
    Payment: typeof Payment;
    ShippingInfo: typeof ShippingInfo;
    User: typeof User;
    UserTask: typeof UserTask;
  }) {
    Purchase.hasMany(models.PurchaseItem, {
      foreignKey: "purchase_id",
      as: "purchase_items",
    });
    Purchase.hasOne(models.Payment, {
      foreignKey: "purchase_id",
      as: "payment",
    });
    Purchase.hasOne(models.ShippingInfo, {
      foreignKey: "purchase_id",
      as: "shipping_info",
    });
    Purchase.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    Purchase.hasMany(models.UserTask, {
      foreignKey: "purchase_id",
      as: "user_tasks",
    });
  }
}
