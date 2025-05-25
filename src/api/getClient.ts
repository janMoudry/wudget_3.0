export type Account = {
  id: string;
  name: string;
  flags: string[];
  bankName: string;
  currency: string;
  balance: number;
};

export type ClientDetail = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  createdAt: string;
  lastUpdatedAt: string;
  status: "ok" | "missing-data" | "inactive";
  notes?: string;
  tags?: string[];
  accounts: Account[];
};

import { useQuery } from "@tanstack/react-query";

const getClient = async (id: string): Promise<ClientDetail> => {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:3001/api/clients/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!res.ok) throw new Error("Nepodařilo se načíst detail klienta");
  return res.json();
};

export const useClient = (id: string) =>
  useQuery({
    queryKey: ["client", id],
    queryFn: () => getClient(id),
    enabled: !!id,
  });