import { Typography, Paper, Button } from "../components";
import { User } from "lucide-react";

const Dashboard = () => {
	const mock = {
		clients: 4,
		transactions: 1290,
		balance: 143256,
		lastUploads: [
			{ clientName: "ACME s.r.o.", bank: "AirBank", date: "2025-05-24" },
			{ clientName: "Techify", bank: "Moneta", date: "2025-05-22" },
			{ clientName: "DeltaWare", bank: "ČSOB", date: "2025-05-20" },
		],
		maxIncome: {
			counterparty: "Rohlík s.r.o.",
			amount: 85000,
		},
		maxExpense: {
			counterparty: "Datart",
			amount: 42000,
		},
		clientsList: [
			{ name: "ACME s.r.o.", id: 1 },
			{ name: "Techify", id: 2 },
			{ name: "DeltaWare", id: 3 },
			{ name: "InovaTech", id: 4 },
		],
		outdatedClients: [
			{ id: 1, name: "ACME s.r.o.", lastUpdated: "2024-11-12" },
			{ id: 4, name: "InovaTech", lastUpdated: null },
		],
	};

	return (
		<div className="p-6 space-y-6 bg-gray-50 min-h-[calc(100vh-3.5rem)]">
			<div>
				<Typography variant="h2" className="mb-1">
					Úvodní přehled
				</Typography>
				<Typography variant="small" className="text-gray-500">
					Globální pohled na data všech klientů
				</Typography>
			</div>

			{/* Statistika */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<Paper className="p-4">
					<Typography variant="h3" className="mb-1">
						Počet klientů
					</Typography>
					<p className="text-2xl font-bold text-blue-600">
						{mock.clients}
					</p>
				</Paper>

				<Paper className="p-4">
					<Typography variant="h3" className="mb-1">
						Celkem transakcí
					</Typography>
					<p className="text-2xl font-bold text-purple-600">
						{mock.transactions}
					</p>
				</Paper>

				<Paper className="p-4">
					<Typography variant="h3" className="mb-1">
						Celková bilance
					</Typography>
					<p
						className={`text-2xl font-bold ${
							mock.balance >= 0
								? "text-green-600"
								: "text-red-600"
						}`}
					>
						{mock.balance.toLocaleString("cs-CZ", {
							style: "currency",
							currency: "CZK",
						})}
					</p>
				</Paper>
			</div>

			{/* Poslední výpisy */}
			<Paper className="p-4">
				<Typography variant="h3" className="mb-4">
					Poslední výpisy
				</Typography>
				<ul className="space-y-1 text-sm text-gray-700">
					{mock.lastUploads.map((u, i) => (
						<li
							key={i}
							className="flex justify-between items-center"
						>
							<span>
								{u.clientName} –{" "}
								<span className="text-gray-500">{u.bank}</span>
							</span>
							<span className="text-gray-500">{u.date}</span>
						</li>
					))}
				</ul>
			</Paper>

			{/* Největší transakce */}
			<Paper className="p-4">
				<Typography variant="h3" className="mb-4">
					Největší transakce
				</Typography>
				<ul className="text-sm text-gray-700 space-y-1">
					<li>
						<strong>Příjem:</strong> {mock.maxIncome.counterparty} –{" "}
						{mock.maxIncome.amount.toLocaleString("cs-CZ", {
							style: "currency",
							currency: "CZK",
						})}
					</li>
					<li>
						<strong>Výdaj:</strong> {mock.maxExpense.counterparty} –{" "}
						{mock.maxExpense.amount.toLocaleString("cs-CZ", {
							style: "currency",
							currency: "CZK",
						})}
					</li>
				</ul>
			</Paper>

			{/* Seznam klientů */}
			<Paper className="p-4">
				<Typography variant="h3" className="mb-4">
					Klienti bez aktuálního výpisu
				</Typography>
				{mock.outdatedClients.length === 0 ? (
					<p className="text-sm text-gray-500">
						Všichni klienti jsou aktuální ✅
					</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
						{mock.outdatedClients.map((c) => (
							<div
								key={c.id}
								className="border p-3 rounded shadow-sm bg-white flex items-center justify-between hover:bg-gray-50 transition"
							>
								<div className="flex flex-col">
									<div className="flex items-center gap-2">
										<User size={16} />
										<span className="font-medium">
											{c.name}
										</span>
									</div>
									<span className="text-xs text-gray-500 mt-1">
										Naposledy aktualizováno:{" "}
										{c.lastUpdated || "nikdy"}
									</span>
								</div>
								<Button variant="secondary">Detail</Button>
							</div>
						))}
					</div>
				)}
			</Paper>
		</div>
	);
};

export default Dashboard;
