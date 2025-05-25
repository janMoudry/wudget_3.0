import type { LoginResponse } from "../api/login";
import type { Period } from "./period";

export enum STORAGE_KEYS {
  USER = "user",
  PERIOD = "period",
  ACCOUNT = "account"
}

export type STORAGE_VALUES = {
  [STORAGE_KEYS.USER]: LoginResponse | null;
  [STORAGE_KEYS.PERIOD]: Record<string, Period>;
  [STORAGE_KEYS.ACCOUNT]: Record<string, string>;
};

export type StorageContextType = {
  getItem: <T extends STORAGE_KEYS>(key: T) => STORAGE_VALUES[T] | null;
  setItem: <T extends STORAGE_KEYS>(key: T, value: STORAGE_VALUES[T]) => void;
  clearItem: (key: STORAGE_KEYS) => void;
  clearEntireStorage: () => void;
};