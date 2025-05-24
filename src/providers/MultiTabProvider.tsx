import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { MultiTabContext } from "../contexts/MultiTabsContext";
import type { MultiTabContextType } from "../types/multiTab";
import { useLocation } from "react-router";
import type { Tab } from "../types/tab";
import { useStore } from "../hooks/useStore";
import { STORE_KEYS } from "../types/store";

interface MultiTabProviderProps {
	children: React.ReactNode;
}

const MultiTabProvider: FC<MultiTabProviderProps> = ({ children }) => {
	const { pathname } = useLocation();
	const [selectedTab, setSelectedTab] = useState<string | null>(null);
	const [tabs, setTabs] = useState<Record<string, Tab>>({});
	const { setItem, getItem } = useStore();

	const lastVisitedGeneralPage = useRef<string | null>(null);

	const clientId = pathname.split("/")?.[1] || null;

	const handleGetTab: MultiTabContextType["getTab"] = useCallback(
		(id: string) => {
			const tab = tabs[id];
			if (tab) {
				return tab;
			}
			return null;
		},
		[tabs]
	);

	const handleAddTab: MultiTabContextType["addTab"] = useCallback(
		(tab: Tab) => {
			setTabs((prevTabs) => {
				const newTabs = { ...prevTabs, [tab.id]: tab };
				setItem(STORE_KEYS.TABS, newTabs);
				return newTabs;
			});
		},
		[setItem]
	);

	const handleRemoveTab: MultiTabContextType["removeTab"] = useCallback(
		(id: string) => {
			setTabs((prevTabs) => {
				const newTabs = { ...prevTabs };
				delete newTabs[id];
				setItem(STORE_KEYS.TABS, newTabs);
				return newTabs;
			});
		},
		[setItem]
	);

	const handleTabChange: MultiTabContextType["onTabChange"] = useCallback(
		(id: string) => {
			const tab = handleGetTab(id);
			if (tab) {
				setSelectedTab(tab.id);
			}
		},
		[handleGetTab]
	);

	const handleChangeLastVisitedGeneralPage: MultiTabContextType["changeLastVisitedGeneralPage"] =
		useCallback((page: string) => {
			lastVisitedGeneralPage.current = page;
		}, []);

	useEffect(() => {
		const tab = handleGetTab(clientId ?? "");

		if (tab) {
			setSelectedTab(tab.id);
		} else {
			setSelectedTab(null);
		}
	}, [clientId, handleGetTab]);

	useEffect(() => {
		const storedTabs = getItem(STORE_KEYS.TABS);
		if (storedTabs) {
			setTabs(storedTabs);
		}
	}, [getItem]);

	return (
		<MultiTabContext.Provider
			value={{
				tabs: Object.values(tabs),
				activeTab: selectedTab || "",
				lastVisitedGeneralPage: lastVisitedGeneralPage.current || "",
				getTab: handleGetTab,
				onTabChange: handleTabChange,
				addTab: handleAddTab,
				removeTab: handleRemoveTab,
				changeLastVisitedGeneralPage:
					handleChangeLastVisitedGeneralPage,
			}}
		>
			{children}
		</MultiTabContext.Provider>
	);
};

export default MultiTabProvider;
