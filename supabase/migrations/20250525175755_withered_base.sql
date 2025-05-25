-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  status TEXT DEFAULT 'active',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bank accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  name TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  currency TEXT DEFAULT 'CZK',
  balance REAL DEFAULT 0,
  flags TEXT, -- Stored as JSON array
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Bank statements table
CREATE TABLE IF NOT EXISTS statements (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  period TEXT NOT NULL, -- Format: YYYY-MM
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  transaction_count INTEGER DEFAULT 0,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  statement_id TEXT NOT NULL,
  account_id TEXT NOT NULL,
  date DATE NOT NULL,
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'CZK',
  type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
  method TEXT,
  category TEXT,
  counterparty TEXT,
  note TEXT,
  raw TEXT, -- SQLite doesn't have native JSON, store as TEXT
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (statement_id) REFERENCES statements(id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Counterparties table
CREATE TABLE IF NOT EXISTS counterparties (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  is_regular INTEGER DEFAULT 0, -- SQLite uses INTEGER for boolean
  exclude_from_stats INTEGER DEFAULT 0, -- SQLite uses INTEGER for boolean
  note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Insert default admin user
INSERT OR IGNORE INTO users (id, name, email, password) 
VALUES (
  'user-001',
  'Jan Moudrý',
  'jan@wudget.dev',
  '$2a$10$6KqMXD0qB1TgOxz4UrVYWOUZcJfFgdgEiPGf8sYtQGDucXRR5o4tG' -- hashed 'admin123'
);