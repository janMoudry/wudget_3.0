import { useState } from "react";
import { Button, Typography, Paper, TextField } from "../components";
import { Repeat, Plus, Search, PencilLine, Trash2, ExternalLink } from "lucide-react";
import { useTab } from "../hooks/useTab";

type Subscription = {
  id: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  billingPeriod: "monthly" | "yearly";
  nextBilling: string;
  category: string;
  status: "active" | "cancelled" | "pending-cancellation";
  cancellationUrl?: string;
};

const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "1",
    name: "Netflix",
    description: "Standardní plán",
    amount: 199,
    currency: "CZK",
    billingPeriod: "monthly",
    nextBilling: "2025-04-15",
    category: "Zábava",
    status: "active",
    cancellationUrl: "https://netflix.com/cancel",
  },
  {
    id: "2",
    name: "Spotify Premium",
    amount: 179,
    currency: "CZK",
    billingPeriod: "monthly",
    nextBilling: "2025-04-01",
    category: "Hudba",
    status: "active",
    cancellationUrl: "https://spotify.com/account",
  },
  {
    id: "3",
    name: "iCloud+",
    description: "50GB úložiště",
    amount: 25,
    currency: "CZK",
    billingPeriod: "monthly",
    nextBilling: "2025-04-10",
    category: "Úložiště",
    status: "pending-cancellation",
    cancellationUrl: "https://apple.com/icloud",
  },
];

const Subscriptions = () => {
  const { client } = useTab();
  const [search, setSearch] = useState("");
  const [subscriptions] = useState<Subscription[]>(MOCK_SUBSCRIPTIONS);

  if (!client) return null;

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusConfig = (status: Subscription["status"]) => {
    switch (status) {
      case "active":
        return { className: "bg-green-100 text-green-800", label: "Aktivní" };
      case "cancelled":
        return { className: "bg-red-100 text-red-800", label: "Zrušeno" };
      case "pending-cancellation":
        return { className: "bg-amber-100 text-amber-800", label: "Čeká na zrušení" };
      default:
        return { className: "bg-gray-100 text-gray-800", label: "Neznámý" };
    }
  };

  const getTotalMonthly = () => {
    return subscriptions
      .filter((sub) => sub.status === "active")
      .reduce((total, sub) => {
        const monthlyAmount = sub.billingPeriod === "yearly" 
          ? sub.amount / 12 
          : sub.amount;
        return total + monthlyAmount;
      }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Repeat className="w-5 h-5 text-gray-900" />
            </div>
            <Typography variant="h2" className="text-gray-900">
              Předplatné
            </Typography>
          </div>
          <Typography variant="small" className="text-gray-500">
            Správa pravidelných předplatných služeb
          </Typography>
        </div>

        <Button>
          <Plus size={16} className="mr-2" />
          Přidat předplatné
        </Button>
      </div>

      {/* Summary */}
      <Paper className="p-6 bg-blue-50 border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h3" className="text-blue-900 mb-2">
              Měsíční výdaje na předplatné
            </Typography>
            <Typography variant="body" className="text-blue-800">
              {getTotalMonthly().toLocaleString("cs-CZ", {
                style: "currency",
                currency: "CZK",
              })}
            </Typography>
          </div>
          <div className="text-sm text-blue-700">
            <p>Aktivní předplatné: {subscriptions.filter(s => s.status === "active").length}</p>
            <p>Čeká na zrušení: {subscriptions.filter(s => s.status === "pending-cancellation").length}</p>
          </div>
        </div>
      </Paper>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <TextField
          placeholder="Hledat předplatné..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {filteredSubscriptions.map((subscription) => {
          const status = getStatusConfig(subscription.status);

          return (
            <Paper key={subscription.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{subscription.name}</h3>
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded-full ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {subscription.description && (
                    <p className="text-gray-600 mb-4">{subscription.description}</p>
                  )}

                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      <strong>Částka:</strong>{" "}
                      {subscription.amount.toLocaleString("cs-CZ", {
                        style: "currency",
                        currency: subscription.currency,
                      })}{" "}
                      / {subscription.billingPeriod === "monthly" ? "měsíc" : "rok"}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Další platba:</strong>{" "}
                      {new Date(subscription.nextBilling).toLocaleDateString("cs-CZ")}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Kategorie:</strong> {subscription.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {subscription.status === "active" && subscription.cancellationUrl && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(subscription.cancellationUrl, "_blank")}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Zrušit předplatné
                    </Button>
                  )}
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
          );
        })}

        {filteredSubscriptions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nebyla nalezena žádná předplatná
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;