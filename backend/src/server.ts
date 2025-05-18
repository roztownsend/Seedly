import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import sequelize from "./config/sequelizeConnect";
import plantRoutes from "./routes/plantRoutes";
import { types } from "pg";

//testing server startup
sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL Connected via Sequelize"))
  .catch((err) => console.error("Sequelize connection error:", err));

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/plants", plantRoutes);

const swaggerDocument = YAML.load(
  path.join(__dirname, "../swagger/swagger.yaml")
);

const pgTypes = types;
pgTypes.setTypeParser(types.builtins.NUMERIC, (value: any) =>
  parseFloat(value)
);

// basic route, look /routes folder for actual ones
app.get("/", (_req, res) => {
  res.send("API is running");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
