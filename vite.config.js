import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
	let base = "/";
	if (mode === "development") {
		base = "/react-back-youself/";
	}

	return {
		base, // react-back-youself/
		plugins: [react()],
	};
});
