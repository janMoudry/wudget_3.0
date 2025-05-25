/*
  # Initial database schema

  1. Tables
    - `users`
      - `id` (text, primary key) - UUID
      - `email` (text, unique)
      - `password` (text) - Hashed password
      - `name` (text)
      - `created_at` (datetime)
      - `updated_at` (datetime)

  2. Indexes
    - Email index for faster lookups

  3. Initial Data
    - Creates a default admin user
*/

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert default admin user (password: admin123)
INSERT OR IGNORE INTO users (id, email, password, name) 
VALUES (
  'user-001',
  'jan@wudget.dev',
  '$2a$10$zGtQbmVFB7IH1AgPmPvh9.FHiYGunxvfFH.U9wZeYEBrgSL2bCVjK',
  'Jan Moudrý'
);