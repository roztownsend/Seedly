"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shippingOption_model_1 = require("../models/shippingOption.model");
const router = (0, express_1.Router)();
//get shipping options
router.get("/", async (_req, res) => {
    console.log("GET /shipping-options triggered");
    try {
        const shippingOptions = await shippingOption_model_1.ShippingOption.findAll();
        res.json(shippingOptions);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Nooo. Internal server error." });
    }
});
exports.default = router;
