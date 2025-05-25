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
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Get user from database
    const user = await db.asyncGet('SELECT * FROM users WHERE email = ?', [email]);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password with hash
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const { password: _, ...userData } = user;
    
    res.json({
      ...userData,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected routes
app.use('/api', authenticate);

// Client endpoints
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await db.asyncAll('SELECT id, name, status, updated_at as lastUpdatedAt FROM clients');
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

app.get('/api/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get client details
    const client = await db.asyncGet('SELECT * FROM clients WHERE id = ?', [id]);
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Get client's accounts
    const accounts = await db.asyncAll('SELECT * FROM accounts WHERE client_id = ?', [id]);

    // Parse JSON flags
    const clientWithAccounts = {
      ...client,
      accounts: accounts.map(account => ({
        ...account,
        flags: JSON.parse(account.flags || '[]')
      }))
    };

    res.json(clientWithAccounts);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ error: 'Failed to fetch client details' });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const { name, email, phone, company, notes } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const id = `client-${Date.now()}`;
    
    await db.asyncRun(
      'INSERT INTO clients (id, name, email, phone, company, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [id, name, email, phone, company, notes]
    );

    const client = await db.asyncGet('SELECT * FROM clients WHERE id = ?', [id]);
    res.status(201).json(client);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Failed to create client' });
  }
});

app.put('/api/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, company, notes, status } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    await db.asyncRun(
      `UPDATE clients 
       SET name = ?, email = ?, phone = ?, company = ?, notes = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [name, email, phone, company, notes, status, id]
    );

    const updatedClient = await db.asyncGet('SELECT * FROM clients WHERE id = ?', [id]);
    
    if (!updatedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ error: 'Failed to update client' });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.asyncRun('DELETE FROM clients WHERE id = ?', [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ error: 'Failed to delete client' });
  }
});

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