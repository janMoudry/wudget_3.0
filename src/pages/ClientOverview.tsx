import { useState } from "react";
import { Button, Typography, Paper } from "../components";
import { useTab } from "../hooks/useTab";
import {
  TrendingUp,
  Target,
  MessageCircle,
  Download,
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Note = {
  id: string;
  content: string;
  createdAt: string;
  type: "meeting" | "call" | "general";
};

type AutoMessage = {
  id: string;
  trigger: string;
  message: string;
  status: "pending" | "sent" | "error";
  scheduledFor?: string;
};

const MOCK_NOTES: Note[] = [
  {
    id: "1",
    content: "Klient má zájem o investiční produkty, domluvena schůzka na příští měsíc",
    createdAt: "2025-03-15T10:00:00Z",
    type: "meeting",
  },
  {
    id: "2",
    content: "Telefonická konzultace ohledně spořícího účtu",
    createdAt: "2025-03-10T14:30:00Z",
    type: "call",
  },
];

const MOCK_MESSAGES: AutoMessage[] = [
  {
    id: "1",
    trigger: "Chybějící výpis",
    message: "Dobrý den, všiml jsem si, že jste zatím nenahrál výpis za minulý měsíc...",
    status: "pending",
    scheduledFor: "2025-03-20T10:00:00Z",
  },
  {
    id: "2",
    trigger: "Gratulace k cíli",
    message: "Gratuluji k dosažení 80% vašeho cíle pro naspořenou částku...",
    status: "sent",
  },
];

const MOCK_CHART_DATA = [
  { month: "Leden", balance: 250000 },
  { month: "Únor", balance: 275000 },
  { month: "Březen", balance: 290000 },
  { month: "Duben", balance: 310000 },
  { month: "Květen", balance: 325000 },
];

const ClientOverview = () => {
  const { client } = useTab();
  const [newNote, setNewNote] = useState("");

  if (!client) return null;

  const financialHealth = 78; // Mock value

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    // Add note logic here
    setNewNote("");
  };

  const handleDownloadPDF = () => {
    // PDF generation logic here
  };

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
            Komplexní pohled na finanční situaci klienta
          </Typography>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleDownloadPDF}>
            <Download size={16} className="mr-2" />
            Stáhnout PDF
          </Button>
        </div>
      </div>

      {/* Financial Health Score */}
      <Paper className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h3" className="text-blue-900 mb-2">
              Finanční zdraví
            </Typography>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-blue-700">
                {financialHealth}%
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Stabilní
              </div>
            </div>
          </div>
          <div className="w-32 h-32 relative">
            <div
              className="w-full h-full rounded-full border-8"
              style={{
                borderColor: `rgba(59, 130, 246, ${financialHealth / 100})`,
                transform: "rotate(-90deg)",
              }}
            />
          </div>
        </div>
      </Paper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Chart */}
        <Paper className="p-6">
          <Typography variant="h3" className="mb-6">
            Vývoj bilance
          </Typography>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_CHART_DATA}>
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
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>

        {/* Goals Progress */}
        <Paper className="p-6">
          <Typography variant="h3" className="mb-6">
            Plnění cílů
          </Typography>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">
                  Naspořit na důchod
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-700">Progress</span>
                <span className="text-green-800 font-medium">80%</span>
              </div>
              <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "80%" }}
                />
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-900">
                  Koupě nemovitosti
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-amber-700">Progress</span>
                <span className="text-amber-800 font-medium">45%</span>
              </div>
              <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: "45%" }}
                />
              </div>
            </div>
          </div>
        </Paper>
      </div>

      {/* Advisor Notes */}
      <Paper className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h3">Poznámky poradce</Typography>
          <Button variant="secondary" size="sm">
            <FileText size={16} className="mr-2" />
            Historie poznámek
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Přidat poznámku..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button onClick={handleAddNote}>Přidat</Button>
          </div>

          <div className="space-y-3">
            {MOCK_NOTES.map((note) => (
              <div
                key={note.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString("cs-CZ")}
                  </span>
                </div>
                <p className="text-gray-900">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </Paper>

      {/* Automated Messages */}
      <Paper className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h3">Automatické zprávy</Typography>
          <Button>
            <Bell size={16} className="mr-2" />
            Nastavit pravidla
          </Button>
        </div>

        <div className="space-y-4">
          {MOCK_MESSAGES.map((message) => (
            <div
              key={message.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-full ${
                      message.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : message.status === "sent"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {message.trigger}
                  </span>
                  {message.scheduledFor && (
                    <span className="text-sm text-gray-500">
                      Naplánováno na:{" "}
                      {new Date(message.scheduledFor).toLocaleDateString("cs-CZ")}
                    </span>
                  )}
                </div>
                <Button variant="secondary" size="sm">
                  Upravit
                </Button>
              </div>
              <p className="text-gray-600">{message.message}</p>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default ClientOverview;