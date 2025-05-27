import { useState } from "react";
import { Button, Typography, Paper } from "../components";
import { TrendingUp, Download, FileText, Target, Brain } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MOCK_DATA = {
  clientProgress: [
    { month: "Leden", balance: 450000, goal: 500000 },
    { month: "Únor", balance: 520000, goal: 525000 },
    { month: "Březen", balance: 480000, goal: 550000 },
    { month: "Duben", balance: 590000, goal: 575000 },
    { month: "Květen", balance: 620000, goal: 600000 },
    { month: "Červen", balance: 580000, goal: 625000 },
  ],
  goals: [
    {
      id: "1",
      name: "Naspořit na důchod",
      progress: 75,
      prediction: "Na dobré cestě - předpokládané splnění v říjnu 2025",
    },
    {
      id: "2",
      name: "Koupě nemovitosti",
      progress: 45,
      prediction: "Mírné zpoždění - doporučeno navýšit měsíční úložku",
    },
  ],
  notes: [
    {
      id: "1",
      date: "2025-03-15",
      content: "Klient zvažuje změnu zaměstnání - sledovat příjmy v následujících měsících",
    },
    {
      id: "2",
      date: "2025-03-01",
      content: "Diskutována možnost refinancování hypotéky v Q4 2025",
    },
  ],
};

const Advisor = () => {
  const [selectedClient] = useState("Petr Novák"); // In real app, this would be managed through state/context

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-gray-900" />
            </div>
            <Typography variant="h2" className="text-gray-900">
              Přehled vývoje klienta
            </Typography>
          </div>
          <Typography variant="small" className="text-gray-500">
            Detailní analýza vývoje klienta {selectedClient}
          </Typography>
        </div>

        <Button variant="secondary">
          <Download size={16} className="mr-2" />
          Stáhnout PDF report
        </Button>
      </div>

      {/* Financial Health Score */}
      <Paper className="p-6 bg-blue-50 border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <Typography variant="h3" className="text-blue-900 mb-1">
                Finanční zdraví
              </Typography>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-700">78%</span>
                <span className="text-blue-600">Stabilní</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-blue-700">
            <p>Poslední aktualizace: {new Date().toLocaleDateString("cs-CZ")}</p>
          </div>
        </div>
      </Paper>

      {/* Progress Chart */}
      <Paper className="p-6">
        <Typography variant="h3" className="mb-6">
          Vývoj bilance vs. cíle
        </Typography>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_DATA.clientProgress}>
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
                formatter={(value: number) =>
                  value.toLocaleString("cs-CZ", {
                    style: "currency",
                    currency: "CZK",
                  })
                }
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="balance"
                name="Aktuální bilance"
                stroke="#3B82F6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="goal"
                name="Cílová bilance"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Paper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals Progress */}
        <Paper className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-gray-900" />
            <Typography variant="h3">Plnění cílů</Typography>
          </div>
          <div className="space-y-6">
            {MOCK_DATA.goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{goal.name}</p>
                  <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">{goal.prediction}</p>
              </div>
            ))}
          </div>
        </Paper>

        {/* Advisor Notes */}
        <Paper className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-5 h-5 text-gray-900" />
            <Typography variant="h3">Poznámky poradce</Typography>
          </div>
          <div className="space-y-4">
            {MOCK_DATA.notes.map((note) => (
              <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(note.date).toLocaleDateString("cs-CZ")}
                </p>
                <p className="text-gray-900">{note.content}</p>
              </div>
            ))}
            <Button variant="secondary" className="w-full">
              <FileText size={16} className="mr-2" />
              Přidat poznámku
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Advisor;