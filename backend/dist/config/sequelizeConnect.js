"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Replace below with your Supabase Database Connection String
const dbName = process.env.DB_NAME || "";
const dbUser = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbHost = process.env.DB_HOST || "";
const dbPort = Number(process.env.DB_PORT) || 5432;
const connectionString = process.env.DATABASE_URL || "";
const sequelize = new sequelize_1.Sequelize(connectionString, {
    dialect: "postgres",
    pool: {
        max: 12,
        min: 1,
        acquire: 30000,
        idle: 10000,
    },
});
exports.default = sequelize;
