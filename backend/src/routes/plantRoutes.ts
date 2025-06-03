//there are a few debug console.logs, shouldnt be touched

import { Router, Request, Response } from "express";
import { z } from "zod";
import { Plant } from "../models/plant.model";
import { Op } from "sequelize";
import { Task } from "../models/task.model";
import { idSchema, seedSchema } from "../schemas/schema";
const router = Router();

//get all plants
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  console.log("GET /plants triggered");
  try {
    const plants = await Plant.findAll();
    console.log(`Got ${plants.length} products.`);
    res.json(plants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error", err });
  }
});

//search for a product (plant) by name or description. Nice-to-have: additional search by keywords.
router.get("/search", async (_req: Request, res: Response): Promise<void> => {
  console.log("GET search for plants triggered");

  const schema = z.object({
    name: z.string().min(1, "Need a search term."),
  });

  const parsed = schema.safeParse(_req.query);
  if (!parsed.success) {
    res.status(500).json({ error: parsed.error.flatten() });
    return;
  }
  const { name } = parsed.data;
  try {
    console.log(name);
    const searchResult = await Plant.findAll({
      where: {
        [Op.or]: [
          { product_name: { [Op.iLike]: `%${name}%` } },
          { description: { [Op.iLike]: `${name}` } },
        ],
      },
      limit: 40,
    });
    console.log(`Found ${searchResult.length} products.`);
    if (searchResult.length === 0) {
      res.json({ data: [], message: `No products found for query: ${name}.` });
    } else res.json({ data: searchResult });
  } catch (error) {
    console.error("Error searching plants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET /plants/:id/tasks
router.get("/:id/tasks", async (req: Request, res: Response) => {
  try {
    const plantId = req.params.id;
    const plant = await Plant.findByPk(plantId);
    const tasks = await plant?.getTasks();
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const parseId = idSchema.safeParse(id);

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
    const plant = await Plant.findByPk(id);

    if (!plant) {
      res.status(404).json({ error: "Plant not found" });
      return;
    }

    // We could use plant.toJSON() to get a plain object before validating with Zod just to be safe,
    // but Zod can validate the model instance directly since it exposes all required properties.
    //Validate the data using Zod
    const parseResult = seedSchema.safeParse(plant);

    if (!parseResult.success) {
      res.status(500).json({
        error: "Invalid plant data structure from DB",
        details: parseResult.error.format(),
      });
      return;
    }

    //Send back validated data
    res.status(200).json(parseResult.data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch plant by id",
      message: (error as Error).message,
    });
  }
});
export default router;
