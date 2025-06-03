"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingOption = void 0;
const sequelize_1 = require("sequelize");
class ShippingOption extends sequelize_1.Model {
    static initModel(sequelize) {
        return ShippingOption.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
            },
            label: {
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
            min_days: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            max_days: {
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
            tableName: "shipping_option",
            modelName: "ShippingOption",
            timestamps: true,
            underscored: true,
        });
    }
    static associate(models) {
        ShippingOption.hasMany(models.ShippingInfo, {
            foreignKey: "shipping_option_id",
            as: "shipping_info",
        });
    }
}
exports.ShippingOption = ShippingOption;
