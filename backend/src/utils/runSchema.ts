import { pool } from '../config/connection';
import fs from 'fs';
import path from 'path';

async function runSchema() {
    const schemaPath = path.join(__dirname, '../../../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
  
  try {
    await pool.query(schema);
    console.log('Schema executed successfully');
  } catch (error) {
    console.error('Error running schema:', error);
  } finally {
    await pool.end(); 
  }
}

runSchema();
