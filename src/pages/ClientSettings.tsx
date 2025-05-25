import { useState } from "react";
import { Button, Typography, Paper } from "../components";
import { Settings as SettingsIcon, Eye, EyeOff, Bell, Shield } from "lucide-react";
import { useTab } from "../hooks/useTab";

const ClientSettings = () => {
  const { client } = useTab();
  const [hideStatements, setHideStatements] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <SettingsIcon className="w-5 h-5 text-gray-900" />
          </div>
          <Typography variant="h2" className="text-gray-900">
            Nastavení klienta
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Správa nastavení pro klienta {client?.name}
        </Typography>
      </div>

      <Paper className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Eye className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <Typography variant="h3" className="mb-1">
              Viditelnost
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Nastavení viditelnosti dat pro poradce
            </Typography>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Skrýt výpisy před poradcem</p>
              <p className="text-sm text-gray-500">
                Poradce nebude mít přístup k bankovním výpisům
              </p>
            </div>
            <Button
              variant={hideStatements ? "primary" : "secondary"}
              onClick={() => setHideStatements(!hideStatements)}
            >
              {hideStatements ? (
                <>
                  <EyeOff size={16} className="mr-2" />
                  Skryto
                </>
              ) : (
                <>
                  <Eye size={16} className="mr-2" />
                  Viditelné
                </>
              )}
            </Button>
          </div>
        </div>
      </Paper>

      <Paper className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-amber-50 rounded-lg">
            <Bell className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <Typography variant="h3" className="mb-1">
              Notifikace
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Nastavení upozornění pro tohoto klienta
            </Typography>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Upozornění na chybějící výpisy</p>
              <p className="text-sm text-gray-500">
                Dostávat upozornění když klient nenahraje výpis
              </p>
            </div>
            <Button variant="secondary">Nastavit</Button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Pravidelné reporty</p>
              <p className="text-sm text-gray-500">
                Zasílat pravidelné přehledy o aktivitě klienta
              </p>
            </div>
            <Button variant="secondary">Nastavit</Button>
          </div>
        </div>
      </Paper>

      <Paper className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-50 rounded-lg">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <Typography variant="h3" className="mb-1">
              Oprávnění
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Správa přístupových práv
            </Typography>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Správa poradců</p>
              <p className="text-sm text-gray-500">
                Nastavení přístupu pro jednotlivé poradce
              </p>
            </div>
            <Button variant="secondary">Spravovat</Button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Historie přístupů</p>
              <p className="text-sm text-gray-500">
                Zobrazit historii přístupů k datům klienta
              </p>
            </div>
            <Button variant="secondary">Zobrazit</Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ClientSettings;