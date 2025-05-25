import { useState, useMemo } from "react";
import { Button, TextField, Typography, Paper } from "../components";
import { Calculator as CalculatorIcon, Target } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Calculator = () => {
  const [formData, setFormData] = useState({
    monthlyInvestment: 5000,
    annualReturn: 7,
    years: 30,
    targetAmount: 5000000,
  });

  const data = useMemo(() => {
    const monthlyReturn = formData.annualReturn / 12 / 100;
    const months = formData.years * 12;
    const monthlyData = [];

    let totalInvested = 0;
    let currentValue = 0;

    for (let i = 0; i <= months; i++) {
      if (i > 0) {
        currentValue = (currentValue + formData.monthlyInvestment) * (1 + monthlyReturn);
        totalInvested += formData.monthlyInvestment;
      }

      if (i % 12 === 0) {
        monthlyData.push({
          year: i / 12,
          invested: Math.round(totalInvested),
          value: Math.round(currentValue),
          interest: Math.round(currentValue - totalInvested),
        });
      }
    }

    return monthlyData;
  }, [formData]);

  const targetYear = useMemo(() => {
    const targetAmount = formData.targetAmount;
    const entry = data.find(d => d.value >= targetAmount);
    return entry?.year;
  }, [data, formData.targetAmount]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <CalculatorIcon className="w-5 h-5 text-gray-900" />
          </div>
          <Typography variant="h2" className="text-gray-900">
            Investiční kalkulačka
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Výpočet růstu investic v čase
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Paper className="p-6 lg:col-span-1">
          <div className="space-y-6">
            <TextField
              label="Měsíční investice"
              type="number"
              value={formData.monthlyInvestment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  monthlyInvestment: Number(e.target.value),
                })
              }
              min={0}
            />

            <TextField
              label="Roční výnos (%)"
              type="number"
              value={formData.annualReturn}
              onChange={(e) =>
                setFormData({ ...formData, annualReturn: Number(e.target.value) })
              }
              min={0}
              max={100}
            />

            <TextField
              label="Počet let"
              type="number"
              value={formData.years}
              onChange={(e) =>
                setFormData({ ...formData, years: Number(e.target.value) })
              }
              min={1}
              max={100}
            />

            <div className="relative">
              <TextField
                label="Cílová částka"
                type="number"
                value={formData.targetAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetAmount: Number(e.target.value),
                  })
                }
                min={0}
              />
              {targetYear && (
                <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                  <Target size={16} />
                  <span>Cíle dosáhnete za {targetYear} let</span>
                </div>
              )}
            </div>
          </div>
        </Paper>

        {/* Chart */}
        <Paper className="p-6 lg:col-span-2">
          <Typography variant="h3" className="mb-6">
            Vývoj investice
          </Typography>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="year"
                  stroke="#6B7280"
                  tickFormatter={(value) => `${value} let`}
                />
                <YAxis
                  stroke="#6B7280"
                  tickFormatter={(value) =>
                    value.toLocaleString("cs-CZ", {
                      notation: "compact",
                      compactDisplay: "short",
                    })
                  }
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Rok ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="invested"
                  name="Vloženo"
                  stroke="#6366F1"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="interest"
                  name="Úrok"
                  stroke="#10B981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Celková hodnota"
                  stroke="#2563EB"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </div>

      {/* Summary */}
      <Paper className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Typography variant="small" className="text-gray-500 mb-1">
              Celkem vloženo
            </Typography>
            <Typography variant="h3" className="text-gray-900">
              {formatCurrency(data[data.length - 1]?.invested || 0)}
            </Typography>
          </div>
          <div>
            <Typography variant="small" className="text-gray-500 mb-1">
              Celkový výnos
            </Typography>
            <Typography variant="h3" className="text-green-600">
              {formatCurrency(data[data.length - 1]?.interest || 0)}
            </Typography>
          </div>
          <div>
            <Typography variant="small" className="text-gray-500 mb-1">
              Konečná hodnota
            </Typography>
            <Typography variant="h3" className="text-blue-600">
              {formatCurrency(data[data.length - 1]?.value || 0)}
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Calculator;