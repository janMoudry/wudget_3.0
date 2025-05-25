// src/pages/Transactions.tsx
import { useEffect, useState } from "react";
import { Button, Typography, Paper, TextField } from "../components";
import { Download, Search, TrendingUp } from "lucide-react";
import clsx from "classnames";
import { useTab } from "@hooks";

type Transaction = {
  date: string;
  amount: number;
  currency: string;
  type: "income" | "expense";
  method: string;
  category: string;
  counterparty: string;
  note: string;
  raw: JSON;
};

const Transactions = () => {
  const { tab } = useTab();
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const clientId = "client-001"; // nebo z contextu
        const period = tab.period || "all";
        const accountIds = tab.accountId === "all" ? "all" : tab.accountId;

        if (!clientId || !period || !accountIds) {
          console.error("Není zadán clientId, period nebo accountIds");
          return;
        }

        const params = new URLSearchParams({
          clientId,
          range: period,
          accountIds,
        });

        const res = await fetch(
          `http://localhost:3001/api/transactions?${params}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await res.json();
        setTransactions(json?.data || []);
      } catch (err) {
        console.error("Chyba při načítání transakcí:", err);
      }
    };

    fetchTransactions();
  }, [tab.accountId, tab.period, token]);

  const filtered = transactions.filter((t) => {
    const matchesSearch = `${t.counterparty} ${t.category} ${t.note}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || t.category === categoryFilter;
    const matchesType = typeFilter === "all" || t.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const uniqueCategories = Array.from(
    new Set(transactions.map((t) => t.category))
  ).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-gray-900" />
            </div>
            <Typography variant="h2" className="text-gray-900">
              Transakce
            </Typography>
          </div>
          <Typography variant="small" className="text-gray-500">
            Přehled všech finančních pohybů
          </Typography>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary">
            <Download size={16} className="mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Paper className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <TextField
              placeholder="Hledat transakci..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Všechny kategorie</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Všechny typy</option>
            <option value="income">Příjmy</option>
            <option value="expense">Výdaje</option>
          </select>
        </div>
      </Paper>

      {/* Transactions Table */}
      <Paper className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Protistrana
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategorie
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Částka
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Typ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((t, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(t.date).toLocaleDateString("cs-CZ")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {t.counterparty}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                      {t.category || "Nezařazeno"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-medium whitespace-nowrap">
                    <span
                      className={
                        t.type === "income" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {t.amount.toLocaleString("cs-CZ", {
                        style: "currency",
                        currency: t.currency || "CZK",
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={clsx(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        t.type === "income"
                          ? "bg-green-50 text-green-800"
                          : "bg-red-50 text-red-800"
                      )}
                    >
                      {t.type === "income" ? "Příjem" : "Výdaj"}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-sm text-center text-gray-500"
                  >
                    Nebyly nalezeny žádné transakce
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Paper>
    </div>
  );
};

export default Transactions;
