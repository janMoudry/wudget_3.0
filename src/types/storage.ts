import type { LoginResponse } from "../api/login";

export enum STORAGE_KEYS {
	USER = "user",
}

export type STORAGE_VALUES = {
	[STORAGE_KEYS.USER]: LoginResponse | null;
};

export type StorageContextType = {
	getItem: <T extends STORAGE_KEYS>(key: T) => STORAGE_VALUES[T] | null;
	setItem: <T extends STORAGE_KEYS>(key: T, value: STORAGE_VALUES[T]) => void;
	clearItem: (key: STORAGE_KEYS) => void;
	clearEntireStorage: () => void;
};
