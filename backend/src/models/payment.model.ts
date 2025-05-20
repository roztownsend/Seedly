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
export class Payment extends Model<
  InferAttributes<Payment>,
  InferCreationAttributes<Payment>
> {
  declare id: CreationOptional<string>;
  declare purchase_id: ForeignKey<string>;
  declare payment_method: string;

  static initModel(sequelize: Sequelize): typeof Payment {
    return Payment.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        payment_method: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "payments",
        modelName: "Payment",
        underscored: true,
        timestamps: true,
      }
    );
  }
  static associate(models: { Purchase: typeof Purchase }) {
    Payment.belongsTo(models.Purchase, {
      foreignKey: "purchase_id",
      as: "purchase",
      onDelete: "CASCADE",
    });
  }
}
