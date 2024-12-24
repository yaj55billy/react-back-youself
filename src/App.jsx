import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AuthLayout from "./pages/admin/AuthLayout.jsx";
import AuthProducts from "./pages/admin/AuthProducts.jsx";
import AuthOrders from "./pages/admin/AuthOrders.jsx";
// import Products from "./pages/Products.jsx";

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

const API_BASE = "https://ec-course-api.hexschool.io/v2";
const API_PATH = "hexschool-billyji";

const App = () => {
	// const [loading, setLoading] = useState(false);
	// const [products, setProducts] = useState([]);

	const getProducts = async () => {
		try {
			const response = await axios.get(
				`${API_BASE}/api/${API_PATH}/admin/products`
			);
			setProducts(response.data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	// if (loading) {
	// 	return (
	// 		<div className="flex items-center justify-center min-h-screen">
	// 			<div className="text-center">
	// 				<div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
	// 				<h2 className="text-xl font-semibold">Loading...</h2>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<>
			{/* {isAuth ? (
				<>
					<button type="button" className="text-xl p-3" onClick={signOut}>
						登出按鈕（測試）
					</button>
					<Products products={products} getProducts={getProducts} />
				</>
			) : (
				<Login formData={formData} setFormData={setFormData} signIn={signIn} />
			)} */}

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<AuthLayout />}>
					<Route path="products" element={<AuthProducts />} />
					<Route path="orders" element={<AuthOrders />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
