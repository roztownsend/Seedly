"use strict";
//there are a few debug console.logs, shouldnt be touched
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const plant_model_1 = require("../models/plant.model");
const sequelize_1 = require("sequelize");
const schema_1 = require("../schemas/schema");
const router = (0, express_1.Router)();
//get all plants
router.get("/", async (_req, res) => {
    console.log("GET /plants triggered");
    try {
        const plants = await plant_model_1.Plant.findAll();
        console.log(`Got ${plants.length} products.`);
        res.json(plants);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error", err: err.message });
    }
});
//search for a product (plant) by name or description. Nice-to-have: additional search by keywords.
router.get("/search", async (_req, res) => {
    console.log("GET search for plants triggered");
    const schema = zod_1.z.object({
        name: zod_1.z.string().min(1, "Need a search term."),
    });
    const parsed = schema.safeParse(_req.query);
    if (!parsed.success) {
        res.status(500).json({ error: parsed.error.flatten() });
        return;
    }
    const { name } = parsed.data;
    try {
        console.log(name);
        const searchResult = await plant_model_1.Plant.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { product_name: { [sequelize_1.Op.iLike]: `%${name}%` } },
                    { description: { [sequelize_1.Op.iLike]: `${name}` } },
                ],
            },
            limit: 40,
        });
        console.log(`Found ${searchResult.length} products.`);
        if (searchResult.length === 0) {
            res.json({ data: [], message: `No products found for query: ${name}.` });
        }
        else
            res.json({ data: searchResult });
    }
    catch (error) {
        console.error("Error searching plants:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// GET /plants/:id/tasks
router.get("/:id/tasks", async (req, res) => {
    try {
        const plantId = req.params.id;
        const plant = await plant_model_1.Plant.findByPk(plantId);
        const tasks = await plant?.getTasks();
        res.json(tasks);
    }
    catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const parseId = schema_1.idSchema.safeParse(id);
    //Validate Id
    if (!parseId.success) {
        console.error("Validation failed for ID:", parseId.error.format());
        res.status(400).json({
            error: "Invalid Id",
            details: parseId.error.format(),
        });
        return;
    }
    try {
        const plant = await plant_model_1.Plant.findByPk(id);
        if (!plant) {
            res.status(404).json({ error: "Plant not found" });
            return;
        }
        // We could use plant.toJSON() to get a plain object before validating with Zod just to be safe,
        // but Zod can validate the model instance directly since it exposes all required properties.
        //Validate the data using Zod
        const parseResult = schema_1.seedSchema.safeParse(plant);
        if (!parseResult.success) {
            res.status(500).json({
                error: "Invalid plant data structure from DB",
                details: parseResult.error.format(),
            });
            return;
        }
        //Send back validated data
        res.status(200).json(parseResult.data);
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch plant by id",
            message: error.message,
        });
    }
});
exports.default = router;
