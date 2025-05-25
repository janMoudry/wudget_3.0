import { useEffect, useState } from "react";
import { Button, Typography, Paper } from "../components";
import { FileText, Trash2, RefreshCw, AlertTriangle } from "lucide-react";
import { useTab } from "../hooks/useTab";

type Statement = {
  id: string;
  bank: "airbank" | "kb" | "csob" | "fio";
  period: string;
  uploadedAt: string;
  transactionCount: number;
};

const MISSING_PERIODS = ["2024-10", "2024-09", "2024-08"];

const Statements = () => {
  const { tab } = useTab();
  const [statements, setStatements] = useState<Statement[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const accountId = tab.accountId;
        const res = await fetch(
          `http://localhost:3001/api/statements?accountId=${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await res.json();
        setStatements(json?.data || []);
      } catch (err) {
        console.error("Chyba při načítání výpisů:", err);
      }
    };

    fetchStatements();
  }, [tab.accountId, token]);

  const handleDelete = (id: string) => {
    console.log("Delete statement", id);
  };

  const handleReplace = (id: string) => {
    console.log("Replace statement", id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <FileText className="w-5 h-5 text-gray-900" />
          </div>
          <Typography variant="h2" className="text-gray-900">
            Výpisy
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Přehled nahraných bankovních výpisů
        </Typography>
      </div>

      {/* Missing Statements Warning */}
      {MISSING_PERIODS.length > 0 && (
        <Paper className="p-6 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <Typography variant="h3" className="text-amber-900 mb-2">
                Chybějící výpisy
              </Typography>
              <div className="text-amber-800">
                <p className="mb-2">
                  Pro následující období nemáme nahrané výpisy:
                </p>
                <div className="flex flex-wrap gap-2">
                  {MISSING_PERIODS.map((period) => (
                    <span
                      key={period}
                      className="px-2 py-1 bg-amber-100 rounded-md text-amber-900 text-sm"
                    >
                      {new Date(period).toLocaleDateString("cs-CZ", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Paper>
      )}

      {/* Statements List */}
      <div className="space-y-4">
        {statements.map((statement) => (
          <Paper key={statement.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <FileText className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <Typography variant="h3" className="mb-1">
                    {new Date(statement.period).toLocaleDateString("cs-CZ", {
                      year: "numeric",
                      month: "long",
                    })}
                  </Typography>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="capitalize">{statement.bank}</span>
                    <span>•</span>
                    <span>{statement.transactionCount} transakcí</span>
                    <span>•</span>
                    <span>
                      Nahráno{" "}
                      {new Date(statement.uploadedAt).toLocaleDateString(
                        "cs-CZ"
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleReplace(statement.id)}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Nahradit
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDelete(statement.id)}
                >
                  <Trash2 size={16} className="mr-2" />
                  Smazat
                </Button>
              </div>
            </div>
          </Paper>
        ))}

        {statements.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Zatím zde nejsou žádné výpisy
          </div>
        )}
      </div>
    </div>
  );
};

export default Statements;
