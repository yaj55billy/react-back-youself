import { Link } from "react-router-dom";
import {
	Leaf,
	Utensils,
	Brain,
	Flower,
	Heart,
	Users,
	Clock,
	Shield,
} from "lucide-react";

const Home = () => {
	const categories = [
		{
			name: "飲食",
			icon: Utensils,
			description: "探索健康飲食之道，培養良好的飲食習慣",
		},
		{
			name: "瑜伽",
			icon: Leaf,
			description: "透過瑜伽體式跟呼吸，找回身心平衡",
		},
		{
			name: "靜坐",
			icon: Brain,
			description: "沉澱心靈，培養專注力與覺察力",
		},
		{
			name: "內觀",
			icon: Flower,
			description: "更深入探索內在，提升自我覺察",
		},
	];

	const features = [
		{
			icon: Heart,
			title: "專業師資",
			description: "每位老師都經過嚴格培訓，擁有豐富的教學經驗與專業證照",
		},
		{
			icon: Users,
			title: "小班制教學",
			description: "確保每位學員都能得到充分的關注與指導",
		},
		{
			icon: Clock,
			title: "彈性時段",
			description: "提供多個時段選擇，讓您能輕鬆安排學習時間",
		},
		{
			icon: Shield,
			title: "安心保障",
			description: "完整的保險規劃，讓您專注於課程學習",
		},
	];

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

			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto mb-16">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							探索課程類別
						</h2>
						<p className="text-lg text-gray-600">
							選擇適合您的課程，開始心靈成長之旅！
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{categories.map((category) => (
							<Link
								key={category.name}
								to={`/products?category=${encodeURIComponent(category.name)}`}
								className="group relative overflow-hidden rounded-2xl bg-white hover:bg-gray-50 transition-all duration-300 p-6 h-64 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1"
							>
								<div className="mb-4 text-primary">
									<category.icon size={48} strokeWidth={1.5} />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									{category.name}
								</h3>
								<p className="text-gray-600 text-sm">{category.description}</p>
								<div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<span className="text-primary font-medium">了解更多 →</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto mb-16">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							為什麼選擇我們？
						</h2>
						<p className="text-lg text-gray-600">
							我們致力於提供最優質的學習體驗，讓每位學員都能在舒適安心的環境中成長
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature) => (
							<div
								key={feature.title}
								className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
							>
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
									<feature.icon size={24} />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-600 text-sm">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
