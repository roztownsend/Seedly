import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


const swaggerDocument = YAML.load(path.join(__dirname, '../swagger/swagger.yaml'));


// route, to fill out later
app.get('/', (_req, res) => {
    res.send("API is running");
  });

  
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
