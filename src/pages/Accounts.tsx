import { useState } from "react";
import { Button, Typography, Paper } from "../components";
import { useTab } from "../hooks/useTab";
import { Wallet, PencilLine, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../navigation/ROUTES";
import DeleteAccountModal from "../components/modals/DeleteAccountModal";
import type { Account } from "../api/getClient";

const Accounts = () => {
  const { client } = useTab();
  const navigate = useNavigate();
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);

  if (!client) return null;

  const handleEdit = (accountId: string) => {
    navigate(
      ROUTES.CLIENT.ACCOUNT_EDIT.replace(ROUTES.CLIENT_ROOT, `/${client.id}/`).replace(
        ":accountId",
        accountId
      )
    );
  };

  const handleDelete = (account: Account) => {
    setAccountToDelete(account);
  };

  const handleConfirmDelete = () => {
    // Here would be the API call to delete the account
    setAccountToDelete(null);
  };

  const handleAddAccount = () => {
    navigate(ROUTES.CLIENT.ACCOUNT_CREATE.replace(ROUTES.CLIENT_ROOT, `/${client.id}/`));
  };

  const getFlagColor = (flag: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      main: { bg: "bg-blue-100", text: "text-blue-800" },
      business: { bg: "bg-purple-100", text: "text-purple-800" },
      personal: { bg: "bg-green-100", text: "text-green-800" },
      savings: { bg: "bg-amber-100", text: "text-amber-800" },
      operational: { bg: "bg-indigo-100", text: "text-indigo-800" },
      foreign: { bg: "bg-rose-100", text: "text-rose-800" },
    };
    return colors[flag] || { bg: "bg-gray-100", text: "text-gray-800" };
  };

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
                  <div className="flex flex-wrap gap-2 mt-2">
                    {account.flags.map((flag) => {
                      const { bg, text } = getFlagColor(flag);
                      return (
                        <span
                          key={flag}
                          className={`px-2.5 py-1 text-sm font-medium rounded-full ${bg} ${text}`}
                        >
                          {flag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(account.id)}
                >
                  <PencilLine size={16} className="mr-2" />
                  Upravit
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDelete(account)}
                >
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
        <Button variant="secondary" onClick={handleAddAccount}>
          <Plus size={16} className="mr-2" />
          Přidat účet
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {accountToDelete && (
        <DeleteAccountModal
          isOpen={true}
          onClose={() => setAccountToDelete(null)}
          account={accountToDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Accounts;