import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import iconv from 'iconv-lite';
import csv from 'csv-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import db from './db/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const { password: _, ...safeUser } = user;
    res.json({
      ...safeUser,
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected routes
app.use('/api', authenticate);

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  const bank = req.query.bank;
  if (!req.file || !bank) {
    return res.status(400).json({
      error: 'Missing file or invalid/missing bank parameter.',
    });
  }

  const rows = [];
  const filePath = path.join(__dirname, req.file.path);

  fs.createReadStream(filePath)
    .pipe(iconv.decodeStream('win1250'))
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => rows.push(data))
    .on('end', () => {
      fs.unlinkSync(filePath);
      res.json({ success: true, count: rows.length });
    })
    .on('error', (err) => {
      console.error('CSV parsing error:', err);
      fs.unlinkSync(filePath);
      res.status(500).json({ error: 'CSV parsing failed.' });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});