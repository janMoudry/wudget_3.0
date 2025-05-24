import { useContext } from "react";
import { StorageContext } from "../contexts";

export const useStorage = () => useContext(StorageContext);
