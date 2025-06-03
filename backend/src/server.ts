import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import sequelize from "./config/sequelizeConnect";
import { initModels } from "./models/initModels";

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to Supabase via Sequelize");
    initModels(sequelize);

    const plantRoutes = require("./routes/plantRoutes").default;
    const shippingRoutes = require("./routes/shippingRoutes").default;
    const userTaskRoutes = require("./routes/userTaskRoutes").default;
    const purchaseRoutes = require("./routes/purchaseRoutes").default;
    const authTest = require("./routes/authTest").default;

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

    app.get("/", (_req, res) => {
      res.send("API is running");
    });

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    }
  } catch (err) {
    console.error("Sequelize connection error:", err);
    throw err;
  }
})();

export default app;