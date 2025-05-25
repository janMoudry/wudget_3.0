const convertDate = (d) => {
  if (!d) return null;
  const [day, month, year] = d.split(/[./]/);
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const parseAmount = (input) => {
  if (!input) return 0;
  return parseFloat(input.replace(/\s/g, '').replace(',', '.'));
};

export const normalizeAirbank = (row) => {
  const amount = parseAmount(row["Částka v měně účtu"] || row["Původní částka úhrady"]);
  const direction = amount >= 0 ? "income" : "expense";

  return {
    date: convertDate(row["Datum zaúčtování"] || row["Datum provedení"]),
    amount,
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