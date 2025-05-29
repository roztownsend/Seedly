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
  declare plant_id: ForeignKey<Plant["id"]>;
  declare description: string | null;
  declare start_month: number;
  declare end_month: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

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
          allowNull: true,
        },
        plant_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Plant,
            key: "id",
          },
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
        tableName: "tasks",
        modelName: "Task",
        timestamps: true,
        underscored: true,
        indexes: [
          {
            name: "idx_tasks_plant_id",
            fields: ["plant_id"],
          },
        ],
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
