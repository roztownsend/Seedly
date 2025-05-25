import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
  ForeignKey,
} from "sequelize";

import { UserTask } from "./userTask.model";
import { Purchase } from "./purchase.model";
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: ForeignKey<string>;
  declare email: string;
  declare role: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof User {
    return User.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          defaultValue: "customer",
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
        tableName: "users",
        modelName: "User",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(models: {
    UserTask: typeof UserTask;
    Purchase: typeof Purchase;
  }) {
    User.hasMany(models.UserTask, {
      foreignKey: "user_id",
      as: "user_tasks",
    });
    User.hasMany(models.Purchase, {
      foreignKey: "user_id",
      as: "purchases",
    });
  }
}
