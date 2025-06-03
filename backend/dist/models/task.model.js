"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const plant_model_1 = require("./plant.model");
class Task extends sequelize_1.Model {
    static initModel(sequelize) {
        return Task.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            plant_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: plant_model_1.Plant,
                    key: "id",
                },
            },
            start_month: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 12,
                },
            },
            end_month: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 12,
                },
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        }, {
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
        });
    }
    static associate(models) {
        Task.belongsTo(models.Plant, {
            foreignKey: "plant_id",
            as: "plant",
        });
    }
}
exports.Task = Task;
