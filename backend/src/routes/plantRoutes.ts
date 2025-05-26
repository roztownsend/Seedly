//there are a few debug console.logs, shouldnt be touched

import { Router, Request, Response } from "express";
import { z } from "zod";
import { Plant } from "../models/plant.model";
import { Op } from "sequelize";
import { Task } from "../models/task.model";
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
    res.status(500).json({ error: "Internal server error" });
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
  };
  const { name } = parsed.data;
  try {
    console.log(name)
    const searchResult = await Plant.findAll({ 
      where: {
        [Op.or]: [
          {product_name: {[Op.iLike]: `%${name}%`}},
          {description: {[Op.iLike]: `${name}`}}
        ]},
      limit: 40,
    });
    console.log(`Found ${searchResult.length} products.`)
    if (searchResult.length === 0) {
      res.json({ data: [], message: `No products found for query: ${name}.`})
    } else 
    res.json({ data: searchResult });
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

export default router;
