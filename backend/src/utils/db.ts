import { pool } from '../config/dbConnection';

//query wrapper
export const db = {
  async query(text: string, params?: any[]) {
    const start = Date.now();
    try {
      const result = await pool.query(text, params);
      const duration = Date.now() - start;
      console.log('✅ DB Query', { text, duration, rows: result.rowCount });
      return result;
    } catch (err) {
      console.error('❌ DB Query Failed', { text, error: err });
      throw err;
    }
  },

  // optional: expose the pool if someone needs transactions
  pool,
};
