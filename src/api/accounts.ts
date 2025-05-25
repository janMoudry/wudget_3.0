import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Account } from "./getClient";

type CreateAccountRequest = {
  name: string;
  bankName: string;
  flags: string[];
  clientId: string;
};

const createAccount = async (data: CreateAccountRequest): Promise<Account> => {
  const token = localStorage.getItem('token');
  const res = await fetch("http://localhost:3001/api/accounts", {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create account');
  }
  
  return res.json();
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client'] });
    }
  });
};