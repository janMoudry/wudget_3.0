import { createContext } from "react";
import type { MultiTabContextType } from "../types/multiTab";

export const MultiTabContext = createContext<MultiTabContextType>({
	tabs: [],
	activeTab: "",
	lastVisitedGeneralPage: "",
	getTab: () => null,
	onTabChange: () => {},
	addTab: () => {},
	removeTab: () => {},
	changeLastVisitedGeneralPage: () => {},
});
