const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
const csv = require("csv-parser");
const cors = require("cors");

// 1. Mapování bank → normalizátory
const normalizers = {
	airbank: require("./normalizers/airbank"),
	// další banky později: komercka, fio, ...
};

const app = express();
const port = 3001;
const DATA_PATH = path.join(__dirname, "data", "transactions.json");

app.use(cors());
const upload = multer({ dest: "uploads/" });

// 2. Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
	const bank = req.query.bank;
	if (!req.file || !bank || !normalizers[bank]) {
		return res.status(400).json({
			error: "Missing file or invalid/missing bank parameter.",
		});
	}

	const rows = [];
	const filePath = path.join(__dirname, req.file.path);

	fs.createReadStream(filePath)
		.pipe(iconv.decodeStream("win1250"))
		.pipe(csv({ separator: ";" }))
		.on("data", (data) => rows.push(data))
		.on("end", () => {
			fs.unlinkSync(filePath); // smažeme CSV

			const normalize = normalizers[bank];
			const normalized = rows.map(normalize);

			const now = new Date().toISOString();

			const jsonToSave = {
				bank,
				importedAt: now,
				data: normalized,
			};

			fs.writeFileSync(
				DATA_PATH,
				JSON.stringify(jsonToSave, null, 2),
				"utf-8"
			);

			res.json({ success: true, count: normalized.length });
		})
		.on("error", (err) => {
			console.error("CSV parsing error:", err);
			fs.unlinkSync(filePath);
			res.status(500).json({ error: "CSV parsing failed." });
		});
});

// 3. Endpoint pro získání transakcí
app.get("/transactions", (req, res) => {
	if (!fs.existsSync(DATA_PATH)) {
		return res.json([]);
	}
	const data = fs.readFileSync(DATA_PATH, "utf-8");
	res.json(JSON.parse(data));
});

app.get("/overview", (req, res) => {
	if (!fs.existsSync(DATA_PATH)) {
		return res.status(404).json({ error: "No transactions found." });
	}

	const json = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
	const data = json?.data || [];

	const income = data.filter((t) => t.type === "income");
	const expense = data.filter((t) => t.type === "expense");

	const sum = (arr) =>
		arr.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

	// Přehled kategorií
	const categoryTotals = {};
	data.forEach((t) => {
		const cat = t.category || "Nezařazeno";
		if (!categoryTotals[cat]) categoryTotals[cat] = 0;
		categoryTotals[cat] += Number(t.amount);
	});
	const byCategory = Object.entries(categoryTotals).map(
		([category, total]) => ({
			category,
			total,
			type: total >= 0 ? "income" : "expense",
		})
	);

	// Přehled podle měsíců
	const monthly = {};
	data.forEach((t) => {
		const month = t.date?.slice(0, 7); // "YYYY-MM"
		if (!month) return;
		if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
		if (t.type === "income") monthly[month].income += Number(t.amount);
		if (t.type === "expense") monthly[month].expense += Number(t.amount);
	});
	const byMonth = Object.entries(monthly).map(([month, stats]) => ({
		month,
		...stats,
	}));

	// Přehled podle dnů
	const daily = {};
	data.forEach((t) => {
		const day = t.date?.slice(0, 10); // "YYYY-MM-DD"
		if (!day) return;
		if (!daily[day]) daily[day] = { income: 0, expense: 0 };
		if (t.type === "income") daily[day].income += Number(t.amount);
		if (t.type === "expense") daily[day].expense += Number(t.amount);
	});
	const byDay = Object.entries(daily).map(([date, stats]) => ({
		date,
		...stats,
	}));

	// Největší příjem / výdaj
	const maxIncome = income.reduce(
		(prev, curr) =>
			Number(curr.amount) > Number(prev.amount) ? curr : prev,
		{ amount: 0 }
	);
	const maxExpense = expense.reduce(
		(prev, curr) =>
			Number(curr.amount) < Number(prev.amount) ? curr : prev,
		{ amount: 0 }
	);

	// Nejčastější kategorie
	const categoryFreq = {};
	data.forEach((t) => {
		const cat = t.category || "Nezařazeno";
		categoryFreq[cat] = (categoryFreq[cat] || 0) + 1;
	});
	const mostUsedCategory = Object.entries(categoryFreq).sort(
		(a, b) => b[1] - a[1]
	)[0]?.[0];

	res.json({
		bank: json.bank,
		importedAt: json.importedAt,
		balance: sum(data),
		stats: {
			totalTransactions: data.length,
			totalIncome: sum(income),
			totalExpense: sum(expense),
			incomeCount: income.length,
			expenseCount: expense.length,
		},
		invoices: {
			paid: 904691.48,
			unpaid: 0,
			overdue: 94500,
			totalCount: 13,
		},
		chartData: {
			byMonth,
			byDay,
			byCategory,
		},
		labels: {
			mostUsedCategory,
			highestIncome: `${maxIncome.counterparty} ${maxIncome.date}`,
			highestExpense: `${maxExpense.counterparty} ${maxExpense.date}`,
		},
	});
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
