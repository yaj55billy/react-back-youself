import { Link } from "react-router-dom";

const Home = () => {
	const categories = ["飲食", "瑜伽", "靜坐", "內觀"];

	return (
		<>
			{/* Hero Section */}
			<section
				className="relative h-[600px] bg-cover bg-center before:absolute before:bg-black/40 before:w-full before:h-full"
				style={{
					backgroundImage:
						'url("https://storage.googleapis.com/vue-course-api.appspot.com/hexschool-billyji/1735711316629.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QnP%2FRq9KGfkGH6GE63%2BMHIH%2FQ4zVQznrTrdWUw4r4QatAxq0DLi%2BPLgIlX8vyBk4M8owHga2Pu4ZPW0xNXnmXtZgk40nh7qP8OOkNCezxkuAXzMQ8yGDxcEZJsHVCuYzJUnpwVYY0m8f56BUHdX87M0vwOEjHMdyjU%2FaPz5H2B7gWFklq%2B2%2FymBkg7FQInKrAVN04cTKuLhmJlRc%2FMxCxkHtVs91Rdkf%2Bxxb4HietGidlVHgtYHHVZ4pZzmrUBSdZILg6kt2TdUHLIh6N3cdoWKlFd4oGGDp6P3T9fSTVsbYKC3ezCpIyq3O5CdIJXZ%2BJ0HLlwFylblcO4IWuW0GTQ%3D%3D")',
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
						<Link
							to="/products"
							className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
						>
							探索課程
						</Link>
					</div>
				</div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
						探索課程類別
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{categories.map((category) => (
							<Link
								key={category}
								to={`/products?category=${encodeURIComponent(category)}`}
								className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
							>
								<h3 className="text-xl font-semibold mb-2">{category}</h3>
								<p className="text-gray-600">探索{category}相關課程</p>
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
