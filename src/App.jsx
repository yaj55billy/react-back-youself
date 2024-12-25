import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AuthLayout from "./pages/admin/AuthLayout.jsx";
import AuthProducts from "./pages/admin/AuthProducts.jsx";
import AuthOrders from "./pages/admin/AuthOrders.jsx";

/**
  一般內文：text-gray-600
  標題：text-gray-900
  主色系 primary：'#3A5A80'
  'primary-light': '#4B6B91',
  'primary-dark': '#294867',
  border-gray-300
  bg-red-500
  hover:bg-red-600
 */

const App = () => {
	return (
		<BrowserRouter basename="/react-back-youself-week4">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<AuthLayout />}>
					<Route path="products" element={<AuthProducts />} />
					<Route path="orders" element={<AuthOrders />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
