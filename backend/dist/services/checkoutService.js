"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCheckout = void 0;
const purchase_model_1 = require("../models/purchase.model");
const purchaseItem_model_1 = require("../models/purchaseItem.model");
const processCheckout = async (data, transaction) => {
    const { userId, paymentMethod, purchaseItems, shippingInfo, shippingPrice, totalAmount, totalItems, } = data;
    const purchase = await purchase_model_1.Purchase.create({
        user_id: userId,
        total_items: totalItems,
        total_amount: totalAmount,
        shipping_price: shippingPrice,
    }, { transaction });
    await purchaseItem_model_1.PurchaseItem.bulkCreate(purchaseItems.map((item) => ({
        purchase_id: purchase.id,
        plant_id: item.plantId,
        quantity: item.quantity,
    })), { transaction });
    await purchase.createPayment({
        payment_method: paymentMethod,
    }, { transaction });
    await purchase.createShipping_info({
        customer_name: shippingInfo.name,
        email: shippingInfo.email,
        address: shippingInfo.address,
        apartment: shippingInfo.apartment,
        postcode: shippingInfo.postalCode,
        city: shippingInfo.city,
        shipping_option_id: shippingInfo.shippingOptionId,
    }, { transaction });
};
exports.processCheckout = processCheckout;
