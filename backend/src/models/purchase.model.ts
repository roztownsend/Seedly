import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  DataTypes,
  Sequelize,
} from "sequelize";
import { User } from "./user.model";

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

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof Purchase {
    Purchase.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        // No need to declare user_id in init – it's set up via association
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Purchase",
        tableName: "Purchases", // use your actual table name if needed
        timestamps: true,
      }
    );

    return Purchase;
  }
}
