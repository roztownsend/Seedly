"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const sequelizeConnect_1 = __importDefault(require("./config/sequelizeConnect"));
const initModels_1 = require("./models/initModels");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(async () => {
    try {
        await sequelizeConnect_1.default.authenticate();
        console.log("Connected to Supabase via Sequelize");
        (0, initModels_1.initModels)(sequelizeConnect_1.default);
        const plantRoutes = require("./routes/plantRoutes").default;
        const shippingRoutes = require("./routes/shippingRoutes").default;
        const userTaskRoutes = require("./routes/userTaskRoutes").default;
        const purchaseRoutes = require("./routes/purchaseRoutes").default;
        const authTest = require("./routes/authTest").default;
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use("/plants", plantRoutes);
        app.use("/shipping-options", shippingRoutes);
        app.use("/auth-test", authTest);
        app.use("/user-tasks", userTaskRoutes);
        app.use("/purchase", purchaseRoutes);
        const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "../swagger/swagger.yaml"));
        app.get("/", (_req, res) => {
            res.send("API is running");
        });
        app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
        if (process.env.NODE_ENV !== "production") {
            app.listen(PORT, () => {
                console.log(`Server running on http://localhost:${PORT}`);
            });
        }
    }
    catch (err) {
        console.error("Sequelize connection error:", err);
        throw err;
    }
})();
exports.default = app;
