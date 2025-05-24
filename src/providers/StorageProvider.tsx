import { StorageContext } from "../contexts";
import type { StorageContextType } from "../types/storage";

interface StorageProviderProps {
	children: React.ReactNode;
}

const StorageProvider = ({ children }: StorageProviderProps) => {
	const getItem: StorageContextType["getItem"] = (key) => {
		const item = sessionStorage.getItem(key);

		if (!item) {
			return null;
		}

		return JSON.parse(item);
	};

	const setItem: StorageContextType["setItem"] = (key, value) => {
		console.log("storage - setItem");

		sessionStorage.setItem(key, JSON.stringify(value));
	};

	const clearItem: StorageContextType["clearItem"] = (key) => {
		sessionStorage.removeItem(key);
	};

	const clearEntireStorage: StorageContextType["clearEntireStorage"] = () => {
		sessionStorage.clear();
		window.location.reload();
	};

	return (
		<StorageContext.Provider
			value={{
				getItem,
				setItem,
				clearItem,
				clearEntireStorage,
			}}
		>
			{children}
		</StorageContext.Provider>
	);
};

export default StorageProvider;
