//there are a few debug console.logs, shouldnt be touched

import { Router, Request, Response } from "express";
import { pool } from "../config/dbConnection";
import { z } from "zod";
import { Plant } from "../models/plant.model";
import { idSchema, seedSchema } from "../zod/schema";

const router = Router();

//get all plants
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  console.log("GET /plants triggered");
  try {
    const plants = await Plant.findAll();
    const firstValue = plants[0];
    console.log(firstValue);
    res.status(200).json(plants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//plants:id
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

export default router;
