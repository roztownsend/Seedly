//we are limited to 15 connections (Supabase pooled port "6543")
//use "pool.query(...)"" directly for most operations.
 //If using "pool.connect()"", always call "client.release()" after use.

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log('Connecting to DB with:');
console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD ? '****' : 'MISSING',
  port: process.env.DB_PORT
});


export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '6543', 10),
});
