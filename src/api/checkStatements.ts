import { useQuery } from "@tanstack/react-query";

export type StatementsCheck = {
  missingPeriods: string[];
  lastCheck: string;
  nextCheckScheduled: string;
  status: "complete" | "incomplete";
};

const checkStatements = async (clientId: string): Promise<StatementsCheck> => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:3001/api/checkStatements?clientId=${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Nepodařilo se zkontrolovat stav výpisů");
  }

  return res.json();
};

export const useStatementsCheck = (clientId: string) =>
  useQuery({
    queryKey: ["statements-check", clientId],
    queryFn: () => checkStatements(clientId),
    enabled: !!clientId,
  });
