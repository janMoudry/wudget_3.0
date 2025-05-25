// --- routes/dashboard.js ---
import express from "express";
import db from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const clientsCount = await db.asyncGet(
      "SELECT COUNT(*) as count FROM clients"
    );
    const transactionsCount = await db.asyncGet(
      "SELECT COUNT(*) as count FROM transactions"
    );
    const totalBalance = await db.asyncGet(
      "SELECT SUM(balance) as total FROM accounts"
    );

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

    const clientsList = await db.asyncAll(`
      SELECT id, name
      FROM clients
      LIMIT 4
    `);

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
      lastUploads: lastUploads.map((upload) => ({
        ...upload,
        date: new Date(upload.date).toISOString().split("T")[0],
      })),
      maxIncome: maxIncome
        ? {
            counterparty: maxIncome.counterparty,
            amount: maxIncome.amount,
          }
        : null,
      maxExpense: maxExpense
        ? {
            counterparty: maxExpense.counterparty,
            amount: Math.abs(maxExpense.amount),
          }
        : null,
      clientsList,
      outdatedClients: outdatedClients.map((client) => ({
        ...client,
        lastUpdated: client.lastUpdated
          ? new Date(client.lastUpdated).toISOString().split("T")[0]
          : null,
      })),
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;
