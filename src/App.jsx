import { RouterProvider } from "react-router-dom";
import { router } from "./router";

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
	return <RouterProvider router={router} />;
};

export default App;
