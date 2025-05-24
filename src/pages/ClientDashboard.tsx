import { useEffect, useState } from "react";
import { useTab } from "../hooks/useTab";
import { Typography, Paper, Button } from "../components";
import { FileText, CreditCard } from "lucide-react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
	LineChart,
	Line,
} from "recharts";

const ClientDashboard = () => {
	const { client } = useTab();
	const [overview, setOverview] = useState<{
		balance: number;
		stats: {
			totalIncome: number;
			totalExpense: number;
			totalTransactions: number;
		};
		chartData: {
			byDay: { date: string; income: number; expense: number }[];
			byCategory: { category: string; total: number; type: string }[];
		};
		labels: {
			mostUsedCategory: string;
			highestIncome: string;
			highestExpense: string;
		};
	} | null>(null);

	useEffect(() => {
		const fetchOverview = async () => {
			try {
				const res = await fetch("http://localhost:3001/overview");
				const json = await res.json();
				const normalized = {
					...json,
					chartData: {
						byDay: json.chartData.byDay.map(
							(entry: { expense: number }) => ({
								...entry,
								expense: Math.abs(entry.expense),
							})
						),
						byCategory: json.chartData.byCategory
							.filter(
								(entry: { type: string }) =>
									entry.type === "expense"
							)
							.map((entry: { total: number }) => ({
								...entry,
								total: Math.abs(entry.total),
							})),
					},
				};
				setOverview(normalized);
			} catch (err) {
				console.error("Chyba při načítání přehledu:", err);
			}
		};

		fetchOverview();
	}, []);

	return (
		<div className="p-6 space-y-6 bg-gray-50 min-h-[calc(100vh-3.5rem)]">
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div>
					<Typography variant="h2" className="mb-1">
						Přehled klienta: {client?.name}
					</Typography>
					<Typography variant="small" className="text-gray-500">
						Přehled vystavených výpisů a transakcí
					</Typography>
				</div>

				<div className="flex gap-2">
					<Button variant="primary">
						<FileText size={16} className="mr-1" /> Výpisy
					</Button>
					<Button variant="secondary">
						<CreditCard size={16} className="mr-1" /> Transakce
					</Button>
				</div>
			</div>

			{overview && (
				<>
					{/* Bilance + porovnání příjmů a výdajů */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Paper className="p-4">
							<Typography variant="h3" className="mb-1">
								Celková bilance
							</Typography>
							<p
								className={`text-2xl font-semibold ${
									overview.balance >= 0
										? "text-green-600"
										: "text-red-600"
								}`}
							>
								{overview.balance.toLocaleString("cs-CZ", {
									style: "currency",
									currency: "CZK",
								})}
							</p>
							<p className="text-sm text-gray-500 mt-1">
								Počet transakcí:{" "}
								{overview.stats.totalTransactions}
							</p>
						</Paper>

						<Paper className="p-4">
							<Typography variant="h3" className="mb-4">
								Porovnání příjmů a výdajů
							</Typography>
							<ResponsiveContainer width="100%" height={200}>
								<BarChart
									data={[overview.stats]}
									layout="vertical"
									margin={{
										top: 10,
										right: 30,
										left: 0,
										bottom: 10,
									}}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis type="number" />
									<YAxis
										type="category"
										dataKey={() => ""}
										hide
									/>
									<Tooltip
										formatter={(value) =>
											Number(value).toLocaleString(
												"cs-CZ",
												{
													style: "currency",
													currency: "CZK",
												}
											)
										}
									/>
									<Legend />
									<Bar
										dataKey="totalIncome"
										fill="#4ade80"
										name="Příjmy"
									/>
									<Bar
										dataKey="totalExpense"
										fill="#f87171"
										name="Výdaje"
									/>
								</BarChart>
							</ResponsiveContainer>
						</Paper>
					</div>

					{/* Vývoj příjmů a výdajů v čase */}
					<Paper className="p-6 w-full">
						<Typography variant="h3" className="mb-4">
							Vývoj příjmů a výdajů v čase
						</Typography>
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={overview.chartData.byDay}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line
									type="monotone"
									dataKey="income"
									stroke="#4ade80"
									name="Příjmy"
								/>
								<Line
									type="monotone"
									dataKey="expense"
									stroke="#f87171"
									name="Výdaje"
								/>
							</LineChart>
						</ResponsiveContainer>
					</Paper>

					{/* Kategorie výdajů */}
					<Paper className="p-6 w-full">
						<Typography variant="h3" className="mb-4">
							Výdaje podle kategorií
						</Typography>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart
								data={overview.chartData.byCategory}
								layout="vertical"
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis type="number" />
								<YAxis
									dataKey="category"
									type="category"
									width={100}
								/>
								<Tooltip />
								<Bar
									dataKey="total"
									fill="#8884d8"
									name="Výdaje"
								/>
							</BarChart>
						</ResponsiveContainer>
					</Paper>

					{/* Další info */}
					<Paper className="p-4">
						<Typography variant="h3" className="mb-1">
							Další info
						</Typography>
						<ul className="text-sm text-gray-700 space-y-1">
							<li>
								Nejčastější kategorie:{" "}
								<strong>
									{overview.labels.mostUsedCategory}
								</strong>
							</li>
							<li>
								Největší příjem:{" "}
								<strong>{overview.labels.highestIncome}</strong>
							</li>
							<li>
								Největší výdaj:{" "}
								<strong>
									{overview.labels.highestExpense}
								</strong>
							</li>
						</ul>
					</Paper>
				</>
			)}
		</div>
	);
};

export default ClientDashboard;
