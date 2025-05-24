import type { Tab } from "./tab";

export enum STORE_KEYS {
	TABS = "tabs",
}

export type STORE_VALUES = {
	[STORE_KEYS.TABS]: Record<string, Tab>;
};

export type StoreContextType = {
	getItem: <T extends STORE_KEYS>(key: T) => STORE_VALUES[T] | null;
	setItem: <T extends STORE_KEYS>(
		key: T,
		value: STORE_VALUES[T],
		replace?: boolean
	) => void;
	clearItem: (key: STORE_KEYS) => void;
	clearEntireStore: () => void;
};
