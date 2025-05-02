import { Router } from 'express';
import { pool } from '../config/connection';

const router = Router();

router.get('/plants/search', async (req, res) => {
  try {
    const { name, cycle, min_price, max_price } = req.query;

    const conditions: string[] = [];
    const values: any[] = [];

    if (name) {
      values.push(`%${name}%`);
      conditions.push(`product_name ILIKE $${values.length}`);
    }

    if (cycle) {
      values.push(`%${cycle}%`);
      conditions.push(`cycle ILIKE $${values.length}`);
    }

    if (min_price) {
      values.push(min_price);
      conditions.push(`price >= $${values.length}`);
    }

    if (max_price) {
      values.push(max_price);
      conditions.push(`price <= $${values.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT * FROM plants ${whereClause};`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Error searching plants:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
