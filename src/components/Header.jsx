import { Link } from "react-router-dom";
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
						<Link to="/products" className="text hover:text-primary">
							前台產品頁
						</Link>
						<Link to="/login" className="text hover:text-primary">
							後台登入
						</Link>
						<Link to="/admin/products" className="text hover:text-primary">
							後台產品頁
						</Link>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
