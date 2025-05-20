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

  declare totalItems: number;
  declare shippingSelection: string;
  declare shippingPrice: number;
  declare totalAmount: number;
  declare purchaseDate: CreationOptional<Date>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

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

        totalItems: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        shippingSelection: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        shippingPrice: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        totalAmount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        purchaseDate: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Purchase",
        tableName: "Purchases",
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
      as: "purchaseItems",
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
