import { useMultiTab } from "../../hooks/useMultiTab";
import { Tab } from "../atoms";

const Tabs = () => {
	const { tabs } = useMultiTab();

	return (
		<div className="flex gap-2 overflow-x-auto">
			{tabs.map((tab) => (
				<Tab key={tab.id} id={tab.id} name={tab.title} />
			))}
		</div>
	);
};

export default Tabs;
