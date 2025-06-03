"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSchema = exports.sunlightEnum = exports.cycleEnum = exports.idSchema = void 0;
const zod_1 = require("zod");
exports.idSchema = zod_1.z.string().uuid();
exports.cycleEnum = zod_1.z.enum(["Annual", "Biennial", "Perennial"]);
exports.sunlightEnum = zod_1.z.enum([
    "Full",
    "Full to part shade",
    "Partial shade to full shade",
]);
exports.seedSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    product_name: zod_1.z.string(),
    price: zod_1.z.number(),
    description: zod_1.z.string(),
    cycle: zod_1.z.array(exports.cycleEnum),
    image_url: zod_1.z.string().url(),
    createdAt: zod_1.z.date().default(() => new Date()),
    updatedAt: zod_1.z.date().default(() => new Date()),
    isedible: zod_1.z.boolean().nullable().optional(),
    sunlight: exports.sunlightEnum,
});
