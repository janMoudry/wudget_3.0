// routes/transactions.js
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
      const quarterStart = now.getMonth() - (now.getMonth() % 3);
      from.setMonth(quarterStart);
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
    const { from, to } = getDateRange(range);

    if (!clientId) {
      return res.status(400).json({ error: "Missing clientId" });
    }

    let accountFilter = "";
    let accountParams = [];

    if (accountIds && accountIds !== "all") {
      const list = Array.isArray(accountIds)
        ? accountIds
        : accountIds.split(",");
      accountFilter = `AND t.account_id IN (${list.map(() => "?").join(",")})`;
      accountParams = list;
    }

    const transactions = await db.asyncAll(
      `
      SELECT t.*
      FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      WHERE a.client_id = ?
        AND t.date BETWEEN ? AND ?
        ${accountFilter}
      ORDER BY t.date DESC
      `,
      [clientId, from, to, ...accountParams]
    );

    res.json({ data: transactions });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
