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
      color: "bg-success-50 text-success-700 border-success-100",
      text: "V pořádku"
    },
    "missing-data": {
      color: "bg-warning-50 text-warning-700 border-warning-100",
      text: "Chybí data"
    },
    inactive: {
      color: "bg-neutral-50 text-neutral-700 border-neutral-100",
      text: "Neaktivní"
    }
  };

  const status = statusConfig[client.status];

  return (
    <div
      className="group bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-all duration-200 cursor-pointer"
      onClick={() =>
        navigate(ROUTES.CLIENT.DASHBOARD.replace(ROUTES.CLIENT_ROOT, `/${client.id}/`))
      }
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-neutral-900 group-hover:text-neutral-700 transition-colors">
            {client.name}
          </h2>
          <p className="text-sm text-neutral-500">
            Naposledy upraveno:{" "}
            {new Date(client.lastUpdatedAt).toLocaleDateString("cs-CZ")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${
              status.color
            }`}
          >
            {status.text}
          </span>
          
          <ArrowRight 
            className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" 
          />
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
