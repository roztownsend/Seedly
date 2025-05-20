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
export class Purchase extends Model<
  InferAttributes<Purchase>,
  InferCreationAttributes<Purchase>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<string> | null;

  declare total_items: number;
  declare shipping_selection: string;
  declare shipping_price: number;
  declare total_amount: number;
  declare purchase_date: CreationOptional<Date>;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

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

        total_items: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        shipping_selection: {
          type: DataTypes.STRING,
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
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Purchase",
        tableName: "purchases",
        timestamps: true,
        underscored: true,
      }
    );
  }
  static associate(models: {
    PurchaseItem: typeof PurchaseItem;
    Payment: typeof Payment;
    ShippingInfo: typeof ShippingInfo;
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
  }
}
