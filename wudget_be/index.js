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
import { normalizeAirbank } from './normalizers/airbank.js';

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

// Dashboard overview endpoint
app.get('/api/dashboard', async (req, res) => {
  try {
    // Get total number of clients
    const clientsCount = await db.asyncGet('SELECT COUNT(*) as count FROM clients');

    // Get total number of transactions
    const transactionsCount = await db.asyncGet('SELECT COUNT(*) as count FROM transactions');

    // Get total balance across all accounts
    const totalBalance = await db.asyncGet('SELECT SUM(balance) as total FROM accounts');

    // Get last uploads
    const lastUploads = await db.asyncAll(`
      SELECT 
        c.name as clientName,
        a.bank_name as bank,
        s.uploaded_at as date
      FROM statements s
      JOIN accounts a ON s.account_id = a.id
      JOIN clients c ON a.client_id = c.id
      ORDER BY s.uploaded_at DESC
      LIMIT 3
    `);

    // Get highest income and expense
    const maxIncome = await db.asyncGet(`
      SELECT counterparty, amount
      FROM transactions
      WHERE type = 'income'
      ORDER BY amount DESC
      LIMIT 1
    `);

    const maxExpense = await db.asyncGet(`
      SELECT counterparty, amount
      FROM transactions
      WHERE type = 'expense'
      ORDER BY amount ASC
      LIMIT 1
    `);

    // Get clients list
    const clientsList = await db.asyncAll(`
      SELECT id, name
      FROM clients
      LIMIT 4
    `);

    // Get outdated clients (no statement in last 3 months)
    const outdatedClients = await db.asyncAll(`
      SELECT 
        c.id,
        c.name,
        MAX(s.uploaded_at) as lastUpdated
      FROM clients c
      LEFT JOIN accounts a ON c.id = a.client_id
      LEFT JOIN statements s ON a.id = s.account_id
      GROUP BY c.id, c.name
      HAVING 
        lastUpdated < date('now', '-3 months')
        OR lastUpdated IS NULL
    `);

    res.json({
      clients: clientsCount.count,
      transactions: transactionsCount.count,
      balance: totalBalance.total || 0,
      lastUploads: lastUploads.map(upload => ({
        ...upload,
        date: new Date(upload.date).toISOString().split('T')[0]
      })),
      maxIncome: maxIncome ? {
        counterparty: maxIncome.counterparty,
        amount: maxIncome.amount
      } : null,
      maxExpense: maxExpense ? {
        counterparty: maxExpense.counterparty,
        amount: Math.abs(maxExpense.amount)
      } : null,
      clientsList,
      outdatedClients: outdatedClients.map(client => ({
        ...client,
        lastUpdated: client.lastUpdated ? new Date(client.lastUpdated).toISOString().split('T')[0] : null
      }))
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Overview endpoint
app.get('/api/overview', async (req, res) => {
  try {
    // For now, return mock data
    const mockData = {
      balance: 250000,
      stats: {
        totalIncome: 450000,
        totalExpense: -320000,
        totalTransactions: 156
      },
      chartData: {
        byDay: [
          { date: "2025-03-01", income: 15000, expense: -12000 },
          { date: "2025-03-02", income: 18000, expense: -15000 },
          { date: "2025-03-03", income: 12000, expense: -8000 },
          { date: "2025-03-04", income: 20000, expense: -18000 },
          { date: "2025-03-05", income: 16000, expense: -13000 }
        ],
        byCategory: [
          { category: "Potraviny", total: 25000, type: "expense" },
          { category: "Doprava", total: 15000, type: "expense" },
          { category: "Bydlení", total: 35000, type: "expense" },
          { category: "Zábava", total: 12000, type: "expense" },
          { category: "Ostatní", total: 8000, type: "expense" }
        ]
      },
      labels: {
        mostUsedCategory: "Potraviny",
        highestIncome: "Výplata - 45 000 Kč",
        highestExpense: "Nájem - 15 000 Kč"
      }
    };

    res.json(mockData);
  } catch (error) {
    console.error('Error fetching overview:', error);
    res.status(500).json({ error: 'Failed to fetch overview' });
  }
});

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
    
    // Start transaction
    await db.asyncRun('BEGIN TRANSACTION');

    // Create client
    await db.asyncRun(
      'INSERT INTO clients (id, name, email, phone, company, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [id, name, email, phone, company, notes]
    );

    // Create default account
    const accountId = `account-${Date.now()}`;
    await db.asyncRun(
      'INSERT INTO accounts (id, client_id, name, bank_name, flags) VALUES (?, ?, ?, ?, ?)',
      [accountId, id, 'Hlavní účet', 'AirBank', JSON.stringify(['main'])]
    );

    // Commit transaction
    await db.asyncRun('COMMIT');

    const client = await db.asyncGet('SELECT * FROM clients WHERE id = ?', [id]);
    res.status(201).json(client);
  } catch (error) {
    // Rollback on error
    await db.asyncRun('ROLLBACK');
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Failed to create client' });
  }
});

// Account endpoints
app.post('/api/accounts', async (req, res) => {
  try {
    const { name, bankName, flags, clientId } = req.body;
    
    if (!name || !bankName || !clientId) {
      return res.status(400).json({ error: 'Name, bank name and client ID are required' });
    }

    const id = `account-${Date.now()}`;
    
    await db.asyncRun(
      'INSERT INTO accounts (id, client_id, name, bank_name, flags) VALUES (?, ?, ?, ?, ?)',
      [id, clientId, name, bankName, JSON.stringify(flags || [])]
    );

    const account = await db.asyncGet('SELECT * FROM accounts WHERE id = ?', [id]);
    
    if (!account) {
      throw new Error('Failed to create account');
    }

    // Parse JSON flags for response
    account.flags = JSON.parse(account.flags || '[]');

    res.status(201).json(account);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  const { accountId, clientId } = req.query;
  
  if (!req.file || !accountId || !clientId) {
    return res.status(400).json({
      error: 'Missing required parameters.',
    });
  }

  const filePath = path.join(__dirname, req.file.path);
  const transactions = [];

  try {
    // Get account to determine bank
    const account = await db.asyncGet('SELECT * FROM accounts WHERE id = ?', [accountId]);
    if (!account) {
      throw new Error('Account not found');
    }

    // Generate statement ID
    const statementId = `statement-${Date.now()}`;
    
    // Create read stream with proper encoding
    const fileStream = fs.createReadStream(filePath)
      .pipe(iconv.decodeStream('win1250'))
      .pipe(csv({ separator: ';' }));

    // Process each row
    for await (const row of fileStream) {
      let normalizedTransaction;
      
      // Normalize based on bank type
      switch (account.bank_name.toLowerCase()) {
        case 'airbank':
          normalizedTransaction = normalizeAirbank(row);
          break;
        default:
          throw new Error(`Unsupported bank: ${account.bank_name}`);
      }

      if (normalizedTransaction) {
        transactions.push({
          ...normalizedTransaction,
          id: `transaction-${Date.now()}-${transactions.length}`,
          statementId,
          accountId
        });
      }
    }

    // Start transaction
    await db.asyncRun('BEGIN TRANSACTION');

    // Insert statement
    await db.asyncRun(
      'INSERT INTO statements (id, account_id, period, transaction_count) VALUES (?, ?, ?, ?)',
      [statementId, accountId, '2025-05', transactions.length]
    );

    // Insert transactions
    for (const transaction of transactions) {
      await db.asyncRun(
        `INSERT INTO transactions (
          id, statement_id, account_id, date, amount, currency, type,
          method, category, counterparty, note, raw
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          transaction.id,
          transaction.statementId,
          transaction.accountId,
          transaction.date,
          transaction.amount,
          transaction.currency,
          transaction.type,
          transaction.method,
          transaction.category,
          transaction.counterparty,
          transaction.note,
          JSON.stringify(transaction.raw)
        ]
      );
    }

    // Update account balance
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    await db.asyncRun(
      'UPDATE accounts SET balance = balance + ? WHERE id = ?',
      [totalAmount, accountId]
    );

    // Commit transaction
    await db.asyncRun('COMMIT');

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({ 
      success: true, 
      transactionCount: transactions.length,
      statementId
    });
  } catch (error) {
    // Rollback on error
    await db.asyncRun('ROLLBACK');
    
    console.error('Error processing file:', error);
    
    // Clean up uploaded file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    res.status(500).json({ 
      error: 'Failed to process file',
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});