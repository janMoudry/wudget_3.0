// src/components/molecules/ClientCard.tsx
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { ClientSummary } from "../../api/getClients";
import { ROUTES } from "../../navigation/ROUTES";
import { ArrowRight } from "lucide-react";

interface ClientCardProps {
  client: ClientSummary;
}

const ClientCard: FC<ClientCardProps> = ({ client }) => {
  const navigate = useNavigate();

  const statusConfig = {
    ok: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-100",
      label: "V pořádku"
    },
    "missing-data": {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-100",
      label: "Chybí data"
    },
    inactive: {
      bg: "bg-gray-50",
      text: "text-gray-700",
      border: "border-gray-200",
      label: "Neaktivní"
    }
  };

  const status = statusConfig[client.status];

  return (
    <div
      onClick={() =>
        navigate(ROUTES.CLIENT.DASHBOARD.replace(ROUTES.CLIENT_ROOT, `/${client.id}/`))
      }
      className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-gray-900">
            {client.name}
          </h2>
          <p className="text-sm text-gray-500">
            Naposledy upraveno:{" "}
            {new Date(client.lastUpdatedAt).toLocaleDateString("cs-CZ")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1.5 text-sm font-medium rounded-lg border
              ${status.bg} ${status.text} ${status.border}`}
          >
            {status.label}
          </span>
          
          <ArrowRight 
            className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" 
          />
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
