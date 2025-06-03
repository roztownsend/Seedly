"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTask = void 0;
const sequelize_1 = require("sequelize");
class UserTask extends sequelize_1.Model {
    static initModel(sequelize) {
        return UserTask.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            is_completed: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            user_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            task_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            purchase_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        }, {
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
        });
    }
    static associate(models) {
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
exports.UserTask = UserTask;
