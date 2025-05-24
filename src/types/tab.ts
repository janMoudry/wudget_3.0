import type { ClientDetail } from "../api/getClient";

export type Tab = {
	id: string;
	title: string;
};

export type TabContextType = {
	tab: Tab;
	client: ClientDetail | null;
	isLoading: boolean;
	isError: boolean;
};
