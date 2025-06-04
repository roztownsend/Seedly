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
const plantRoutes_1 = __importDefault(require("./routes/plantRoutes"));
const shippingRoutes_1 = __importDefault(require("./routes/shippingRoutes"));
const userTaskRoutes_1 = __importDefault(require("./routes/userTaskRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const authTest_1 = __importDefault(require("./routes/authTest"));
const purchaseRoutes_1 = __importDefault(require("./routes/purchaseRoutes"));
//testing server startup
sequelizeConnect_1.default
    .authenticate()
    .then(() => {
    console.log("Connected to Supabase via Sequelize");
    (0, initModels_1.initModels)(sequelizeConnect_1.default);
    // plantsInserter()
    // .then(() => console.log("yay"))
    // .catch(() => console.log("boo"));
})
    .catch((err) => console.error("Sequelize connection error:", err));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: ["https://seedly-tau.vercel.app", "http://localhost:5173"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/plants", plantRoutes_1.default);
app.use("/shipping-options", shippingRoutes_1.default);
app.use("/auth-test", authTest_1.default);
app.use("/user-tasks", userTaskRoutes_1.default);
app.use("/admin", adminRoutes_1.default);
app.use("/purchase", purchaseRoutes_1.default);
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "../swagger/swagger.yaml"));
// basic route, look /routes folder for actual ones
app.get("/", (_req, res) => {
    res.send("API is running");
});
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
exports.default = app;
