// --- routes/upload.js ---
import express from "express";
import multer from "multer";
import iconv from "iconv-lite";
import csv from "csv-parser";
import db from "../db/index.js";
import { normalizeAirbank } from "../normalizers/airbank.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  const { clientId, accountId, bank } = req.query;

  if (!req.file || !clientId || !accountId || !bank) {
    return res
      .status(400)
      .json({ error: "Missing file, clientId, accountId or bank" });
  }

  const transactions = [];

  try {
    const account = await db.asyncGet("SELECT * FROM accounts WHERE id = ?", [
      accountId,
    ]);
    if (!account) {
      throw new Error("Account not found");
    }

    const statementId = `statement-${Date.now()}`;
    const period = new Date().toISOString().slice(0, 7);

    const bufferStream = iconv.decode(Buffer.from(req.file.buffer), "win1250");

    const parsedRows = [];
    await new Promise((resolve, reject) => {
      const parser = csv({ separator: ";" });
      parser
        .on("data", (row) => parsedRows.push(row))
        .on("end", resolve)
        .on("error", reject);
      parser.write(bufferStream);
      parser.end();
    });

    for (const row of parsedRows) {
      let tx = null;
      switch (bank.toLowerCase()) {
        case "airbank":
          tx = normalizeAirbank(row);
          break;
        default:
          throw new Error(`Unsupported bank: ${bank}`);
      }

      if (tx) {
        transactions.push({
          ...tx,
          id: `tx-${Date.now()}-${transactions.length}`,
          statementId,
          accountId,
        });
      }
    }

    await db.asyncRun("BEGIN TRANSACTION");

    await db.asyncRun(
      `INSERT INTO statements (id, account_id, period, transaction_count) VALUES (?, ?, ?, ?)`,
      [statementId, accountId, period, transactions.length]
    );

    for (const tx of transactions) {
      await db.asyncRun(
        `INSERT INTO transactions (
          id, statement_id, account_id, date, amount, currency, type,
          method, category, counterparty, note, raw
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          tx.id,
          tx.statementId,
          tx.accountId,
          tx.date,
          tx.amount,
          tx.currency,
          tx.type,
          tx.method,
          tx.category,
          tx.counterparty,
          tx.note,
          JSON.stringify(tx.raw),
        ]
      );
    }

    await db.asyncRun(
      "UPDATE accounts SET balance = balance + ? WHERE id = ?",
      [transactions.reduce((sum, t) => sum + t.amount, 0), accountId]
    );

    await db.asyncRun("COMMIT");

    res.json({
      success: true,
      transactionCount: transactions.length,
      statementId,
    });
  } catch (error) {
    await db.asyncRun("ROLLBACK");
    console.error("Upload error:", error);
    res.status(500).json({
      error: "Failed to upload statement",
      details: error.message,
    });
  }
});

export default router;
