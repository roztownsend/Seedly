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
import { Plant } from "./plant.model";
export class PurchaseItem extends Model<
  InferAttributes<PurchaseItem>,
  InferCreationAttributes<PurchaseItem>
> {
  declare id: CreationOptional<string>;
  declare purchase_id: ForeignKey<Purchase["id"]>;
  declare plant_id: ForeignKey<Plant["id"]>;
  declare quantity: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof PurchaseItem {
    return PurchaseItem.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        quantity: {
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
        tableName: "purchase_items",
        modelName: "PurchaseItem",
        timestamps: true,
        underscored: true,
      }
    );
  }
  static associate(models: { Purchase: typeof Purchase; Plant: typeof Plant }) {
    PurchaseItem.belongsTo(models.Purchase, {
      foreignKey: "purchase_id",
      as: "purchase",
      onDelete: "CASCADE",
    });
    PurchaseItem.belongsTo(models.Plant, {
      foreignKey: "plant_id",
      as: "plant",
    });
  }
}
