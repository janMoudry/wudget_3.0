import { useQuery } from "@tanstack/react-query";

export type ClientSummary = {
	id: string;
	name: string;
	status: "ok" | "missing-data" | "inactive";
	lastUpdatedAt: string;
};

const getClients = async (): Promise<ClientSummary[]> => {
	const res = await fetch("/MOCK/clients.json");
	if (!res.ok) throw new Error("Nepodařilo se načíst klienty");
	return res.json();
};

export const useClients = () =>
	useQuery({
		queryKey: ["clients"],
		queryFn: getClients,
	});
