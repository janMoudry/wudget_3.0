// src/pages/Clients.tsx
import { useClients } from "../api/getClients";
import { ClientCard } from "../components/molecules";
import { Typography } from "../components";
import { Users } from "lucide-react";

const Clients = () => {
  const { data: clients, isLoading, isError } = useClients();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] text-gray-500">
        Načítám seznam klientů…
      </div>
    );
  }

  if (isError || !clients) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] text-error-500">
        Chyba při načítání klientů.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Users className="w-5 h-5 text-gray-900" />
        </div>
        <div>
          <Typography variant="h2" className="text-gray-900">
            Klienti
          </Typography>
          <Typography variant="small" className="text-gray-500">
            Seznam všech klientů a jejich stav
          </Typography>
        </div>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
};

export default Clients;
