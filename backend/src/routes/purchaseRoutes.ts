import { Router, Request, Response } from 'express';
import { pool } from '../config/dbConnection';
import { z } from 'zod';

const router = Router();

//POST shipping address and shipping option

router.post('/shipping', async (_req: Request, res: Response): Promise<void> => {
    console.log('POST /shipping triggered');
    try {
        //
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

//POST payment information