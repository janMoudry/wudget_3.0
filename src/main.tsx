import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@api/api.ts";
import { BrowserRouter } from "react-router";
import { StoreProvider, StorageProvider } from "@providers";
import ModalProvider from "./providers/ModalProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<StoreProvider>
					<StorageProvider>
						<ModalProvider>
							<App />
						</ModalProvider>
					</StorageProvider>
				</StoreProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
);
