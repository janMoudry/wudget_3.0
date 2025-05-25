import type { ClientDetail } from "../api/getClient";
import type { Period } from "./period";

export type Tab = {
  id: string;
  title: string;
  period: Period;
};

export type TabContextType = {
  tab: Tab;
  client: ClientDetail | null;
  isLoading: boolean;
  isError: boolean;
  setPeriod: (period: Period) => void;
};