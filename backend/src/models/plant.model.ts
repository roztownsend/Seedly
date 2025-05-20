import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
} from "sequelize";

import { PurchaseItem } from "./purchaseItem.model";

export class Plant extends Model<
  InferAttributes<Plant>,
  InferCreationAttributes<Plant>
> {
  declare id: CreationOptional<string>;
  declare productName: string;
  declare price: string;
  declare description: string;
  declare cycle: "Annual" | "Biennial" | "Perennial";
  declare imageUrl: string | null;
  declare isedible: boolean | null;
  declare sunlight:
    | "Full"
    | "Full to part shade"
    | "Partial shade to full shade";
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getPurchaseItems: HasManyGetAssociationsMixin<PurchaseItem>;
  static initModel(sequelize: Sequelize): typeof Plant {
    return Plant.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        productName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          get() {
            const rawValue = this.getDataValue("price");
            return rawValue === null ? null : parseFloat(rawValue);
          },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cycle: {
          type: DataTypes.ENUM("Annual", "Biennial", "Perennial"),
        },
        imageUrl: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        isedible: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        sunlight: {
          type: DataTypes.ENUM(
            "Full",
            "Full to part shade",
            "Partial shade to full shade"
          ),
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
        tableName: "plants",
        timestamps: true,
        underscored: true,
      }
    );
  }
  static associate(models: { PurchaseItem: typeof PurchaseItem }) {
    Plant.hasMany(models.PurchaseItem, {
      foreignKey: "plant_id",
      as: "purchaseItems",
    });
  }
}
