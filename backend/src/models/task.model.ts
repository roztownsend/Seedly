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
  declare plantId: ForeignKey<Plant>;
  declare description: string | null;
  declare startMonth: number;
  declare endMonth: number;

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
        plantId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        startMonth: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 12,
          },
        },
        endMonth: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 12,
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
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
