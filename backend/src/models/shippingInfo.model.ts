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
export class ShippingInfo extends Model<
  InferAttributes<ShippingInfo>,
  InferCreationAttributes<ShippingInfo>
> {
  declare id: CreationOptional<string>;
  declare purchase_id: ForeignKey<string>;
  declare customer_name: string;
  declare email: string;
  declare address: string;
  declare apartment: string | null;
  declare postcode: string;
  declare city: string;
  declare shipping_option: "PostNord Snigelpost" | "Bootbee Box";

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
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        apartment: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        postcode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        shipping_option: {
          type: DataTypes.ENUM("PostNord Snigelpost", "Bootbee Box"),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "ShippingInfos",
        modelName: "ShippingInfo",
        timestamps: false,
      }
    );
  }
  static associate(models: { Purchase: typeof Purchase }) {
    ShippingInfo.belongsTo(models.Purchase, {
      foreignKey: "purchase_id",
      as: "purchase",
      onDelete: "CASCADE",
    });
  }
}
