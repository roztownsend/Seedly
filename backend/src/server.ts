import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import plantRoutes from './routes/plantRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { pool } from './config/connection';

//testing server startup
pool.query('SELECT NOW()')
  .then(res => console.log('PostgreSQL Connected:', res.rows[0]))
  .catch(err => console.error('Connection Error:', err));

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


const swaggerDocument = YAML.load(path.join(__dirname, '../swagger/swagger.yaml'));


// route, to fill out later
app.get('/', (_req, res) => {
    res.send("API is running");
  });

//routes
app.use('/plants', plantRoutes);


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//testing database connection
app.get('/health/db', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({
      message: 'Database connected',
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error('DB health check failed:', err);
    res.status(500).json({ message: 'Database connection failed' });
  }
}); 


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
