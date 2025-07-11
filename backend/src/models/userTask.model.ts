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
import { Purchase } from "./purchase.model";

export class UserTask extends Model<
  InferAttributes<UserTask>,
  InferCreationAttributes<UserTask>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<User["id"]>;
  declare task_id: ForeignKey<Task["id"]>;
  declare purchase_id: ForeignKey<string>;
  declare is_completed: CreationOptional<boolean>;

  declare user?: User;
  declare task?: Task;
  declare purchase?: Purchase;

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
        is_completed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        task_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        purchase_id: {
          type: DataTypes.UUID,
          allowNull: false,
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
        indexes: [
          {
            name: "idx_user_task_purchase_unique",
            unique: true,
            fields: ["user_id", "task_id", "purchase_id"],
          },
        ],
      }
    );
  }

  static associate(models: {
    User: typeof User;
    Task: typeof Task;
    Purchase: typeof Purchase;
  }) {
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
    UserTask.belongsTo(models.Purchase, {
      foreignKey: "purchase_id",
      as: "purchase",
      onDelete: "CASCADE",
    });
  }
}
