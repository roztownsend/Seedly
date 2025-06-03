"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initModel(sequelize) {
        return User.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                unique: true,
            },
            role: {
                type: sequelize_1.DataTypes.TEXT,
                defaultValue: "customer",
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
            tableName: "users",
            modelName: "User",
            timestamps: true,
            underscored: true,
        });
    }
    static associate(models) {
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
exports.User = User;
