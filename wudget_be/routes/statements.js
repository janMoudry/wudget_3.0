// --- routes/statements.js ---
import express from "express";
import db from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { accountId } = req.query;
    let statements = [];

    if (!accountId || accountId === "all") {
      statements = await db.asyncAll(`
        SELECT 
          s.id,
          s.account_id,
          a.bank_name as bank,
          s.period,
          s.uploaded_at as uploadedAt,
          s.transaction_count as transactionCount
        FROM statements s
        JOIN accounts a ON s.account_id = a.id
        ORDER BY s.uploaded_at DESC
      `);
    } else {
      statements = await db.asyncAll(
        `
        SELECT 
          s.id,
          s.account_id,
          a.bank_name as bank,
          s.period,
          s.uploaded_at as uploadedAt,
          s.transaction_count as transactionCount
        FROM statements s
        JOIN accounts a ON s.account_id = a.id
        WHERE s.account_id = ?
        ORDER BY s.uploaded_at DESC
      `,
        [accountId]
      );
    }

    res.json({ data: statements });
  } catch (error) {
    console.error("Error fetching statements:", error);
    res.status(500).json({ error: "Failed to fetch statements" });
  }
});

export default router;
