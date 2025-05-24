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
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <Typography variant="h2" className="text-gray-900 mb-2">
          Úvodní přehled
        </Typography>
        <Typography variant="small" className="text-gray-500">
          Globální pohled na data všech klientů
        </Typography>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Paper className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <Typography variant="small" className="text-gray-500 mb-1">
                Počet klientů
              </Typography>
              <Typography variant="h2" className="text-gray-900">
                {mock.clients}
              </Typography>
            </div>
          </div>
        </Paper>

        <Paper className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <Typography variant="small" className="text-gray-500 mb-1">
                Celkem transakcí
              </Typography>
              <Typography variant="h2" className="text-gray-900">
                {mock.transactions}
              </Typography>
            </div>
          </div>
        </Paper>

        <Paper className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <Typography variant="small" className="text-gray-500 mb-1">
                Celková bilance
              </Typography>
              <Typography variant="h2" className="text-gray-900">
                {mock.balance.toLocaleString("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                })}
              </Typography>
            </div>
          </div>
        </Paper>

        <Paper className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <Wallet className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <Typography variant="small" className="text-gray-500 mb-1">
                Průměrná transakce
              </Typography>
              <Typography variant="h2" className="text-gray-900">
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
        <Paper className="p-6">
          <Typography variant="h3" className="text-gray-900 mb-4">
            Poslední výpisy
          </Typography>
          <div className="space-y-4">
            {mock.lastUploads.map((u, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
              >
                <div>
                  <p className="text-gray-900 font-medium">{u.clientName}</p>
                  <p className="text-sm text-gray-500">{u.bank}</p>
                </div>
                <span className="text-sm text-gray-500">{u.date}</span>
              </div>
            ))}
          </div>
        </Paper>

        {/* Největší transakce */}
        <Paper className="p-6">
          <Typography variant="h3" className="text-gray-900 mb-4">
            Největší transakce
          </Typography>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-100">
              <p className="text-green-700 font-medium mb-1">Největší příjem</p>
              <p className="text-green-900 text-lg font-semibold">
                {mock.maxIncome.amount.toLocaleString("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                })}
              </p>
              <p className="text-sm text-green-600 mt-1">
                {mock.maxIncome.counterparty}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-red-50 border border-red-100">
              <p className="text-red-700 font-medium mb-1">Největší výdaj</p>
              <p className="text-red-900 text-lg font-semibold">
                {mock.maxExpense.amount.toLocaleString("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                })}
              </p>
              <p className="text-sm text-red-600 mt-1">
                {mock.maxExpense.counterparty}
              </p>
            </div>
          </div>
        </Paper>
      </div>

      {/* Seznam klientů */}
      <Paper className="p-6">
        <Typography variant="h3" className="text-gray-900 mb-4">
          Klienti bez aktuálního výpisu
        </Typography>
        {mock.outdatedClients.length === 0 ? (
          <p className="text-gray-500">
            Všichni klienti jsou aktuální ✅
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mock.outdatedClients.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-lg bg-gray-50 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
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