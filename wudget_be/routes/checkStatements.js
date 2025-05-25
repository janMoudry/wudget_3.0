// routes/checkStatements.js
import express from "express";
import db from "../db/index.js";

const router = express.Router();

function getMissingPeriods(existingPeriods) {
  const now = new Date();
  const periods = [];
  for (let i = 0; i < 6; i++) {
    const date = new Date(now);
    date.setMonth(now.getMonth() - i);
    const period = date.toISOString().slice(0, 7);
    periods.push(period);
  }
  return periods.filter((p) => !existingPeriods.includes(p));
}

router.get("/", async (req, res) => {
  const { clientId } = req.query;

  if (!clientId) {
    return res.status(400).json({ error: "Missing clientId" });
  }

  try {
    const result = await db.asyncAll(
      `SELECT DISTINCT period FROM statements s
       JOIN accounts a ON s.account_id = a.id
       WHERE a.client_id = ?`,
      [clientId]
    );

    const existingPeriods = result.map((r) => r.period);
    const missingPeriods = getMissingPeriods(existingPeriods);

    const status = missingPeriods.length > 0 ? "incomplete" : "complete";

    res.json({ status, missingPeriods });
  } catch (err) {
    console.error("Error in checkStatements:", err);
    res.status(500).json({ error: "Failed to check statements" });
  }
});

export default router;
