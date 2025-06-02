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
import { Task } from "./task.model";

export class Plant extends Model<
  InferAttributes<Plant>,
  InferCreationAttributes<Plant>
> {
  declare id: CreationOptional<string>;
  declare product_name: string;
  declare price: number;
  declare description: string;
  declare cycle: ("Annual" | "Biennial" | "Perennial")[];

  declare image_url: string | null;
  declare isedible: boolean | null;
  declare sunlight:
    | "Full"
    | "Full to part shade"
    | "Partial shade to full shade";
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare tasks?: Task[];

  declare getPurchaseItems: HasManyGetAssociationsMixin<PurchaseItem>;
  declare getTasks: HasManyGetAssociationsMixin<Task>;
  static initModel(sequelize: Sequelize): typeof Plant {
    return Plant.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        product_name: {
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
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        cycle: {
          type: DataTypes.ARRAY(
            DataTypes.ENUM("Annual", "Biennial", "Perennial")
          ),
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
        modelName: "Plant",
        timestamps: true,
        underscored: true,
      }
    );
  }
  static associate(models: {
    PurchaseItem: typeof PurchaseItem;
    Task: typeof Task;
  }) {
    Plant.hasMany(models.PurchaseItem, {
      foreignKey: "plant_id",
      as: "purchase_items",
    });
    Plant.hasMany(models.Task, {
      foreignKey: "plant_id",
      as: "tasks",
    });
  }
}
