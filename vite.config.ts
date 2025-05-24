import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": "/src",
			"@components": "/src/components",
			"@pages": "/src/pages",
			"@Types": "/src/types",
			"@providers": "/src/providers",
			"@hooks": "/src/hooks",
			"@contexts": "/src/contexts",
			"@navigation": "/src/navigation",
			"@api": "/src/api",
		},
	},
});
