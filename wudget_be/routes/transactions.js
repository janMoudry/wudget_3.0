// --- routes/transactions.js ---
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
    const { clientId, range = "all", accountIds } = req.query;
    if (!clientId || !accountIds) {
      return res.status(400).json({ error: "Missing clientId or accountIds" });
    }

    const { from, to } = getDateRange(range);

    let accountList = [];
    let accountFilter = "";
    let params = [from, to];

    if (accountIds !== "all") {
      accountList = accountIds.split(",");
      accountFilter = `AND a.id IN (${accountList.map(() => "?").join(",")})`;
      params = [from, to, ...accountList];
    }

    const transactions = await db.asyncAll(
      `SELECT 
        t.date,
        t.amount,
        t.currency,
        t.type,
        t.method,
        t.category,
        t.counterparty,
        t.note,
        t.raw
      FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      WHERE a.client_id = ? AND t.date BETWEEN ? AND ? ${accountFilter}
      ORDER BY t.date DESC`,
      [clientId, ...params]
    );

    res.json({ data: transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

export default router;
