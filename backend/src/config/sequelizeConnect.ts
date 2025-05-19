import { Sequelize } from "sequelize";

// Replace below with your Supabase Database Connection String

const dbName = process.env.DB_NAME || "";
const dbUser = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbHost = process.env.DB_HOST || "";
const dbPort = Number(process.env.DB_PORT) || 5000;
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "postgres",
  host: dbHost,
  port: dbPort,
  pool: {
    max: 12,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
