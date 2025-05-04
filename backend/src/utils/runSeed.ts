import fs from 'fs';
import path from 'path';
import { db } from './db';

async function runSeed() {
  const seedPath = path.join(__dirname, '../../../database/seed.sql');
  const seedSQL = fs.readFileSync(seedPath, 'utf-8');

  try {
    await db.query(seedSQL);
    console.log('Seed data inserted successfully.');
  } catch (err) {
    console.error('Failed to insert seed data:', err);
  } finally {
    await db.pool.end();
  }
}

runSeed();
