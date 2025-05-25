import { useState } from "react";
import { Button, TextField, Typography, Paper, Select } from "../components";
import { useTab } from "../hooks/useTab";
import { Wallet, Save, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../navigation/ROUTES";

const AVAILABLE_FLAGS = [
  { value: "main", label: "Hlavní účet" },
  { value: "business", label: "Firemní" },
  { value: "personal", label: "Osobní" },
  { value: "savings", label: "Spořící" },
  { value: "operational", label: "Provozní" },
  { value: "foreign", label: "Zahraniční" },
];

const AccountEdit = () => {
  const { client } = useTab();
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();

  const account = client?.accounts.find((acc) => acc.id === accountId);

  const [formData, setFormData] = useState({
    name: account?.name || "",
    bankName: account?.bankName || "",
    flags: account?.flags || [],
  });

  if (!client || !account) return null;

  const handleSave = () => {
    // Here would be the API call to update the account
    navigate(ROUTES.CLIENT.ACCOUNTS.replace(ROUTES.CLIENT_ROOT, `/${client.id}/`));
  };

  const handleCancel = () => {
    navigate(ROUTES.CLIENT.ACCOUNTS.replace(ROUTES.CLIENT_ROOT, `/${client.id}/`));
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
            Upravit účet
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Úprava nastavení bankovního účtu
        </Typography>
      </div>

      {/* Edit Form */}
      <Paper className="p-6">
        <div className="space-y-6 max-w-2xl">
          <TextField
            label="Název účtu"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <TextField
            label="Název banky"
            value={formData.bankName}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
          />

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Příznaky účtu
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_FLAGS.map((flag) => (
                <button
                  key={flag.value}
                  onClick={() => {
                    const newFlags = formData.flags.includes(flag.value)
                      ? formData.flags.filter((f) => f !== flag.value)
                      : [...formData.flags, flag.value];
                    setFormData({ ...formData, flags: newFlags });
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    formData.flags.includes(flag.value)
                      ? "bg-primary-100 text-primary-800 hover:bg-primary-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {flag.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={handleCancel}>
              <X size={16} className="mr-2" />
              Zrušit
            </Button>
            <Button variant="primary" onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Uložit změny
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default AccountEdit;