import { useQuery } from "@tanstack/react-query";
import { Typography, Paper, Button } from "../components";
import { User, TrendingUp, CreditCard, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../navigation/ROUTES";

type DashboardData = {
  clients: number;
  transactions: number;
  balance: number;
  lastUploads: {
    clientName: string;
    bank: string;
    date: string;
  }[];
  maxIncome: {
    counterparty: string;
    amount: number;
  } | null;
  maxExpense: {
    counterparty: string;
    amount: number;
  } | null;
  clientsList: {
    id: number;
    name: string;
  }[];
  outdatedClients: {
    id: number;
    name: string;
    lastUpdated: string | null;
  }[];
};

const getDashboardData = async (): Promise<DashboardData> => {
  const token = localStorage.getItem('token');
  const res = await fetch("http://localhost:3001/api/dashboard", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return res.json();
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] text-gray-500">
        Načítám data...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] text-error-500">
        Chyba při načítání dat.
      </div>
    );
  }

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
                {data.clients}
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
                {data.transactions}
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
                {data.balance.toLocaleString("cs-CZ", {
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
                {(data.balance / data.transactions).toLocaleString("cs-CZ", {
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
            {data.lastUploads.map((upload, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
              >
                <div>
                  <p className="text-gray-900 font-medium">{upload.clientName}</p>
                  <p className="text-sm text-gray-500">{upload.bank}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(upload.date).toLocaleDateString("cs-CZ")}
                </span>
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
            {data.maxIncome && (
              <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                <p className="text-green-700 font-medium mb-1">Největší příjem</p>
                <p className="text-green-900 text-lg font-semibold">
                  {data.maxIncome.amount.toLocaleString("cs-CZ", {
                    style: "currency",
                    currency: "CZK",
                  })}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {data.maxIncome.counterparty}
                </p>
              </div>
            )}

            {data.maxExpense && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                <p className="text-red-700 font-medium mb-1">Největší výdaj</p>
                <p className="text-red-900 text-lg font-semibold">
                  {data.maxExpense.amount.toLocaleString("cs-CZ", {
                    style: "currency",
                    currency: "CZK",
                  })}
                </p>
                <p className="text-sm text-red-600 mt-1">
                  {data.maxExpense.counterparty}
                </p>
              </div>
            )}
          </div>
        </Paper>
      </div>

      {/* Seznam klientů */}
      <Paper className="p-6">
        <Typography variant="h3" className="text-gray-900 mb-4">
          Klienti bez aktuálního výpisu
        </Typography>
        {data.outdatedClients.length === 0 ? (
          <p className="text-gray-500">
            Všichni klienti jsou aktuální ✅
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.outdatedClients.map((client) => (
              <div
                key={client.id}
                className="p-4 rounded-lg bg-gray-50 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Naposledy: {client.lastUpdated ? new Date(client.lastUpdated).toLocaleDateString("cs-CZ") : "nikdy"}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => navigate(ROUTES.CLIENT.DASHBOARD.replace(ROUTES.CLIENT_ROOT, `/${client.id}/`))}
                  >
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