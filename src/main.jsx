// import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

const basename = "/react-back-youself/week4/";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	<BrowserRouter basename={basename ? basename : "/"}>
		<App />
	</BrowserRouter>
	// </StrictMode>,
);
