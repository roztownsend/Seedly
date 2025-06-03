"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseItem = void 0;
const sequelize_1 = require("sequelize");
class PurchaseItem extends sequelize_1.Model {
    static initModel(sequelize) {
        return PurchaseItem.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            plant_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
            quantity: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
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
            tableName: "purchase_items",
            modelName: "PurchaseItem",
            timestamps: true,
            underscored: true,
        });
    }
    static associate(models) {
        PurchaseItem.belongsTo(models.Purchase, {
            foreignKey: "purchase_id",
            as: "purchase",
            onDelete: "CASCADE",
        });
        PurchaseItem.belongsTo(models.Plant, {
            foreignKey: "plant_id",
            as: "plant",
        });
    }
}
exports.PurchaseItem = PurchaseItem;
