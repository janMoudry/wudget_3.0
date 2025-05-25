import { useState } from "react";
import { Button, Typography, Paper } from "../components";
import { Target, Plus, ChevronRight, CheckCircle2, Clock } from "lucide-react";

type Goal = {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  targetAmount?: number;
  currentAmount?: number;
  deadline?: string;
  status: "in-progress" | "completed" | "delayed";
  progress: number;
  milestones: {
    id: string;
    title: string;
    completed: boolean;
  }[];
};

const MOCK_GOALS: Goal[] = [
  {
    id: "1",
    clientId: "client-001",
    clientName: "Petr Novák",
    title: "Naspořit na důchod",
    description: "Vytvořit dostatečnou finanční rezervu pro důchodový věk",
    targetAmount: 5000000,
    currentAmount: 2500000,
    deadline: "2035-12-31",
    status: "in-progress",
    progress: 50,
    milestones: [
      { id: "1-1", title: "Založení spořícího účtu", completed: true },
      { id: "1-2", title: "Pravidelné měsíční úložky", completed: true },
      { id: "1-3", title: "Diverzifikace portfolia", completed: false },
    ],
  },
  {
    id: "2",
    clientId: "client-002",
    clientName: "Lucie Černá",
    title: "Koupě nemovitosti",
    description: "Našetřit na akontaci pro hypotéku na byt",
    targetAmount: 1000000,
    currentAmount: 850000,
    deadline: "2025-06-30",
    status: "in-progress",
    progress: 85,
    milestones: [
      { id: "2-1", title: "Vytvoření spořícího plánu", completed: true },
      { id: "2-2", title: "Konzultace s hypotečním specialistou", completed: true },
      { id: "2-3", title: "Výběr lokality", completed: false },
    ],
  },
];

const Plans = () => {
  const [goals] = useState<Goal[]>(MOCK_GOALS);

  const getStatusConfig = (status: Goal["status"]) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle2,
          label: "Splněno",
          className: "bg-green-100 text-green-800",
        };
      case "delayed":
        return {
          icon: Clock,
          label: "Zpožděno",
          className: "bg-amber-100 text-amber-800",
        };
      default:
        return {
          icon: ChevronRight,
          label: "V průběhu",
          className: "bg-blue-100 text-blue-800",
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Target className="w-5 h-5 text-gray-900" />
            </div>
            <Typography variant="h2" className="text-gray-900">
              Plány a vize klientů
            </Typography>
          </div>
          <Typography variant="small" className="text-gray-500">
            Přehled finančních cílů a jejich plnění
          </Typography>
        </div>

        <Button>
          <Plus size={16} className="mr-2" />
          Přidat cíl
        </Button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const status = getStatusConfig(goal.status);
          const StatusIcon = status.icon;

          return (
            <Paper key={goal.id} className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{goal.title}</h3>
                      <span
                        className={`flex items-center gap-1.5 px-2 py-1 text-sm font-medium rounded-full ${status.className}`}
                      >
                        <StatusIcon size={14} />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Klient: {goal.clientName}</p>
                  </div>

                  <Button variant="secondary" size="sm">
                    Detail
                  </Button>
                </div>

                {/* Description */}
                <p className="text-gray-600">{goal.description}</p>

                {/* Progress */}
                {goal.targetAmount && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Průběh</span>
                      <span className="font-medium">
                        {goal.currentAmount?.toLocaleString("cs-CZ", {
                          style: "currency",
                          currency: "CZK",
                        })}{" "}
                        z{" "}
                        {goal.targetAmount.toLocaleString("cs-CZ", {
                          style: "currency",
                          currency: "CZK",
                        })}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Milestones */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Milníky</h4>
                  <div className="space-y-2">
                    {goal.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            milestone.completed
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {milestone.completed && <CheckCircle2 size={12} />}
                        </div>
                        <span
                          className={
                            milestone.completed ? "text-gray-900" : "text-gray-500"
                          }
                        >
                          {milestone.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deadline */}
                {goal.deadline && (
                  <p className="text-sm text-gray-500">
                    Termín splnění:{" "}
                    {new Date(goal.deadline).toLocaleDateString("cs-CZ")}
                  </p>
                )}
              </div>
            </Paper>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;