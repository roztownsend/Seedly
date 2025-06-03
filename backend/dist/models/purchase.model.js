"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const sequelize_1 = require("sequelize");
class Purchase extends sequelize_1.Model {
    static initModel(sequelize) {
        return Purchase.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
            },
            total_items: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            shipping_price: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
            },
            total_amount: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
            },
            purchase_date: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
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
            modelName: "Purchase",
            tableName: "purchases",
            timestamps: true,
            underscored: true,
            indexes: [{ name: "idx_purchases_user_id", fields: ["user_id"] }],
        });
    }
    static associate(models) {
        Purchase.hasMany(models.PurchaseItem, {
            foreignKey: "purchase_id",
            as: "purchase_items",
        });
        Purchase.hasOne(models.Payment, {
            foreignKey: "purchase_id",
            as: "payment",
        });
        Purchase.hasOne(models.ShippingInfo, {
            foreignKey: "purchase_id",
            as: "shipping_info",
        });
        Purchase.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
        });
        Purchase.hasMany(models.UserTask, {
            foreignKey: "purchase_id",
            as: "user_tasks",
        });
    }
}
exports.Purchase = Purchase;
