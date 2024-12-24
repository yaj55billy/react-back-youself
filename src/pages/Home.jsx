import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<header className="bg-white">
				<nav
					className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
					aria-label="Top"
				>
					<div className="w-full py-6 flex flex-col md:flex-row items-center justify-between">
						<div className="flex items-center mb-4 md:mb-0">
							<Link to="/" className="flex items-center">
								<h1 className="text-2xl title">返家之路.回歸自身</h1>
							</Link>
						</div>
						<div className="flex items-center space-x-8">
							<Link to="/login" className="text-gray-600 hover:text-primary">
								後台登入
							</Link>
							<Link
								to="/admin/products"
								className="text-gray-600 hover:text-primary"
							>
								後台產品頁
							</Link>
						</div>
					</div>
				</nav>
			</header>
			{/* Hero Section */}
			<section
				className="relative h-[600px] bg-cover bg-center before:absolute before:bg-black/40 before:w-full before:h-full"
				style={{
					backgroundImage:
						'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80")',
				}}
			>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
					<div className="max-w-2xl">
						<h1 className="text-4xl font-bold text-white mb-6">
							返家之路，找回內在平靜
						</h1>
						<p className="text-xl text-white/90 mb-8">
							在這裡，我們提供多元的課程與活動，幫助你重新連結身心，找回生命中最珍貴的寧靜。
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
