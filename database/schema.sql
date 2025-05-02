-- Enable UUID generation extension (PostgreSQL-specific)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================
-- USERS
-- ============================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- PLANTS
-- ============================
CREATE TABLE IF NOT EXISTS plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name VARCHAR(100) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  description TEXT,
  cycle VARCHAR(50), -- Consider ENUM if values are limited
  timeline TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for common search/filter fields
CREATE INDEX IF NOT EXISTS idx_plants_name ON plants(product_name);
CREATE INDEX IF NOT EXISTS idx_plants_cycle ON plants(cycle);
CREATE INDEX IF NOT EXISTS idx_plants_price ON plants(price);

-- ============================
-- PURCHASES
-- ============================
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_items INTEGER NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  purchase_date TIMESTAMP DEFAULT NOW()
);

-- ============================
-- PURCHASE ITEMS
-- ============================
CREATE TABLE IF NOT EXISTS purchase_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
  plant_id UUID NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  UNIQUE (purchase_id, plant_id) -- Prevent duplicate lines per plant
);

-- ============================
-- TASKS (Feature: Task Manager)
-- ============================
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
