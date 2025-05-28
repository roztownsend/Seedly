import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
  ForeignKey,
} from "sequelize";
import { Purchase } from "./purchase.model";
import { ShippingOption } from "./shippingOption.model";
export class ShippingInfo extends Model<
  InferAttributes<ShippingInfo>,
  InferCreationAttributes<ShippingInfo>
> {
  declare id: CreationOptional<string>;
  declare purchase_id: ForeignKey<Purchase["id"]>;
  declare shipping_option_id: ForeignKey<ShippingOption["id"]>;
  declare customer_name: string;
  declare email: string;
  declare address: string;
  declare apartment: string | null;
  declare postcode: string;
  declare city: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof ShippingInfo {
    return ShippingInfo.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        customer_name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        address: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        apartment: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        postcode: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        city: {
          type: DataTypes.TEXT,
          allowNull: false,
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
        tableName: "shipping_infos",
        modelName: "Shipping_info",
        timestamps: false,
        indexes: [
          { name: "idx_shipping_infos_purchase_id", fields: ["purchase_id"] },
          {
            name: "idx_shipping_infos_email_purchase_id",
            fields: ["email", "purchase_id"],
          },
        ],
      }
    );
  }
  static associate(models: {
    Purchase: typeof Purchase;
    ShippingOption: typeof ShippingOption;
  }) {
    ShippingInfo.belongsTo(models.Purchase, {
      foreignKey: "purchase_id",
      as: "purchase",
      onDelete: "CASCADE",
    });
    ShippingInfo.belongsTo(models.ShippingOption, {
      foreignKey: "shipping_option_id",
      as: "shipping_option",
      onDelete: "CASCADE",
    });
  }
}
