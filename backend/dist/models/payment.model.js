"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
class Payment extends sequelize_1.Model {
    static initModel(sequelize) {
        return Payment.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            payment_method: {
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
            tableName: "payments",
            modelName: "Payment",
            underscored: true,
            timestamps: true,
        });
    }
    static associate(models) {
        Payment.belongsTo(models.Purchase, {
            foreignKey: "purchase_id",
            as: "purchase",
            onDelete: "CASCADE",
        });
    }
}
exports.Payment = Payment;
