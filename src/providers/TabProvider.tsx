import { useEffect, type FC } from "react";
import { useParams } from "react-router";
import { TabContext } from "../contexts/TabContext";
import { useMultiTab } from "../hooks/useMultiTab";
import { useClient } from "../api/getClient";

interface TabProviderProps {
	children: React.ReactNode;
}

const TabProvider: FC<TabProviderProps> = ({ children }) => {
	const { clientId } = useParams<{ clientId: string }>();
	const { getTab, addTab } = useMultiTab();
	const { data: client, isLoading, isError } = useClient(clientId ?? "");

	const tab = getTab(clientId ?? "");

	useEffect(() => {
		if (client && !tab) {
			addTab({
				id: client.id,
				title: client.name,
			});
		}
	}, [addTab, client, tab]);

	if (!tab) return null;

	return (
		<TabContext.Provider
			value={{ tab, client: client || null, isLoading, isError }}
		>
			{children}
		</TabContext.Provider>
	);
};

export default TabProvider;
