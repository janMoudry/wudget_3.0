import { useEffect, useState } from "react";
import { Button, Typography } from "../components";
import { ArrowDownUp, Filter, Search } from "lucide-react";

type Transaction = {
	date: string;
	amount: number;
	currency: string;
	type: "income" | "expense";
	method: string;
	category: string;
	counterparty: string;
	note: string;
	raw: JSON;
};

const Transactions = () => {
	const [search, setSearch] = useState("");
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const res = await fetch("http://localhost:3001/transactions");
				const json = await res.json();
				setTransactions(json?.data || []);
			} catch (err) {
				console.error("Chyba při načítání transakcí:", err);
			}
		};

		fetchTransactions();
	}, []);

	const filtered = transactions.filter((t) =>
		`${t.counterparty} ${t.category} ${t.note}`
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	return (
		<div className="p-6 bg-gray-50 min-h-[calc(100vh-3.5rem)]">
			<header className="flex justify-between items-center mb-6">
				<div>
					<Typography variant="h2">Transakce</Typography>
					<Typography variant="small" className="text-gray-500">
						Přehled všech finančních pohybů
					</Typography>
				</div>

				<div className="flex items-center gap-2">
					<Button variant="secondary">
						<Filter size={16} className="mr-1" />
						Filtry
					</Button>
					<Button variant="primary">
						<ArrowDownUp size={16} className="mr-1" />
						Export
					</Button>
				</div>
			</header>

			{/* Vyhledávání */}
			<div className="mb-4">
				<div className="relative w-full max-w-md">
					<input
						type="text"
						placeholder="Hledat transakci..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full border border-gray-300 rounded px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
					<Search
						className="absolute left-3 top-2.5 text-gray-400"
						size={16}
					/>
				</div>
			</div>

			{/* Tabulka */}
			<div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
				<table className="w-full text-sm text-left">
					<thead className="text-xs text-gray-600 uppercase bg-gray-100">
						<tr>
							<th className="px-5 py-3">Datum</th>
							<th className="px-5 py-3">Popis</th>
							<th className="px-5 py-3">Kategorie</th>
							<th className="px-5 py-3 text-right">Částka</th>
							<th className="px-5 py-3">Typ</th>
						</tr>
					</thead>
					<tbody>
						{filtered.map((t, i) => (
							<tr
								key={i}
								className="border-t border-gray-200 hover:bg-gray-50 transition"
							>
								<td className="px-5 py-3">{t.date}</td>
								<td className="px-5 py-3">{t.counterparty}</td>
								<td className="px-5 py-3">
									<span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
										{t.category || "Nezařazeno"}
									</span>
								</td>
								<td
									className={`px-5 py-3 text-right font-semibold ${
										t.amount < 0
											? "text-red-600"
											: "text-green-600"
									}`}
								>
									{t.amount.toLocaleString("cs-CZ", {
										style: "currency",
										currency: t.currency || "CZK",
									})}
								</td>
								<td className="px-5 py-3">
									<span
										className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
											t.type === "income"
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{t.type === "income"
											? "Příjem"
											: "Výdaj"}
									</span>
								</td>
							</tr>
						))}
						{filtered.length === 0 && (
							<tr>
								<td
									colSpan={5}
									className="text-center text-gray-500 py-6"
								>
									Žádné transakce nenalezeny
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Transactions;
