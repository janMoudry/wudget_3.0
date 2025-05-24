// src/pages/Clients.tsx
import { useClients } from "../api/getClients";
import { ClientCard } from "../components/molecules";
import { Button, TextField, Typography } from "../components";
import { Search, Users } from "lucide-react";
import { useState } from "react";

const Clients = () => {
  const { data: clients, isLoading, isError } = useClients();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center">
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
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <TextField
            placeholder="Hledat klienta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">Všechny stavy</option>
          <option value="ok">V pořádku</option>
          <option value="missing-data">Chybí data</option>
          <option value="inactive">Neaktivní</option>
        </select>
      </div>

      {/* Client List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
        
        {filteredClients.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nebyli nalezeni žádní klienti odpovídající filtru
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
