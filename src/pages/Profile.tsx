// src/pages/Profile.tsx
import { useState } from "react";
import { Button, TextField, Typography, Paper } from "../components";
import { useAuth } from "../hooks";
import { User, Mail, Building, Phone } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company: "Wudget s.r.o.",
    phone: "+420 777 888 999"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the API call to update the profile
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <Typography variant="h2" className="mb-2">Profil</Typography>
        <Typography variant="small" className="text-gray-500">
          Správa vašeho účtu a osobních údajů
        </Typography>
      </div>

      <Paper className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <Typography variant="h3">{user?.name}</Typography>
              <Typography variant="small" className="text-gray-500">
                {user?.email}
              </Typography>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <TextField
                  label="Jméno"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
                <User className="absolute left-3 top-[34px] h-5 w-5 text-gray-400" />
              </div>

              <div className="relative">
                <TextField
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-[34px] h-5 w-5 text-gray-400" />
              </div>

              <div className="relative">
                <TextField
                  label="Společnost"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
                <Building className="absolute left-3 top-[34px] h-5 w-5 text-gray-400" />
              </div>

              <div className="relative">
                <TextField
                  label="Telefon"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
                <Phone className="absolute left-3 top-[34px] h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Zrušit
                </Button>
                <Button type="submit" variant="primary">
                  Uložit změny
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={() => setIsEditing(true)}
              >
                Upravit profil
              </Button>
            )}
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Profile;
