import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
	// let base = "/";
	// if (mode === "development") {
	// 	base = "/react-back-youself/";
	// }

	return {
		base: "/react-back-yourself/",
		plugins: [react()],
	};
});
