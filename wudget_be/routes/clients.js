// --- routes/clients.js ---
import express from "express";
import db from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const clients = await db.asyncAll(
      "SELECT id, name, status, updated_at as lastUpdatedAt FROM clients"
    );
    res.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await db.asyncGet("SELECT * FROM clients WHERE id = ?", [
      id,
    ]);

    if (!client) return res.status(404).json({ error: "Client not found" });

    const accounts = await db.asyncAll(
      "SELECT * FROM accounts WHERE client_id = ?",
      [id]
    );

    const clientWithAccounts = {
      ...client,
      accounts: accounts.map((account) => ({
        ...account,
        flags: JSON.parse(account.flags || "[]"),
      })),
    };

    res.json(clientWithAccounts);
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({ error: "Failed to fetch client details" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, notes } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });

    const id = `client-${Date.now()}`;
    const accountId = `account-${Date.now()}`;

    await db.asyncRun("BEGIN TRANSACTION");
    await db.asyncRun(
      "INSERT INTO clients (id, name, email, phone, company, notes) VALUES (?, ?, ?, ?, ?, ?)",
      [id, name, email, phone, company, notes]
    );
    await db.asyncRun(
      "INSERT INTO accounts (id, client_id, name, bank_name, flags) VALUES (?, ?, ?, ?, ?)",
      [accountId, id, "Hlavní účet", "AirBank", JSON.stringify(["main"])]
    );
    await db.asyncRun("COMMIT");

    const client = await db.asyncGet("SELECT * FROM clients WHERE id = ?", [
      id,
    ]);
    res.status(201).json(client);
  } catch (error) {
    await db.asyncRun("ROLLBACK");
    console.error("Error creating client:", error);
    res.status(500).json({ error: "Failed to create client" });
  }
});

export default router;
