import { StoreContext } from "../contexts";
import type { StoreContextType } from "../types/store";

interface StoreProviderProps {
	children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
	const getItem: StoreContextType["getItem"] = (key) => {
		const item = localStorage.getItem(key);

		if (!item) {
			return null;
		}

		return JSON.parse(item);
	};

	const setItem: StoreContextType["setItem"] = (
		key,
		value,
		replace = true
	) => {
		if (!replace) {
			const existingValue = getItem(key) || {};

			localStorage.setItem(
				key,
				JSON.stringify({ ...existingValue, ...value })
			);

			return;
		}

		localStorage.setItem(key, JSON.stringify(value));
	};

	const clearItem: StoreContextType["clearItem"] = (key) => {
		localStorage.removeItem(key);
	};

	const clearEntireStore: StoreContextType["clearEntireStore"] = () => {
		localStorage.clear();
		window.location.reload();
	};

	return (
		<StoreContext.Provider
			value={{
				getItem,
				setItem,
				clearItem,
				clearEntireStore,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreProvider;
