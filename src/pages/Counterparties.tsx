import { useState } from "react";
import { Button, Typography, Paper, TextField, Select } from "../components";
import { Users, Plus, Search, PencilLine, Trash2, Star, StarOff } from "lucide-react";
import { useTab } from "../hooks/useTab";

type Counterparty = {
  id: string;
  name: string;
  category: string;
  isRegular: boolean;
  excludeFromStats: boolean;
  lastTransaction: string;
  transactionCount: number;
  totalAmount: number;
  note?: string;
};

const MOCK_COUNTERPARTIES: Counterparty[] = [
  {
    id: "1",
    name: "Albert",
    category: "Potraviny",
    isRegular: true,
    excludeFromStats: false,
    lastTransaction: "2025-03-15",
    transactionCount: 45,
    totalAmount: -25000,
  },
  {
    id: "2",
    name: "Spořící účet",
    category: "Převody",
    isRegular: true,
    excludeFromStats: true,
    lastTransaction: "2025-03-10",
    transactionCount: 12,
    totalAmount: -150000,
    note: "Pravidelné spoření - nezapočítávat do výdajů",
  },
  {
    id: "3",
    name: "O2",
    category: "Telekomunikace",
    isRegular: true,
    excludeFromStats: false,
    lastTransaction: "2025-03-01",
    transactionCount: 24,
    totalAmount: -12000,
  },
];

const CATEGORIES = [
  "Potraviny",
  "Doprava",
  "Bydlení",
  "Telekomunikace",
  "Zábava",
  "Převody",
  "Ostatní",
];

const Counterparties = () => {
  const { client } = useTab();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [counterparties] = useState<Counterparty[]>(MOCK_COUNTERPARTIES);

  if (!client) return null;

  const filteredCounterparties = counterparties.filter((cp) => {
    const matchesSearch = cp.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || cp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Users className="w-5 h-5 text-gray-900" />
            </div>
            <Typography variant="h2" className="text-gray-900">
              Známé protistrany
            </Typography>
          </div>
          <Typography variant="small" className="text-gray-500">
            Správa protistran a jejich kategorizace
          </Typography>
        </div>

        <Button>
          <Plus size={16} className="mr-2" />
          Přidat protistranu
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <TextField
            placeholder="Hledat protistranu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-48"
        >
          <option value="all">Všechny kategorie</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </div>

      {/* Counterparties List */}
      <div className="space-y-4">
        {filteredCounterparties.map((cp) => (
          <Paper key={cp.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{cp.name}</h3>
                  <span className="px-2 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                    {cp.category}
                  </span>
                  {cp.isRegular && (
                    <span className="px-2 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                      Pravidelná
                    </span>
                  )}
                  {cp.excludeFromStats && (
                    <span className="px-2 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
                      Mimo statistiky
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    <strong>Poslední transakce:</strong>{" "}
                    {new Date(cp.lastTransaction).toLocaleDateString("cs-CZ")}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Počet transakcí:</strong> {cp.transactionCount}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Celková částka:</strong>{" "}
                    <span className={cp.totalAmount >= 0 ? "text-green-600" : "text-red-600"}>
                      {cp.totalAmount.toLocaleString("cs-CZ", {
                        style: "currency",
                        currency: "CZK",
                      })}
                    </span>
                  </p>
                  {cp.note && (
                    <p className="text-sm text-gray-500">
                      <strong>Poznámka:</strong> {cp.note}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    // Toggle regular status
                  }}
                >
                  {cp.isRegular ? (
                    <>
                      <StarOff size={16} className="mr-2" />
                      Nepravidelná
                    </>
                  ) : (
                    <>
                      <Star size={16} className="mr-2" />
                      Pravidelná
                    </>
                  )}
                </Button>
                <Button variant="secondary" size="sm">
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
    </div>
  );
};

export default Counterparties;