import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MessageToast from "@/components/MessageToast";
import Loading from "@/components/Loading";

const FrontLayout = () => {
	return (
		<>
			<MessageToast />
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default FrontLayout;
