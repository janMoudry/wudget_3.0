import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create database connection
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error opening database:', err);
    return;
  }
  console.log('Connected to SQLite database');
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Load and execute schema
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema, async (err) => {
  if (err) {
    console.error('Error executing schema:', err);
    return;
  }
  console.log('Schema executed successfully');

  // Insert test user if it doesn't exist
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.run(
      'INSERT OR REPLACE INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
      ['user-001', 'Jan Moudrý', 'jan@wudget.dev', hashedPassword]
    );
    console.log('Test user created successfully');
  } catch (error) {
    console.error('Error creating test user:', error);
  }
});

// Promisify db.all and db.get
db.asyncAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

db.asyncGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

db.asyncRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

export default db;