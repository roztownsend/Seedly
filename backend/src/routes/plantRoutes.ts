//there are a few debug console.logs, shouldnt be touched

import { Router, Request, Response } from "express";
import { pool } from "../config/dbConnection";
import { z } from "zod";
import { Plant } from "../models/plant.model";
import { Task } from "../models/task.model";
const router = Router();

//get all plants
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  console.log("GET /plants triggered");
  try {
    const plants = await Plant.findAll();
    const firstValue = plants[0];
    console.log(firstValue);
    res.json(plants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//search w parameters, needs to be add timeline later, mb.
router.get("/search", async (req: Request, res: Response): Promise<void> => {
  const schema = z.object({
    name: z.string().optional(),
    cycle: z.string().optional(),
    keyword: z.string().optional(),
    min_price: z.preprocess(
      (v) => (v !== undefined ? Number(v) : undefined),
      z.number().nonnegative().optional()
    ),
    max_price: z.preprocess(
      (v) => (v !== undefined ? Number(v) : undefined),
      z.number().nonnegative().optional()
    ),
  });

  const parsed = schema.safeParse(req.query);
  if (!parsed.success) {
    console.log("Zod parse failed:", parsed.error.flatten());
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { name, cycle, keyword, min_price, max_price } = parsed.data;

  const conditions: string[] = [];
  const values: any[] = [];

  const addCond = (sql: string, val: any) => {
    values.push(val);
    conditions.push(`${sql} $${values.length}`);
  };

  if (name) addCond("product_name ILIKE", `%${name}%`);
  if (cycle) addCond("cycle ILIKE", `%${cycle}%`);
  if (keyword) addCond("description ILIKE", `%${keyword}%`);
  if (min_price !== undefined) addCond("price >=", min_price);
  if (max_price !== undefined) addCond("price <=", max_price);

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";
  const sql = `SELECT DISTINCT ON (product_name) * FROM plants ${whereClause} ORDER BY product_name, id LIMIT 50`;

  try {
    const { rows } = await pool.query(sql, values);
    res.json({ data: rows });
  } catch (err) {
    console.error("Error searching plants:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /plants/:id/tasks
router.get("/:id/tasks", async (req: Request, res: Response) => {
  try {
    const plantId = req.params.id;
    const tasks = await Task.findAll({ where: { plant_id: plantId } });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
