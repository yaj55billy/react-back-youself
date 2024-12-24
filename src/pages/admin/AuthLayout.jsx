import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
	Menu,
	Package,
	ShoppingCart,
	LogOut,
	X,
	// Tag,
	// FileText,
} from "lucide-react";
import { apiAuth, authCheck, authLogout } from "../../api/index.js";

const AuthLayout = () => {
	console.log("AuthLayout");

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isAuth, setIsAuth] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();

	const isActive = (path) => {
		return location.pathname.startsWith(path);
	};

	const onCheckAuth = async () => {
		try {
			await authCheck();
			setIsAuth(true);
		} catch {
			setIsAuth(false);
			navigate("/login");
		}
	};

	const signOut = async () => {
		try {
			await authLogout();
			document.cookie = `hexToken=;expires=${new Date(
				0
			).toUTCString()};path=/;`;
			setIsAuth(false);
			navigate("/");
		} catch (error) {
			console.log("登出失敗", error);
			alert("發生了一些問題，需再嘗試或檢查");
		}
	};

	useEffect(() => {
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
			"$1"
		);

		// 只有在 token 存在且不為空時才設置 header
		if (token) {
			apiAuth.defaults.headers.common.Authorization = token;
			console.log("token:", token);
			onCheckAuth();
		} else {
			setIsAuth(false);
			navigate("/login");
		}
	}, []);

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Header */}
			<header className="bg-gray-900 text-white sticky top-0 z-30">
				<div className="px-4 py-3 flex items-center justify-between">
					<div className="flex items-center">
						<button
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							className="p-1 rounded-lg hover:bg-gray-800 lg:hidden"
						>
							<Menu className="w-6 h-6" />
						</button>
						<h1 className="ml-4 text-lg font-semibold">後台管理頁面</h1>
					</div>
					<div className="flex items-center space-x-4">
						<Link to="/" className="text-sm hover:text-gray-300">
							回首頁
						</Link>
						<button
							type="button"
							className="flex items-center text-sm hover:text-gray-300"
							onClick={signOut}
						>
							<LogOut className="w-4 h-4 mr-1" />
							<span className="hidden sm:inline">登出</span>
						</button>
					</div>
				</div>
			</header>

			<div className="flex">
				{/* Mobile Sidebar Overlay */}
				{isSidebarOpen && (
					<div
						className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
						onClick={() => setIsSidebarOpen(false)}
					/>
				)}

				{/* Sidebar */}
				<aside
					className={`
            fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-48px)]
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
				>
					<div className="flex items-center justify-between p-4 lg:hidden">
						<h2 className="text-lg title">選單</h2>
						<button
							onClick={() => setIsSidebarOpen(false)}
							className="p-1 rounded-lg hover:bg-gray-100"
						>
							<X className="w-6 h-6" />
						</button>
					</div>
					<nav className="p-4 space-y-1">
						<Link
							to={`/admin/products`}
							className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
								isActive("/admin/products")
									? "bg-primary text-white"
									: "text-gray-700 hover:bg-gray-100"
							}`}
							onClick={() => setIsSidebarOpen(false)}
						>
							<Package className="w-5 h-5 mr-3" />
							產品列表
						</Link>
						<Link
							to={`/admin/orders`}
							className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
								isActive("/admin/orders")
									? "bg-primary text-white"
									: "text-gray-700 hover:bg-gray-100"
							}`}
							onClick={() => setIsSidebarOpen(false)}
						>
							<ShoppingCart className="w-5 h-5 mr-3" />
							訂單列表
						</Link>
						{/* <Link to={`/admin/coupons`}>
							<Tag className="w-5 h-5 mr-3" />
							優惠券列表
						</Link>
						<Link to={`/admin/articles`}>
							<FileText className="w-5 h-5 mr-3" />
							文章列表
						</Link> */}
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-4 sm:p-6 w-full overflow-x-auto">
					{isAuth && <Outlet />}
				</main>
			</div>
		</div>
	);
};

export default AuthLayout;
