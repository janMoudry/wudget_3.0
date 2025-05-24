import type { Tab } from "./tab";

export type MultiTabContextType = {
	tabs: Tab[];
	activeTab: string;
	lastVisitedGeneralPage: string;
	getTab: (tabId: string) => Tab | null;
	onTabChange: (tabId: string) => void;
	addTab: (tab: Tab) => void;
	removeTab: (tabId: string) => void;
	changeLastVisitedGeneralPage: (page: string) => void;
};
