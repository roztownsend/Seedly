"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plant = void 0;
const sequelize_1 = require("sequelize");
class Plant extends sequelize_1.Model {
    static initModel(sequelize) {
        return Plant.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
            },
            product_name: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            price: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
                get() {
                    const rawValue = this.getDataValue("price");
                    return typeof rawValue === "string"
                        ? parseFloat(rawValue)
                        : rawValue;
                },
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            cycle: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.ENUM("Annual", "Biennial", "Perennial")),
            },
            image_url: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            isedible: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            sunlight: {
                type: sequelize_1.DataTypes.ENUM("Full", "Full to part shade", "Partial shade to full shade"),
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
            tableName: "plants",
            modelName: "Plant",
            timestamps: true,
            underscored: true,
        });
    }
    static associate(models) {
        Plant.hasMany(models.PurchaseItem, {
            foreignKey: "plant_id",
            as: "purchase_items",
        });
        Plant.hasMany(models.Task, {
            foreignKey: "plant_id",
            as: "tasks",
        });
    }
}
exports.Plant = Plant;
