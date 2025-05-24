import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { ClientSummary } from "../../api/getClients";
import { ROUTES } from "../../navigation/ROUTES";

interface ClientCardProps {
  client: ClientSummary;
}

const ClientCard: FC<ClientCardProps> = ({ client }) => {
  const navigate = useNavigate();

  const statusColors = {
    ok: "bg-success-100 text-success-700",
    "missing-data": "bg-warning-100 text-warning-700",
    inactive: "bg-neutral-100 text-neutral-700",
  };

  const statusText = {
    ok: "V pořádku",
    "missing-data": "Chybí data",
    inactive: "Neaktivní",
  };

  return (
    <div
      className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() =>
        navigate(ROUTES.CLIENT.DASHBOARD.replace(ROUTES.CLIENT_ROOT, `/${client.id}/`))
      }
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-neutral-900">{client.name}</h2>
          <p className="text-sm text-neutral-500">
            Naposledy upraveno:{" "}
            {new Date(client.lastUpdatedAt).toLocaleDateString("cs-CZ")}
          </p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            statusColors[client.status]
          }`}
        >
          {statusText[client.status]}
        </span>
      </div>
    </div>
  );
};

export default ClientCard;