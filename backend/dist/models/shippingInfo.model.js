"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingInfo = void 0;
const sequelize_1 = require("sequelize");
class ShippingInfo extends sequelize_1.Model {
    static initModel(sequelize) {
        return ShippingInfo.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            customer_name: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            address: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            apartment: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            postcode: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            city: {
                type: sequelize_1.DataTypes.TEXT,
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
            tableName: "shipping_infos",
            modelName: "Shipping_info",
            timestamps: false,
            indexes: [
                { name: "idx_shipping_infos_purchase_id", fields: ["purchase_id"] },
                {
                    name: "idx_shipping_infos_email_purchase_id",
                    fields: ["email", "purchase_id"],
                },
            ],
        });
    }
    static associate(models) {
        ShippingInfo.belongsTo(models.Purchase, {
            foreignKey: "purchase_id",
            as: "purchase",
            onDelete: "CASCADE",
        });
        ShippingInfo.belongsTo(models.ShippingOption, {
            foreignKey: "shipping_option_id",
            as: "shipping_option",
            onDelete: "CASCADE",
        });
    }
}
exports.ShippingInfo = ShippingInfo;
