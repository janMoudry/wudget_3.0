import Navigation from "@navigation/Navigation";
import { AuthProvider, MultiTabProvider } from "@providers";

const App = () => (
	<AuthProvider>
		<MultiTabProvider>
			<Navigation />
		</MultiTabProvider>
	</AuthProvider>
);

export default App;
