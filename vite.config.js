import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(() => {
	return {
		base: "/react-back-youself-week6/", //react-back-youself-week4
		plugins: [react()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};
});
