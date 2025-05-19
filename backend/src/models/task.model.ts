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

export class Task extends Model<
  InferAttributes<Task>,
  InferCreationAttributes<Task>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<string>;
  declare title: string;
  declare description: string | null;
  declare is_completed: CreationOptional<boolean>;

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
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        is_completed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "tasks",
        modelName: "Task",
        timestamps: false,
      }
    );
  }

  static associate(models: { User: typeof User }) {
    Task.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });
  }
}
