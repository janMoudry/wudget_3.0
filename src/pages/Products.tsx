import { useState } from "react";
import { Button, Typography, Paper, TextField } from "../components";
import { Package, Plus, Search, Eye, EyeOff, PencilLine, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../navigation/ROUTES";

type Product = {
  id: string;
  name: string;
  description: string;
  type: string;
  visibility: "public" | "private";
  requirements: string[];
  monthlyFee?: number;
  annualReturn?: number;
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Spořící účet Premium",
    description: "Spořící účet s nadstandardním úročením a bez poplatků",
    type: "savings",
    visibility: "public",
    requirements: ["Minimální vklad 50 000 Kč", "Věk nad 18 let"],
    annualReturn: 4.5,
  },
  {
    id: "2",
    name: "Investiční portfolio Pro",
    description: "Aktivně spravované portfolio s důrazem na dlouhodobý růst",
    type: "investment",
    visibility: "public",
    requirements: ["Minimální investice 100 000 Kč", "Investiční dotazník"],
    monthlyFee: 150,
  },
  {
    id: "3",
    name: "VIP Hypotéka",
    description: "Exkluzivní hypoteční úvěr pro náročné klienty",
    type: "mortgage",
    visibility: "private",
    requirements: ["Příjem nad 100 000 Kč měsíčně", "Čistý registry"],
  },
];

const Products = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || product.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Package className="w-5 h-5 text-gray-900" />
            </div>
            <Typography variant="h2" className="text-gray-900">
              Produkty a služby
            </Typography>
          </div>
          <Typography variant="small" className="text-gray-500">
            Správa nabízených produktů a služeb
          </Typography>
        </div>

        <Button onClick={() => navigate(ROUTES.PRODUCT_CREATE)}>
          <Plus size={16} className="mr-2" />
          Přidat produkt
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <TextField
            placeholder="Hledat produkt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">Všechny typy</option>
          <option value="savings">Spoření</option>
          <option value="investment">Investice</option>
          <option value="mortgage">Hypotéky</option>
        </select>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <Paper key={product.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-full ${
                      product.visibility === "public"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product.visibility === "public" ? "Veřejné" : "Privátní"}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">
                    <strong>Požadavky:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {product.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {product.monthlyFee && (
                    <p className="text-sm text-gray-500">
                      <strong>Měsíční poplatek:</strong>{" "}
                      {product.monthlyFee.toLocaleString("cs-CZ", {
                        style: "currency",
                        currency: "CZK",
                      })}
                    </p>
                  )}
                  
                  {product.annualReturn && (
                    <p className="text-sm text-gray-500">
                      <strong>Roční výnos:</strong> {product.annualReturn}%
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    // Toggle visibility
                  }}
                >
                  {product.visibility === "public" ? (
                    <>
                      <EyeOff size={16} className="mr-2" />
                      Skrýt
                    </>
                  ) : (
                    <>
                      <Eye size={16} className="mr-2" />
                      Zveřejnit
                    </>
                  )}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/products/${product.id}/edit`)}
                >
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

export default Products;