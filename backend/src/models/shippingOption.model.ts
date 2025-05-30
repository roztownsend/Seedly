import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import { ShippingInfo } from "./shippingInfo.model";

export class ShippingOption extends Model<
  InferAttributes<ShippingOption>,
  InferCreationAttributes<ShippingOption>
> {
  declare id: CreationOptional<string>;
  declare label: string;
  declare price: number;
  declare min_days: number;
  declare max_days: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof ShippingOption {
    return ShippingOption.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        label: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          get() {
            const rawValue = this.getDataValue("price");
            return typeof rawValue === "string"
              ? parseFloat(rawValue)
              : rawValue;
          },
        },
        min_days: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        max_days: {
          type: DataTypes.INTEGER,
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
        tableName: "shipping_option",
        modelName: "ShippingOption",
        timestamps: true,
        underscored: true,
      }
    );
  }
  static associate(models: { ShippingInfo: typeof ShippingInfo }) {
    ShippingOption.hasMany(models.ShippingInfo, {
      foreignKey: "shipping_option_id",
      as: "shipping_info",
    });
  }
}
