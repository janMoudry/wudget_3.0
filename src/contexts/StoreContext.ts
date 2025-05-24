import { createContext } from "react";
import type { StoreContextType } from "../types/store";

export const StoreContext = createContext<StoreContextType>({
	getItem: () => null,
	setItem: () => {},
	clearItem: () => {},
	clearEntireStore: () => {},
});
