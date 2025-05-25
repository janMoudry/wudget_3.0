export type Period = "week" | "month" | "lastMonth" | "quarter" | "year" | "all";

export const PERIOD_LABELS: Record<Period, string> = {
  week: "Tento týden",
  month: "Tento měsíc",
  lastMonth: "Minulý měsíc",
  quarter: "Čtvrtletí",
  year: "Rok",
  all: "Celá doba"
};