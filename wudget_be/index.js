// --- index.js ---
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import overviewRoutes from "./routes/overview.js";
import clientsRoutes from "./routes/clients.js";
import accountsRoutes from "./routes/accounts.js";
import uploadRoutes from "./routes/upload.js";
import authenticate from "./middleware/authenticate.js";
import statementsRoutes from "./routes/statements.js";
import transactionsRoutes from "./routes/transactions.js";
import checkStatementsRoutes from "./routes/checkStatements.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/login", authRoutes);
app.use("/api", authenticate);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/overview", overviewRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/accounts", accountsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/statements", statementsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/checkStatements", authenticate, checkStatementsRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
