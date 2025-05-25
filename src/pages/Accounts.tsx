import { useState } from "react";
import { Button, Typography, Paper } from "../components";
import { useTab } from "../hooks/useTab";
import { Wallet, PencilLine, Trash2, Plus } from "lucide-react";

const Accounts = () => {
  const { client } = useTab();
  const [editingAccount, setEditingAccount] = useState<string | null>(null);

  if (!client) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Wallet className="w-5 h-5 text-gray-900" />
          </div>
          <Typography variant="h2" className="text-gray-900">
            Správa účtů
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Správa bankovních účtů klienta
        </Typography>
      </div>

      {/* Account List */}
      <div className="space-y-4">
        {client.accounts.map((account) => (
          <Paper key={account.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Wallet className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <Typography variant="h3" className="mb-1">
                    {account.name}
                  </Typography>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{account.bankName}</span>
                    <span>•</span>
                    <span>
                      {account.balance.toLocaleString("cs-CZ", {
                        style: "currency",
                        currency: account.currency,
                      })}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {account.flags.map((flag) => (
                      <span
                        key={flag}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditingAccount(account.id)}
                >
                  <PencilLine size={16} className="mr-2" />
                  Upravit
                </Button>
                <Button variant="secondary" size="sm">
                  <Trash2 size={16} className="mr-2" />
                  Smazat
                </Button>
              </div>
            </div>
          </Paper>
        ))}
      </div>

      {/* Add Account Button */}
      <div>
        <Button variant="secondary">
          <Plus size={16} className="mr-2" />
          Přidat účet
        </Button>
      </div>
    </div>
  );
};

export default Accounts;