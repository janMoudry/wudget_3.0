import { useState } from "react";
import { Button, TextField, Typography, Paper, Select } from "../components";
import { useTab } from "../hooks/useTab";
import { Wallet, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../navigation/ROUTES";
import { useCreateAccount } from "../api/accounts";
import { toast } from "react-toastify";

const AVAILABLE_FLAGS = [
  { value: "main", label: "Hlavní účet" },
  { value: "business", label: "Firemní" },
  { value: "personal", label: "Osobní" },
  { value: "savings", label: "Spořící" },
  { value: "operational", label: "Provozní" },
  { value: "foreign", label: "Zahraniční" },
];

const AVAILABLE_BANKS = [
  { value: "airbank", label: "Air Bank" },
  { value: "kb", label: "Komerční banka" },
  { value: "csob", label: "ČSOB" },
  { value: "fio", label: "Fio banka" },
];

const AccountCreate = () => {
  const { client } = useTab();
  const navigate = useNavigate();
  const createAccount = useCreateAccount();

  const [formData, setFormData] = useState({
    name: "",
    bankName: "",
    flags: [] as string[],
  });

  if (!client) return null;

  const handleSave = async () => {
    try {
      await createAccount.mutateAsync({
        ...formData,
        clientId: client.id
      });
      toast.success("Účet byl úspěšně vytvořen");
      navigate(ROUTES.CLIENT.ACCOUNTS.replace(ROUTES.CLIENT_ROOT, `/${client.id}/`));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nepodařilo se vytvořit účet");
    }
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
            Přidat účet
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Přidání nového bankovního účtu
        </Typography>
      </div>

      {/* Create Form */}
      <Paper className="p-6">
        <div className="space-y-6 max-w-2xl">
          <TextField
            label="Název účtu"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Select
            label="Banka"
            value={formData.bankName}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            required
          >
            <option value="">Vyberte banku</option>
            {AVAILABLE_BANKS.map((bank) => (
              <option key={bank.value} value={bank.value}>
                {bank.label}
              </option>
            ))}
          </Select>

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
            <Button 
              variant="secondary" 
              onClick={handleCancel}
              disabled={createAccount.isPending}
            >
              <X size={16} className="mr-2" />
              Zrušit
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={!formData.name || !formData.bankName || createAccount.isPending}
            >
              <Save size={16} className="mr-2" />
              {createAccount.isPending ? "Ukládám..." : "Vytvořit účet"}
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default AccountCreate;