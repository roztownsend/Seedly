import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import sequelize from "./config/sequelizeConnect";
import { initModels } from "./models/initModels";
import plantRoutes from "./routes/plantRoutes";
import shippingRoutes from "./routes/shippingRoutes";
import { Purchase } from "./models/purchase.model";
import { Plant } from "./models/plant.model";
import { ShippingOption } from "./models/shippingOption.model";
import plantsInserter from "./utils/plantsInserterHelper";
import optionsInserter from "./utils/optionsInserterHelper";
import authTest from "./routes/authTest";
import { makeUserAdmin } from "./services/makeUserAdmin";
//testing server startup

sequelize
  .authenticate()
  .then(() => {
    console.log(chalk.green("Connected to Supabase via Sequelize"));
    initModels(sequelize);
  })
  .catch((err) => console.error(chalk.red("Sequelize connection error:", err)));

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/plants", plantRoutes);
app.use("/shipping-options", shippingRoutes);
app.use("/auth-test", authTest);

const swaggerDocument = YAML.load(
  path.join(__dirname, "../swagger/swagger.yaml")
);

// basic route, look /routes folder for actual ones
app.get("/", (_req, res) => {
  res.send("API is running");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
