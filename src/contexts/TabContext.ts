import { createContext } from "react";
import type { TabContextType } from "../types/tab";

export const TabContext = createContext<TabContextType>({
	tab: { id: "", title: "" },
	client: null,
	isLoading: false,
	isError: false,
});
