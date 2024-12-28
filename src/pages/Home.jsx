import Header from "@/components/Header";

const Home = () => {
	return (
		<>
			<Header />
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
