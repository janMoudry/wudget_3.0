import { useContext } from "react";
import { TabContext } from "../contexts/TabContext";

export const useTab = () => useContext(TabContext);
