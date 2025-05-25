import { useEffect, useState } from "react";
import { useTab } from "../hooks/useTab";
import { Typography, Paper, Button } from "../components";
import { TrendingUp, CreditCard, Wallet, ArrowDownUp, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../navigation/ROUTES";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";

const ClientDashboard = () => {
  const { client, tab } = useTab();
  const navigate = useNavigate();
  const [overview, setOverview] = useState<{
    balance: number;
    stats: {
      totalIncome: number;
      totalExpense: number;
      totalTransactions: number;
    };
    chartData: {
      byDay: { date: string; income: number; expense: number }[];
      byCategory: { category: string; total: number; type: string }[];
    };
    labels: {
      mostUsedCategory: string;
      highestIncome: string;
      highestExpense: string;
    };
  } | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:3001/api/overview", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Failed to fetch overview");
        const json = await res.json();
        const normalized = {
          ...json,
          chartData: {
            byDay: json.chartData.byDay.map(
              (entry: { expense: number }) => ({
                ...entry,
                expense: Math.abs(entry.expense),
              })
            ),
            byCategory: json.chartData.byCategory
              .filter((entry: { type: string }) => entry.type === "expense")
              .map((entry: { total: number }) => ({
                ...entry,
                total: Math.abs(entry.total),
              })),
          },
        };
        setOverview(normalized);
      } catch (err) {
        console.error("Error fetching overview:", err);
        setOverview(null);
      }
    };

    if (client?.id) {
      fetchOverview();
    }
  }, [client?.id]);

  if (!overview) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-14rem)] text-center">
        <div className="mb-8">
          <Typography variant="h2" className="text-gray-900 mb-4">
            Zatím zde nejsou žádná data
          </Typography>
          <Typography variant="body" className="text-gray-600 mb-8">
            Pro zobrazení přehledu je potřeba nahrát první bankovní výpis
          </Typography>
          <Button 
            onClick={() => navigate(ROUTES.CLIENT.UPLOAD.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`))}
          >
            <Upload size={16} className="mr-2" />
            Nahrát první výpis
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-gray-900" />
          </div>
          <Typography variant="h2" className="text-gray-900">
            {client?.name}
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Přehled vystavených výpisů a transakcí
        </Typography>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Paper className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <ArrowDownUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <Typography variant="small" className="text-gray-500 mb-1">
                Celková bilance
              </Typography>
              <Typography
                variant="h3"
                className={overview.balance >= 0 ? "text-green-600" : "text-red-600"}
              >
                {overview.balance.toLocaleString("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                })}
              </Typography>
            </div>
          </div>
        </Paper>

        <Paper className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <Typography variant="small" className="text-gray-500 mb-1">
                Příjmy
              </Typography>
              <Typography variant="h3" className="text-gray-900">
                {overview.stats.totalIncome.toLocaleString("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                })}
              </Typography>
            </div>
          </div>
        </Paper>

        <Paper className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <Wallet className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <Typography variant="small" className="text-gray-500 mb-1">
                Výdaje
              </Typography>
              <Typography variant="h3" className="text-gray-900">
                {Math.abs(overview.stats.totalExpense).toLocaleString("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                })}
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
                Počet transakcí
              </Typography>
              <Typography variant="h3" className="text-gray-900">
                {overview.stats.totalTransactions}
              </Typography>
            </div>
          </div>
        </Paper>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Paper className="p-6">
          <Typography variant="h3" className="mb-6">Vývoj v čase</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={overview.chartData.byDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10B981"
                name="Příjmy"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#EF4444"
                name="Výdaje"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        <Paper className="p-6">
          <Typography variant="h3" className="mb-6">Kategorie výdajů</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={overview.chartData.byCategory}
              layout="vertical"
              margin={{ top: 0, right: 0, left: 40, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis
                dataKey="category"
                type="category"
                stroke="#6B7280"
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
                formatter={(value) =>
                  Number(value).toLocaleString("cs-CZ", {
                    style: "currency",
                    currency: "CZK",
                  })
                }
              />
              <Bar
                dataKey="total"
                fill="#6366F1"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </div>

      {/* Additional Info */}
      <Paper className="p-6">
        <Typography variant="h3" className="mb-4">Další informace</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Typography variant="small" className="text-gray-500">
              Nejčastější kategorie
            </Typography>
            <Typography variant="body" className="font-medium">
              {overview.labels.mostUsedCategory}
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="small" className="text-gray-500">
              Největší příjem
            </Typography>
            <Typography variant="body" className="font-medium text-green-600">
              {overview.labels.highestIncome}
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="small" className="text-gray-500">
              Největší výdaj
            </Typography>
            <Typography variant="body" className="font-medium text-red-600">
              {overview.labels.highestExpense}
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ClientDashboard;