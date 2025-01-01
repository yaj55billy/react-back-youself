import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const FrontLayout = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<footer>
				<p>© 2024 我的網站</p>
			</footer>
		</>
	);
};

export default FrontLayout;
