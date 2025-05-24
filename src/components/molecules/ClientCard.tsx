import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { ClientSummary } from "../../api/getClients";
import { ROUTES } from "../../navigation/ROUTES";

interface ClientCardProps {
	client: ClientSummary;
}

const ClientCard: FC<ClientCardProps> = ({ client }) => {
	const navigate = useNavigate();

	return (
		<div
			className="bg-white border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition cursor-pointer"
			onClick={() =>
				navigate(
					ROUTES.CLIENT.DASHBOARD.replace(
						ROUTES.CLIENT_ROOT,
						`/${client.id}/`
					)
				)
			}
		>
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-lg font-medium">{client.name}</h2>
					<p className="text-sm text-gray-500">
						Naposledy upraveno:{" "}
						{new Date(client.lastUpdatedAt).toLocaleDateString(
							"cs-CZ"
						)}
					</p>
				</div>
				<span
					className={`text-xs px-2 py-1 rounded ${
						client.status === "ok"
							? "bg-green-100 text-green-700"
							: client.status === "missing-data"
							? "bg-yellow-100 text-yellow-700"
							: "bg-gray-100 text-gray-700"
					}`}
				>
					{client.status === "ok"
						? "V pořádku"
						: client.status === "missing-data"
						? "Chybí data"
						: "Neaktivní"}
				</span>
			</div>
		</div>
	);
};

export default ClientCard;
