import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
  ForeignKey,
} from "sequelize";

export class PurchaseItem extends Model<
  InferAttributes<PurchaseItem>,
  InferCreationAttributes<PurchaseItem>
> {
  declare id: CreationOptional<string>;
  declare purchase_id: ForeignKey<string>;
  declare plant_id: ForeignKey<string>;
  declare quantity: CreationOptional<number>;
}

export function initPurchaseItemModel(sequelize: Sequelize) {
  PurchaseItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      purchase_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      plant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      tableName: "PurchaseItems",
      modelName: "PurchaseItem",
      timestamps: false,
    }
  );
}
