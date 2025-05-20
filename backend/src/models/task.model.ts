import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  DataTypes,
  Sequelize,
} from "sequelize";
import { Plant } from "./plant.model";

export class Task extends Model<
  InferAttributes<Task>,
  InferCreationAttributes<Task>
> {
  declare id: CreationOptional<string>;
  declare plant_id: ForeignKey<Plant>;
  declare description: string | null;
  declare start_month: number;
  declare end_month: number;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof Task {
    return Task.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        start_month: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 12,
          },
        },
        end_month: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 12,
          },
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "tasks",
        modelName: "Task",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(models: { Plant: typeof Plant }) {
    Task.belongsTo(models.Plant, {
      foreignKey: "plant_id",
      as: "plant",
    });
  }
}
