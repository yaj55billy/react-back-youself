import { createHashRouter } from "react-router-dom";

import FrontLayout from "./layout/FrontLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";

import Home from "./pages/front/Home.jsx";
import About from "./pages/front/About.jsx";
import Login from "./pages/front/Login.jsx";
import Products from "./pages/front/Products.jsx";
import ProductDetail from "./pages/front/ProductDetail.jsx";
import Cart from "./pages/front/Cart.jsx";

import AuthProducts from "./pages/admin/AuthProducts.jsx";
import AuthOrders from "./pages/admin/AuthOrders.jsx";
import AuthImageUpload from "./pages/admin/AuthImageUpload.jsx";

export const router = createHashRouter([
	{
		path: "/",
		element: <FrontLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "about",
				element: <About />,
			},
			{
				path: "products",
				element: <Products />,
			},
			{
				path: "products/:id",
				element: <ProductDetail />,
			},
			{
				path: "cart",
				element: <Cart />,
			},
			{
				path: "login",
				element: <Login />,
			},
		],
	},
	{
		path: "/admin",
		element: <AuthLayout />,
		children: [
			{
				path: "products",
				element: <AuthProducts />,
			},
			{
				path: "orders",
				element: <AuthOrders />,
			},
			{
				path: "uploadimage",
				element: <AuthImageUpload />,
			},
		],
	},
	// {
	//   path: "*",
	//   element: <NotFound />,
	// },
]);
