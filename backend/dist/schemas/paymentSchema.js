"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSchema = void 0;
const zod_1 = require("zod");
exports.paymentSchema = zod_1.z.object({
    cardholderName: zod_1.z.string().min(1, 'Cardholder name is required'),
    expMonth: zod_1.z.string().regex(/^\d{2}$/, 'Month must be 2 digits'),
    expYear: zod_1.z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
    saveCard: zod_1.z.boolean().optional(),
    userId: zod_1.z.string().uuid().optional(), // Optional if user is not logged in
});
