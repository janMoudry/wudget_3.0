import { useState } from "react";
import { Button, TextField, Typography, Paper } from "../components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../navigation/ROUTES";
import { UserPlus, Save, X } from "lucide-react";
import { useCreateClient } from "../api/createClient";
import { toast } from "react-toastify";

const ClientCreate = () => {
  const navigate = useNavigate();
  const createClient = useCreateClient();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  const handleSave = async () => {
    try {
      await createClient.mutateAsync(formData);
      toast.success("Klient byl úspěšně vytvořen");
      navigate(ROUTES.CLIENTS);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nepodařilo se vytvořit klienta");
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.CLIENTS);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <UserPlus className="w-5 h-5 text-gray-900" />
          </div>
          <Typography variant="h2" className="text-gray-900">
            Přidat klienta
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Vytvoření nového klienta
        </Typography>
      </div>

      {/* Create Form */}
      <Paper className="p-6">
        <div className="space-y-6 max-w-2xl">
          <TextField
            label="Jméno klienta"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <TextField
            label="Telefon"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <TextField
            label="Společnost"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />

          <TextField
            label="Poznámky"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            multiline
            rows={4}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="secondary" 
              onClick={handleCancel}
              disabled={createClient.isPending}
            >
              <X size={16} className="mr-2" />
              Zrušit
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={!formData.name || createClient.isPending}
            >
              <Save size={16} className="mr-2" />
              {createClient.isPending ? "Ukládám..." : "Vytvořit klienta"}
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ClientCreate;