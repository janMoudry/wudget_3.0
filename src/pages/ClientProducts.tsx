import { useState } from "react";
import { Button, Typography, Paper } from "../components";
import { Package, Plus, Check, Clock } from "lucide-react";
import { useTab } from "../hooks/useTab";

type Product = {
  id: string;
  name: string;
  description: string;
  type: string;
  status: "active" | "pending" | "available";
  startDate?: string;
  monthlyFee?: number;
  balance?: number;
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Spořící účet Premium",
    description: "Spořící účet s nadstandardním úročením a bez poplatků",
    type: "savings",
    status: "active",
    startDate: "2024-01-15",
    balance: 250000,
  },
  {
    id: "2",
    name: "Investiční portfolio Pro",
    description: "Aktivně spravované portfolio s důrazem na dlouhodobý růst",
    type: "investment",
    status: "pending",
    monthlyFee: 150,
  },
  {
    id: "3",
    name: "VIP Hypotéka",
    description: "Exkluzivní hypoteční úvěr pro náročné klienty",
    type: "mortgage",
    status: "available",
  },
];

const ClientProducts = () => {
  const { client } = useTab();
  const [products] = useState<Product[]>(MOCK_PRODUCTS);

  if (!client) return null;

  const getStatusConfig = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return {
          icon: Check,
          label: "Aktivní",
          className: "bg-green-100 text-green-800",
        };
      case "pending":
        return {
          icon: Clock,
          label: "Čeká na schválení",
          className: "bg-amber-100 text-amber-800",
        };
      default:
        return {
          icon: Plus,
          label: "Dostupné",
          className: "bg-gray-100 text-gray-800",
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Package className="w-5 h-5 text-gray-900" />
          </div>
          <Typography variant="h2" className="text-gray-900">
            Produkty klienta
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Přehled produktů a služeb klienta {client.name}
        </Typography>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {products.map((product) => {
          const status = getStatusConfig(product.status);
          const StatusIcon = status.icon;

          return (
            <Paper key={product.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <span
                      className={`flex items-center gap-1.5 px-2 py-1 text-sm font-medium rounded-full ${status.className}`}
                    >
                      <StatusIcon size={14} />
                      {status.label}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>

                  {product.status === "active" && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        <strong>Aktivní od:</strong>{" "}
                        {new Date(product.startDate!).toLocaleDateString("cs-CZ")}
                      </p>
                      {product.balance && (
                        <p className="text-sm text-gray-500">
                          <strong>Aktuální zůstatek:</strong>{" "}
                          {product.balance.toLocaleString("cs-CZ", {
                            style: "currency",
                            currency: "CZK",
                          })}
                        </p>
                      )}
                      {product.monthlyFee && (
                        <p className="text-sm text-gray-500">
                          <strong>Měsíční poplatek:</strong>{" "}
                          {product.monthlyFee.toLocaleString("cs-CZ", {
                            style: "currency",
                            currency: "CZK",
                          })}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  {product.status === "available" && (
                    <Button variant="primary" size="sm">
                      <Plus size={16} className="mr-2" />
                      Aktivovat
                    </Button>
                  )}
                  {product.status === "active" && (
                    <Button variant="secondary" size="sm">
                      Detail
                    </Button>
                  )}
                </div>
              </div>
            </Paper>
          );
        })}
      </div>
    </div>
  );
};

export default ClientProducts;