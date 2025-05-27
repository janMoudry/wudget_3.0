import { useState } from "react";
import { Button, Typography, Paper, TextField, Select } from "../components";
import { MessageSquare, Plus, Bell, Send, Calendar, Settings } from "lucide-react";

type AutoMessage = {
  id: string;
  name: string;
  condition: string;
  template: string;
  status: "active" | "inactive";
  lastTriggered?: string;
};

type ScheduledMessage = {
  id: string;
  clientName: string;
  subject: string;
  content: string;
  scheduledFor: string;
  status: "pending" | "sent" | "failed";
};

const MOCK_AUTO_MESSAGES: AutoMessage[] = [
  {
    id: "1",
    name: "Chybějící výpis",
    condition: "Nenahrál výpis 2 měsíce",
    template: "Dobrý den, všimli jsme si, že jste delší dobu nenahrál bankovní výpis...",
    status: "active",
    lastTriggered: "2025-03-15",
  },
  {
    id: "2",
    name: "Překročení rozpočtu",
    condition: "Překročen rozpočet o 20%",
    template: "Dobrý den, zaznamenali jsme vyšší výdaje než obvykle...",
    status: "active",
    lastTriggered: "2025-03-10",
  },
];

const MOCK_SCHEDULED: ScheduledMessage[] = [
  {
    id: "1",
    clientName: "Petr Novák",
    subject: "Měsíční přehled - Březen 2025",
    content: "Vážený pane Nováku, zasíláme Vám měsíční přehled...",
    scheduledFor: "2025-04-01",
    status: "pending",
  },
  {
    id: "2",
    clientName: "Lucie Černá",
    subject: "Gratulace k dosažení cíle",
    content: "Vážená paní Černá, gratulujeme k dosažení Vašeho finančního cíle...",
    scheduledFor: "2025-03-20",
    status: "sent",
  },
];

const AdvisorCommunications = () => {
  const [activeTab, setActiveTab] = useState<"auto" | "scheduled">("auto");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-gray-900" />
            </div>
            <Typography variant="h2" className="text-gray-900">
              Komunikace s klienty
            </Typography>
          </div>
          <Typography variant="small" className="text-gray-500">
            Správa automatických a plánovaných zpráv
          </Typography>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setActiveTab("auto")}>
            <Settings size={16} className="mr-2" />
            Automatické zprávy
          </Button>
          <Button variant="secondary" onClick={() => setActiveTab("scheduled")}>
            <Calendar size={16} className="mr-2" />
            Plánované zprávy
          </Button>
        </div>
      </div>

      {activeTab === "auto" ? (
        <>
          {/* Automatic Messages */}
          <Paper className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-900" />
                <Typography variant="h3">Automatické zprávy</Typography>
              </div>
              <Button>
                <Plus size={16} className="mr-2" />
                Přidat podmínku
              </Button>
            </div>

            <div className="space-y-4">
              {MOCK_AUTO_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{message.name}</h4>
                      <p className="text-sm text-gray-500">
                        Podmínka: {message.condition}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-sm font-medium rounded-full ${
                          message.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.status === "active" ? "Aktivní" : "Neaktivní"}
                      </span>
                      <Button variant="secondary" size="sm">
                        Upravit
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    {message.template}
                  </div>
                  {message.lastTriggered && (
                    <p className="text-sm text-gray-500 mt-2">
                      Naposledy odesláno:{" "}
                      {new Date(message.lastTriggered).toLocaleDateString("cs-CZ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Paper>
        </>
      ) : (
        <>
          {/* Scheduled Messages */}
          <Paper className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-gray-900" />
                <Typography variant="h3">Plánované zprávy</Typography>
              </div>
              <Button>
                <Plus size={16} className="mr-2" />
                Naplánovat zprávu
              </Button>
            </div>

            <div className="space-y-4">
              {MOCK_SCHEDULED.map((message) => (
                <div
                  key={message.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{message.subject}</h4>
                      <p className="text-sm text-gray-500">
                        Pro: {message.clientName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-sm font-medium rounded-full ${
                          message.status === "sent"
                            ? "bg-green-100 text-green-800"
                            : message.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {message.status === "sent"
                          ? "Odesláno"
                          : message.status === "failed"
                          ? "Chyba"
                          : "Čeká na odeslání"}
                      </span>
                      <Button variant="secondary" size="sm">
                        Upravit
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm mb-2">
                    {message.content}
                  </div>
                  <p className="text-sm text-gray-500">
                    Naplánováno na:{" "}
                    {new Date(message.scheduledFor).toLocaleDateString("cs-CZ")}
                  </p>
                </div>
              ))}
            </div>
          </Paper>
        </>
      )}
    </div>
  );
};

export default AdvisorCommunications;