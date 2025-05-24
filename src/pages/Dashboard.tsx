import { Typography, Paper, Button } from "../components";
import { User, TrendingUp, Users, CreditCard, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

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
    <div className="p-6 space-y-6 bg-neutral-900 min-h-[calc(100vh-3.5rem)]">
      <div>
        <Typography variant="h2" className="mb-1 text-white">
          Přehled
        </Typography>
        <Typography variant="small" className="text-neutral-400">
          Souhrnné informace o všech klientech a transakcích
        </Typography>
      </div>

      {/* Statistiky */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-400">Klienti</p>
              <p className="text-2xl font-bold text-white mt-1">{mock.clients}</p>
            </div>
            <div className="p-2 bg-primary-500/10 rounded-lg">
              <Users className="h-5 w-5 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-success-500">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+2.1% oproti minulému měsíci</span>
          </div>
        </Paper>

        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-400">Transakce</p>
              <p className="text-2xl font-bold text-white mt-1">
                {mock.transactions.toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-warning-500/10 rounded-lg">
              <CreditCard className="h-5 w-5 text-warning-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-error-500">
            <ArrowDownRight className="h-4 w-4 mr-1" />
            <span>-0.8% oproti minulému měsíci</span>
          </div>
        </Paper>

        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-400">Bilance</p>
              <p className="text-2xl font-bold text-white mt-1">
                {mock.balance.toLocaleString("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                })}
              </p>
            </div>
            <div className="p-2 bg-success-500/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-success-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-success-500">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+5.3% oproti minulému měsíci</span>
          </div>
        </Paper>

        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-400">Poslední výpis</p>
              <p className="text-2xl font-bold text-white mt-1">24.5.</p>
            </div>
            <div className="p-2 bg-primary-500/10 rounded-lg">
              <Clock className="h-5 w-5 text-primary-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-neutral-400">
            <span>ACME s.r.o. - AirBank</span>
          </div>
        </Paper>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Poslední výpisy */}
        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <Typography variant="h3" className="mb-4 text-white">
            Poslední výpisy
          </Typography>
          <div className="space-y-4">
            {mock.lastUploads.map((u, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-neutral-700/50 hover:bg-neutral-700 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-500/10 rounded-lg">
                    <CreditCard className="h-4 w-4 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{u.clientName}</p>
                    <p className="text-xs text-neutral-400">{u.bank}</p>
                  </div>
                </div>
                <span className="text-sm text-neutral-400">{u.date}</span>
              </div>
            ))}
          </div>
        </Paper>

        {/* Největší transakce */}
        <Paper className="p-6 bg-neutral-800 border-neutral-700">
          <Typography variant="h3" className="mb-4 text-white">
            Největší transakce
          </Typography>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-success-500/10 border border-success-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-success-400">Největší příjem</p>
                  <p className="text-lg font-semibold text-success-500 mt-1">
                    {mock.maxIncome.amount.toLocaleString("cs-CZ", {
                      style: "currency",
                      currency: "CZK",
                    })}
                  </p>
                </div>
                <ArrowUpRight className="h-6 w-6 text-success-500" />
              </div>
              <p className="text-sm text-success-400 mt-2">{mock.maxIncome.counterparty}</p>
            </div>

            <div className="p-4 rounded-lg bg-error-500/10 border border-error-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-error-400">Největší výdaj</p>
                  <p className="text-lg font-semibold text-error-500 mt-1">
                    {mock.maxExpense.amount.toLocaleString("cs-CZ", {
                      style: "currency",
                      currency: "CZK",
                    })}
                  </p>
                </div>
                <ArrowDownRight className="h-6 w-6 text-error-500" />
              </div>
              <p className="text-sm text-error-400 mt-2">{mock.maxExpense.counterparty}</p>
            </div>
          </div>
        </Paper>
      </div>

      {/* Klienti bez aktuálního výpisu */}
      <Paper className="p-6 bg-neutral-800 border-neutral-700">
        <Typography variant="h3" className="mb-4 text-white">
          Klienti bez aktuálního výpisu
        </Typography>
        {mock.outdatedClients.length === 0 ? (
          <p className="text-sm text-neutral-400">
            Všichni klienti jsou aktuální ✅
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mock.outdatedClients.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-lg bg-neutral-700/50 border border-neutral-600 hover:bg-neutral-700 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-warning-500/10 rounded-lg">
                      <User className="h-5 w-5 text-warning-500" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{c.name}</p>
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