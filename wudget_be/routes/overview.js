// routes/overview.js
import express from "express";
import db from "../db/index.js";

const router = express.Router();

function getDateRange(range) {
  const now = new Date();
  const from = new Date(now);
  const to = new Date(now);

  switch (range) {
    case "week":
      from.setDate(now.getDate() - now.getDay());
      break;
    case "month":
      from.setDate(1);
      break;
    case "lastMonth":
      from.setMonth(from.getMonth() - 1);
      from.setDate(1);
      to.setDate(0);
      break;
    case "quarter":
      const currentMonth = now.getMonth();
      const quarterStartMonth = currentMonth - (currentMonth % 3);
      from.setMonth(quarterStartMonth);
      from.setDate(1);
      break;
    case "year":
      from.setMonth(0);
      from.setDate(1);
      break;
    case "all":
    default:
      return { from: "1970-01-01", to: "2099-12-31" };
  }

  return {
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  };
}

router.get("/", async (req, res) => {
  try {
    const { clientId, accountId = "all", range = "all" } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: "Missing clientId" });
    }

    const { from, to } = getDateRange(range);
    const accountFilter = accountId !== "all" ? "AND a.id = ?" : "";
    const accountParams = accountId !== "all" ? [accountId] : [];

    const balance = await db.asyncGet(
      `
      SELECT SUM(a.balance) as total
      FROM accounts a
      WHERE a.client_id = ?
    `,
      [clientId]
    );

    const stats = await db.asyncGet(
      `
      SELECT 
        COUNT(*) as totalTransactions,
        SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as totalIncome,
        SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as totalExpense
      FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      WHERE a.client_id = ? AND t.date BETWEEN ? AND ? ${accountFilter}
    `,
      [clientId, from, to, ...accountParams]
    );

    const byDay = await db.asyncAll(
      `
      SELECT 
        t.date,
        SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as income,
        SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as expense
      FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      WHERE a.client_id = ? AND t.date BETWEEN ? AND ? ${accountFilter}
      GROUP BY t.date
      ORDER BY t.date DESC
      LIMIT 30
    `,
      [clientId, from, to, ...accountParams]
    );

    const byCategory = await db.asyncAll(
      `
      SELECT 
        t.category,
        t.type,
        SUM(ABS(t.amount)) as total
      FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      WHERE a.client_id = ? AND t.category IS NOT NULL AND t.date BETWEEN ? AND ? ${accountFilter}
      GROUP BY t.category, t.type
      ORDER BY total DESC
    `,
      [clientId, from, to, ...accountParams]
    );

    const labels = await db.asyncGet(
      `
      SELECT 
        (
          SELECT t.category
          FROM transactions t
          JOIN accounts a ON t.account_id = a.id
          WHERE a.client_id = ? AND t.category IS NOT NULL
          GROUP BY t.category
          ORDER BY COUNT(*) DESC
          LIMIT 1
        ) as mostUsedCategory,
        (
          SELECT t.counterparty || ' - ' || t.amount || ' ' || t.currency
          FROM transactions t
          JOIN accounts a ON t.account_id = a.id
          WHERE a.client_id = ? AND t.type = 'income'
          ORDER BY t.amount DESC
          LIMIT 1
        ) as highestIncome,
        (
          SELECT t.counterparty || ' - ' || ABS(t.amount) || ' ' || t.currency
          FROM transactions t
          JOIN accounts a ON t.account_id = a.id
          WHERE a.client_id = ? AND t.type = 'expense'
          ORDER BY t.amount ASC
          LIMIT 1
        ) as highestExpense
    `,
      [clientId, clientId, clientId]
    );

    res.json({
      balance: balance?.total || 0,
      stats: {
        totalIncome: stats?.totalIncome || 0,
        totalExpense: stats?.totalExpense || 0,
        totalTransactions: stats?.totalTransactions || 0,
      },
      chartData: {
        byDay,
        byCategory,
      },
      labels,
    });
  } catch (error) {
    console.error("Error in overview:", error);
    res.status(500).json({ error: "Failed to fetch overview" });
  }
});

export default router;
