import { useQuery } from "@tanstack/react-query";

export type StatementsCheck = {
  missingPeriods: string[];
  lastCheck: string;
  nextCheckScheduled: string;
  status: "complete" | "incomplete";
};

const checkStatements = async (clientId: string): Promise<StatementsCheck> => {
  const res = await fetch(`/MOCK/checkStatements.json`);
  if (!res.ok) throw new Error("Nepodařilo se zkontrolovat stav výpisů");
  return res.json();
};

export const useStatementsCheck = (clientId: string) =>
  useQuery({
    queryKey: ["statements-check", clientId],
    queryFn: () => checkStatements(clientId),
    enabled: !!clientId,
  });