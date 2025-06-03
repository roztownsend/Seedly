"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shippingOption_model_1 = require("../models/shippingOption.model");
;
const optionsInserter = async () => {
    const optionsData = [
        { label: "PostNord SnigelPost", price: 49, min_days: 4, max_days: 197 },
        { label: "BootBee Box", price: 59, min_days: 10, max_days: 21 },
        { label: "DB Stinker Ombud", price: 79, min_days: 7, max_days: 19 }
    ];
    try {
        const shippingOptions = await shippingOption_model_1.ShippingOption.bulkCreate(optionsData);
        console.log(shippingOptions);
    }
    catch (error) {
        console.error("Failed to bulk insert shipping options", error);
    }
};
exports.default = optionsInserter;
