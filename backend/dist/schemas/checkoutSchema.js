"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutSchema = exports.shippingInfoSchema = exports.purchaseItemSchema = void 0;
const zod_1 = require("zod");
exports.purchaseItemSchema = zod_1.z.object({
    quantity: zod_1.z.number().positive(),
    plantId: zod_1.z.string(),
});
exports.shippingInfoSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    address: zod_1.z.string(),
    apartment: zod_1.z.string().optional(),
    postalCode: zod_1.z.string(),
    city: zod_1.z.string(),
    shippingOptionId: zod_1.z.string(),
});
exports.checkoutSchema = zod_1.z.object({
    userId: zod_1.z.string().nullable(),
    totalItems: zod_1.z.number().positive(),
    shippingPrice: zod_1.z.number().positive(),
    totalAmount: zod_1.z.number().positive(),
    purchaseItems: zod_1.z.array(exports.purchaseItemSchema),
    paymentMethod: zod_1.z.enum(["card", "swish", "klarna"]),
    shippingInfo: exports.shippingInfoSchema,
});
