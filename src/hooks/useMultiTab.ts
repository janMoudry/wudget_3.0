import { useContext } from "react";
import { MultiTabContext } from "../contexts/MultiTabsContext";

export const useMultiTab = () => useContext(MultiTabContext);
