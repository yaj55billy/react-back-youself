import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
	return {
		base: "/", //react-back-youself-week4
		plugins: [react()],
	};
});
