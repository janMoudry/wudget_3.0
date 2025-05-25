import { useState } from "react";
import { Button, Typography, Paper, Select } from "../components";
import { ChartBar, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const MOCK_DATA = {
  monthlyRevenue: [
    { month: "Leden", income: 450000, expense: -320000 },
    { month: "Únor", income: 520000, expense: -380000 },
    { month: "Březen", income: 480000, expense: -350000 },
    { month: "Duben", income: 590000, expense: -420000 },
    { month: "Květen", income: 620000, expense: -460000 },
    { month: "Červen", income: 580000, expense: -390000 },
  ],
  categoryDistribution: [
    { name: "Nákupy", value: 35 },
    { name: "Služby", value: 25 },
    { name: "Doprava", value: 20 },
    { name: "Zábava", value: 15 },
    { name: "Ostatní", value: 5 },
  ],
  clientGrowth: [
    { month: "Leden", active: 12, inactive: 2 },
    { month: "Únor", active: 15, inactive: 3 },
    { month: "Březen", active: 18, inactive: 2 },
    { month: "Duben", active: 22, inactive: 4 },
    { month: "Květen", active: 25, inactive: 3 },
    { month: "Červen", active: 28, inactive: 2 },
  ],
};

const COLORS = ["#3B82F6", "#10B981", "#6366F1", "#F59E0B", "#EF4444"];

const Reports = () => {
  const [period, setPeriod] = useState("month");

  const formatCurrency = (value: number) =>
    Math.abs(value).toLocaleString("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: 0,
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <ChartBar className="w-5 h-5 text-gray-900" />
            </div>
            <Typography variant="h2" className="text-gray-900">
              Reporty
            </Typography>
          </div>
          <Typography variant="small" className="text-gray-500">
            Přehled statistik a analýz
          </Typography>
        </div>

        <div className="flex items-center gap-4">
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-40"
          >
            <option value="week">Tento týden</option>
            <option value="month">Tento měsíc</option>
            <option value="quarter">Toto čtvrtletí</option>
            <option value="year">Tento rok</option>
          </Select>

          <Button variant="secondary">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Chart */}
      <Paper className="p-6">
        <Typography variant="h3" className="mb-6">
          Vývoj příjmů a výdajů
        </Typography>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_DATA.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis
                stroke="#6B7280"
                tickFormatter={(value) =>
                  value.toLocaleString("cs-CZ", {
                    notation: "compact",
                    compactDisplay: "short",
                  })
                }
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
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
                name="Příjmy"
                stroke="#10B981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expense"
                name="Výdaje"
                stroke="#EF4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Paper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Paper className="p-6">
          <Typography variant="h3" className="mb-6">
            Rozložení kategorií
          </Typography>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_DATA.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                    name,
                  }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-sm font-medium"
                      >
                        {`${name} ${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                  outerRadius={120}
                  dataKey="value"
                >
                  {MOCK_DATA.categoryDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Paper>

        {/* Client Growth */}
        <Paper className="p-6">
          <Typography variant="h3" className="mb-6">
            Vývoj klientů
          </Typography>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DATA.clientGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="active"
                  name="Aktivní klienti"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="inactive"
                  name="Neaktivní klienti"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Reports;