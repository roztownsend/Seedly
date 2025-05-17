import { Sequelize } from 'sequelize';

// Replace below with your Supabase Database Connection String
const sequelize = new Sequelize(`
    postgresql://postgres:${process.env.DB_PASSWORD}@db.${process.env.DB_PROJECT_ID}.supabase.co:5432/${process.env.DB_NAME}
    `);
    
sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
