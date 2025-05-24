import { useClients } from "../api/getClients";
import { ClientCard } from "../components/molecules";

const Clients = () => {
	const { data: clients, isLoading, isError } = useClients();

	if (isLoading) {
		return <div className="p-4 text-gray-500">Načítám seznam klientů…</div>;
	}

	if (isError || !clients) {
		return (
			<div className="p-4 text-red-500">Chyba při načítání klientů.</div>
		);
	}

	return (
		<div className="p-6 space-y-4">
			<h1 className="text-2xl font-bold">Klienti</h1>

			<ul className="space-y-2 divide-y divide-gray-100">
				{clients.map((client) => (
					<li key={client.id}>
						<ClientCard client={client} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default Clients;
