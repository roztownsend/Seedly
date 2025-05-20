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
  declare user_id: ForeignKey<string>;
  declare task_id: ForeignKey<string>;
  declare is_completed: CreationOptional<boolean>;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof UserTask {
    return UserTask.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        is_completed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
