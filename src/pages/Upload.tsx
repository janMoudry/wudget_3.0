import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "../components";

const Upload = () => {
	const [bank, setBank] = useState<string | null>(null);
	const [files, setFiles] = useState<FileList | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFiles(e.target.files);
	};

	const handleUpload = async () => {
		if (!files) return;

		const file = files[0];

		const formData = new FormData();
		formData.append("file", file); // název musí být "file", aby to Multer vzal

		const response = await fetch(
			`http://localhost:3001/upload?bank=${bank}`,
			{
				method: "POST",
				body: formData, // správně jako multipart/form-data
			}
		);

		const data = await response.json();
		console.log(data);

		setFiles(null); // vyprázdníme soubor po úspěšném nahrání
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-gray-50 p-6">
			<h1 className="text-3xl font-bold mb-8 text-gray-800">
				Nahrání výpisu z účtu
			</h1>

			{/* Výběr banky */}
			<div className="w-full max-w-md mb-6">
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Zvol banku:
				</label>
				<select
					value={bank ?? ""}
					onChange={(e) => setBank(e.target.value)}
					className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="" disabled>
						-- Vyber banku --
					</option>
					<option value="airbank">AirBank</option>
				</select>
			</div>

			{/* Výběr souboru – jen pokud je banka vybraná */}
			{bank && (
				<div className="w-full max-w-md space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Vyber soubor(y) (.csv)
						</label>
						<input
							type="file"
							accept=".csv"
							multiple
							onChange={handleFileChange}
							className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer bg-white px-3 py-2"
						/>
					</div>

					{files && files.length > 0 && (
						<ul className="text-sm text-gray-600 space-y-1">
							{Array.from(files).map((file, i) => (
								<li key={i} className="flex items-center gap-2">
									<UploadCloud size={16} />
									{file.name} ({(file.size / 1024).toFixed(1)}{" "}
									KB)
								</li>
							))}
						</ul>
					)}

					<Button
						onClick={handleUpload}
						disabled={!files || files.length === 0}
					>
						Nahrát {files?.length ?? 0} souborů
					</Button>
				</div>
			)}
		</div>
	);
};

export default Upload;
