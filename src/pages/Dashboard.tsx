import { Typography, Paper, Button } from "../components";
import { User, TrendingUp, CreditCard, Wallet } from "lucide-react";

const Dashboard = () => {
  const mock = {
    clients: 4,
    transactions: 1290,
    balance: 143256,
    lastUploads: [
      { clientName: "ACME s.r.o.", bank: "AirBank", date: "2025-05-24" },
      { clientName: "Techify", bank: "Moneta", date: "2025-05-22" },
      { clientName: "DeltaWare", bank: "ČSOB", date: "2025-05-20" },
    ],
    maxIncome: {
      counterparty: "Rohlík s.r.o.",
      amount: 85000,
    },
    maxExpense: {
      counterparty: "Datart",
      amount: 42000,
    },
    clientsList: [
      { name: "ACME s.r.o.", id: 1 },
      { name: "Techify", id: 2 },
      { name: "DeltaWare", id: 3 },
      { name: "InovaTech", id: 4 },
    ],
    outdatedClients: [
      { id: 1, name: "ACME s.r.o.", lastUpdated: "2024-11-12" },
      { id: 4, name: "InovaTech", lastUpdated: null },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" className="text-neutral-100 mb-2">
          Úvodní přehled
        </Typography>
        <Typography variant="small" className="text-neutral-400">
          Globální pohled na data všech klientů
        </Typography>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-500/10 rounded-lg">
              <User className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <Typography variant="small" className="text-neutral-400 mb-1">
                Počet klientů
              </Typography>
              <Typography variant="h2" className="text-neutral-100">
                {mock.clients}
              </Typography>
            </div>
          </div>
        </Paper>

        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success-500" />
            </div>
            <div>
              <Typography variant="small" className="text-neutral-400 mb-1">
                Celkem transakcí
              </Typography>
              <Typography variant="h2" className="text-neutral-100">
                {mock.transactions}
              </Typography>
            </div>
          </div>
        </Paper>

        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning-500/10 rounded-lg">
              <CreditCard className="w-6 h-6 text-warning-500" />
            </div>
            <div>
              <Typography variant="small" className="text-neutral-400 mb-1">
                Celková bilance
              </Typography>
              <Typography variant="h2" className="text-neutral-100">
                {mock.balance.toLocaleString("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                })}
              </Typography>
            </div>
          </div>
        </Paper>

        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-500/10 rounded-lg">
              <Wallet className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <Typography variant="small" className="text-neutral-400 mb-1">
                Průměrná transakce
              </Typography>
              <Typography variant="h2" className="text-neutral-100">
                {(mock.balance / mock.transactions).toLocaleString("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                  maximumFractionDigits: 0,
                })}
              </Typography>
            </div>
          </div>
        </Paper>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Poslední výpisy */}
        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <Typography variant="h3" className="text-neutral-100 mb-4">
            Poslední výpisy
          </Typography>
          <div className="space-y-4">
            {mock.lastUploads.map((u, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded-lg bg-neutral-700/50"
              >
                <div>
                  <p className="text-neutral-100 font-medium">{u.clientName}</p>
                  <p className="text-sm text-neutral-400">{u.bank}</p>
                </div>
                <span className="text-sm text-neutral-400">{u.date}</span>
              </div>
            ))}
          </div>
        </Paper>

        {/* Největší transakce */}
        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <Typography variant="h3" className="text-neutral-100 mb-4">
            Největší transakce
          </Typography>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-success-500/10 border border-success-500/20">
              <p className="text-success-400 font-medium mb-1">Největší příjem</p>
              <p className="text-success-100 text-lg font-semibold">
                {mock.maxIncome.amount.toLocaleString("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                })}
              </p>
              <p className="text-sm text-success-300 mt-1">
                {mock.maxIncome.counterparty}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-error-500/10 border border-error-500/20">
              <p className="text-error-400 font-medium mb-1">Největší výdaj</p>
              <p className="text-error-100 text-lg font-semibold">
                {mock.maxExpense.amount.toLocaleString("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                })}
              </p>
              <p className="text-sm text-error-300 mt-1">
                {mock.maxExpense.counterparty}
              </p>
            </div>
          </div>
        </Paper>
      </div>

      {/* Seznam klientů */}
      <Paper className="p-6 bg-neutral-800 border-neutral-700">
        <Typography variant="h3" className="text-neutral-100 mb-4">
          Klienti bez aktuálního výpisu
        </Typography>
        {mock.outdatedClients.length === 0 ? (
          <p className="text-neutral-400">
            Všichni klienti jsou aktuální ✅
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mock.outdatedClients.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-lg bg-neutral-700/50 border border-neutral-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-600 rounded-lg">
                      <User className="w-5 h-5 text-neutral-300" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-100">{c.name}</p>
                      <p className="text-xs text-neutral-400 mt-1">
                        Naposledy: {c.lastUpdated || "nikdy"}
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Dashboard;