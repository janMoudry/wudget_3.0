import { createContext } from "react";
import type { StorageContextType } from "../types/storage";

export const StorageContext = createContext<StorageContextType>({
	getItem: () => null,
	setItem: () => {},
	clearItem: () => {},
	clearEntireStorage: () => {},
});
