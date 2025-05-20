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
  declare product_name: string;
  declare price: string;
  declare description: string;
  declare cycle: "Annual" | "Biennial" | "Perennial";
  declare image_url: string | null;
  declare isedible: boolean | null;
  declare sunlight:
    | "Full"
    | "Full to part shade"
    | "Partial shade to full shade";
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  declare getPurchaseItems: HasManyGetAssociationsMixin<PurchaseItem>;
  static initModel(sequelize: Sequelize): typeof Plant {
    return Plant.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        product_name: {
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
        image_url: {
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
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "plants",
        timestamps: false,
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
