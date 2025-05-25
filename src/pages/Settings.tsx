import { Button, Typography, Paper } from "../components";
import { Settings as SettingsIcon, Bell, Shield, Database, Mail } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <SettingsIcon className="w-5 h-5 text-gray-900" />
          </div>
          <Typography variant="h2" className="text-gray-900">
            Nastavení
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Správa globálního nastavení aplikace
        </Typography>
      </div>

      <Paper className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <Typography variant="h3" className="mb-1">
              Notifikace
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Nastavení upozornění a notifikací
            </Typography>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Emailová upozornění</p>
              <p className="text-sm text-gray-500">Dostávat důležitá upozornění emailem</p>
            </div>
            <Button variant="secondary">Nastavit</Button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Push notifikace</p>
              <p className="text-sm text-gray-500">Zobrazovat upozornění v prohlížeči</p>
            </div>
            <Button variant="secondary">Nastavit</Button>
          </div>
        </div>
      </Paper>

      <Paper className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-green-50 rounded-lg">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <Typography variant="h3" className="mb-1">
              Zabezpečení
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Nastavení zabezpečení účtu
            </Typography>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Dvoufaktorové ověření</p>
              <p className="text-sm text-gray-500">Zvýšená ochrana vašeho účtu</p>
            </div>
            <Button variant="secondary">Aktivovat</Button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Historie přihlášení</p>
              <p className="text-sm text-gray-500">Zobrazit historii přihlášení k účtu</p>
            </div>
            <Button variant="secondary">Zobrazit</Button>
          </div>
        </div>
      </Paper>

      <Paper className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-50 rounded-lg">
            <Database className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <Typography variant="h3" className="mb-1">
              Data
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Správa dat a exporty
            </Typography>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Export dat</p>
              <p className="text-sm text-gray-500">Stáhnout všechna data ve formátu CSV</p>
            </div>
            <Button variant="secondary">Exportovat</Button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Zálohování</p>
              <p className="text-sm text-gray-500">Nastavení automatického zálohování</p>
            </div>
            <Button variant="secondary">Nastavit</Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Settings;