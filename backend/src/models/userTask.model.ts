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
import { Task } from "./task.model";

export class UserTask extends Model<
  InferAttributes<UserTask>,
  InferCreationAttributes<UserTask>
> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<string>;
  declare taskId: ForeignKey<string>;
  declare isCompleted: CreationOptional<boolean>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof UserTask {
    return UserTask.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
        tableName: "user_tasks",
        modelName: "UserTask",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(models: { User: typeof User; Task: typeof Task }) {
    UserTask.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });

    UserTask.belongsTo(models.Task, {
      foreignKey: "task_id",
      as: "task",
      onDelete: "CASCADE",
    });
  }
}
