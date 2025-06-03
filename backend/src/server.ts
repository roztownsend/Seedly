import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import sequelize from "./config/sequelizeConnect";
import { initModels } from "./models/initModels";
import plantRoutes from "./routes/plantRoutes";
import shippingRoutes from "./routes/shippingRoutes";
import userTaskRoutes from "./routes/userTaskRoutes";
import { Purchase } from "./models/purchase.model";
import { Plant } from "./models/plant.model";
import { ShippingOption } from "./models/shippingOption.model";
import plantsInserter from "./utils/plantsInserterHelper";
import optionsInserter from "./utils/optionsInserterHelper";
import authTest from "./routes/authTest";
import { makeUserAdmin } from "./services/makeUserAdmin";

import purchaseRoutes from "./routes/purchaseRoutes";
//testing server startup

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to Supabase via Sequelize");
    initModels(sequelize);
    // plantsInserter()
    // .then(() => console.log("yay"))
    // .catch(() => console.log("boo"));
  })
  .catch((err) => console.error("Sequelize connection error:", err));

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/plants", plantRoutes);
app.use("/shipping-options", shippingRoutes);
app.use("/auth-test", authTest);
app.use("/user-tasks", userTaskRoutes);
app.use("/purchase", purchaseRoutes);

const swaggerDocument = YAML.load(
  path.join(__dirname, "../swagger/swagger.yaml")
);

// basic route, look /routes folder for actual ones
app.get("/", (_req, res) => {
  res.send("API is running");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;