const convertDate = (d) => {
	if (!d) return null;
	const [day, month, year] = d.split(/[./]/);
	return `${year}-${month}-${day}`;
};

const parseAmount = (input) => {
	if (!input) return 0;
	return parseFloat(input.replace(",", "."));
};

const normalizeAirbank = (row) => {
	const originalAmount = parseAmount(
		row["Původní částka úhrady"] || row["Částka v měně účtu"]
	);
	const direction = row["Směr úhrady"] === "Příchozí" ? "income" : "expense";

	return {
		date: convertDate(row["Datum zaúčtování"] || row["Datum provedení"]),
		amount: originalAmount,
		currency: row["Měna účtu"] || "CZK",
		type: direction,
		method: row["Typ úhrady"] || "",
		category: row["Kategorie plateb"] || "",
		counterparty:
			row["Název protistrany"] ||
			row["Obchodní místo"] ||
			row["Název účtu protistrany"] ||
			"",
		note:
			row["Poznámka pro mne"] ||
			row["Poznámka k úhradě"] ||
			row["Zpráva pro příjemce"] ||
			"",
		raw: row,
	};
};

module.exports = normalizeAirbank;
