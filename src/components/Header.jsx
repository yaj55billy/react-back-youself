import { Link, NavLink } from "react-router-dom";
import {
	ShoppingCart,
	// Menu,
	// X,
	// User
} from "lucide-react";

const Header = () => {
	return (
		<header className="bg-whit border-b border-gray-300">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="w-full py-6 flex flex-col md:flex-row items-center justify-between">
					<div className="flex items-center mb-4 md:mb-0">
						<Link to="/" className="flex items-center">
							<h1 className="text-2xl title">返家之路.回歸自身</h1>
						</Link>
					</div>
					<div className="flex items-center space-x-8">
						<NavLink
							to="/about"
							className={({ isActive }) => {
								return `text-gray-600 hover:text-primary-dark ${
									isActive && "text-primary-dark font-semibold"
								}`;
							}}
						>
							關於我們
						</NavLink>
						<NavLink
							to="/products"
							className={({ isActive }) => {
								return `text-gray-600 hover:text-primary-dark ${
									isActive && "text-primary-dark font-semibold"
								}`;
							}}
						>
							課程列表
						</NavLink>
						<NavLink
							to="/cart"
							className={({ isActive }) => {
								return `text-gray-600 hover:text-primary-dark ${
									isActive && "text-primary-dark font-semibold"
								}`;
							}}
						>
							<ShoppingCart className="w-6 h-6" />
						</NavLink>

						<NavLink
							to="/login"
							className={({ isActive }) => {
								return `text-gray-600 hover:text-primary-dark ${
									isActive && "text-primary-dark font-semibold"
								}`;
							}}
						>
							登入
						</NavLink>
						{/* <Link to="/admin/products" className="text hover:text-primary">
							後台產品頁
						</Link> */}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
