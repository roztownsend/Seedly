"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignOrphanedPurchasesToUser = void 0;
const purchase_model_1 = require("../models/purchase.model");
const shippingInfo_model_1 = require("../models/shippingInfo.model");
const sequelize_1 = require("sequelize");
const assignOrphanedPurchasesToUser = async (userId, userEmail, transaction) => {
    const purchaseIdObjects = await purchase_model_1.Purchase.findAll({
        where: { user_id: null },
        attributes: ["id"],
        include: [
            {
                model: shippingInfo_model_1.ShippingInfo,
                as: "shipping_info",
                attributes: [],
                where: { email: userEmail },
            },
        ],
        raw: true,
        transaction,
    });
    const purchaseIdsToUpdate = purchaseIdObjects.map((purchase) => purchase.id);
    if (purchaseIdsToUpdate.length <= 0) {
        return 0;
    }
    const [numberOfAffectedRows] = await purchase_model_1.Purchase.update({ user_id: userId }, {
        where: {
            id: { [sequelize_1.Op.in]: purchaseIdsToUpdate },
        },
        transaction,
    });
    return numberOfAffectedRows;
};
exports.assignOrphanedPurchasesToUser = assignOrphanedPurchasesToUser;
