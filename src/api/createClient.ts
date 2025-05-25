import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientDetail } from "./getClient";

type CreateClientRequest = {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  notes?: string;
};

const createClient = async (data: CreateClientRequest): Promise<ClientDetail> => {
  const token = localStorage.getItem('token');
  const res = await fetch("http://localhost:3001/api/clients", {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create client');
  }
  
  return res.json();
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    }
  });
};