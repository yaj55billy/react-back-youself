import { MapPin, Mail, Phone, Clock } from "lucide-react";
import HeroSection from "@/components/HeroSection";

export default function About() {
	return (
		<div className="bg-gray-50">
			<HeroSection
				url="https://storage.googleapis.com/vue-course-api.appspot.com/hexschool-billyji/1735717401414.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bH3yoELTNNihLnUDWMz9s8%2BLAxbFHeG0wUG0r3H1nsnMUaj4NU1mnbjrQ1JBBoFtf0WywIG8H2K%2Buu%2F%2F7IzhQz4iNXhMACDNcrwL8u%2FXSa1FtGLsj2Irht8iVEsFOIO9yRRr87pgjZRBluEnDtqprVvAy1BWc2HHPTjCw393FbUS5DXsX6ociCe%2F7n%2BhCFEaXzAIuQHBwDZjIcQbv8d0f7bo9jAv3M9%2BuQLI99t3JTNtsddDSwqIORCtqcoxYVd%2FVu6q3yAHouc3hGuCDtM1yWAcG8sHgkPwtuSAtvjsJ20NJiekOD6DV7LQkiEHflDr%2FEC0yvn10mpzndGvkJSkaQ%3D%3D"
				height="h-[300px]"
				title="關於返家之路"
				description="找回內在的寧靜與平衡"
			/>

			<section className="py-16 md:py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl title mb-6">我們的理念</h2>
							<div className="space-y-4 text">
								<p>
									返家之路成立於 2020
									年，我們深信每個人都應該擁有一個可以沉澱心靈的空間。
									在這裡，我們致力於創造一個寧靜且充滿能量的環境，幫助每個人找回內在的平靜。
								</p>
								<p>
									我們的課程涵蓋靜坐、瑜珈、飲食療癒到頌缽，每一個課程都經過精心設計，
									確保能夠滿足不同程度學員的需求。這裡的老師都擁有豐富的經驗，能夠為您提供專業且細心的指導。
								</p>
								<p>
									在返家之路，我們相信身心的成長是一段永無止境的旅程，
									而我們很榮幸能夠陪伴您一同前行。
								</p>
							</div>
						</div>
						<div className="relative">
							<img
								src="https://storage.googleapis.com/vue-course-api.appspot.com/hexschool-billyji/1735716771668.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Oj3ihymRknl2wW4e6o1HIAB7i%2BW1QKFYklWTSAM7ahbCmrN2VssG0IMc56EDm4AG0B1O%2FwQpW%2BHBVMReLIzLvTWDj%2F1d8vAFsPq2s56NjV%2B%2BUA7L5oRzzCj1yBsgJPOi%2FRLCQ7QHnYZNJj4nH3RV7rA5DRoEYV%2BDFfUFapAQXVtMUuHIObk3k64ZIhc6vzQhD%2FqqJ2GUnRKlOMs7yJ5jhC7kX56QDTBfLP2S4Rhkimasps3Z%2FbzcgoVOK5M1n1y%2Bss%2B4GiI8DdpTtILy8Afe%2F%2B8Aor%2BWFUOVtPFrel5T1Wxvi2VbhxKg3UipFXIULMPX%2Fqh26ChnbEjb91Qp4sOarg%3D%3D"
								alt="我們的理念"
								className="rounded-lg shadow-lg w-full h-[400px] object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 md:py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl title text-center mb-12">場所環境</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="space-y-4">
							<img
								src="https://storage.googleapis.com/vue-course-api.appspot.com/hexschool-billyji/1735717261265.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=AgzltvsI4%2BLhNDFbZ2fuh4zpTKWr%2Fvvk9tVmv5bqlV9hKFmha1XMMPwkcqi0l6mx37kIDoFG635ST94nE9J46vGDbT9eFjqlQDvbBIhtQQMQWz1mhD0%2FJw6g5hLtGyiUm1Gu1Ts7fWAaJX9cOvmZHT5y9D4dtVSqgC2Q4jeGl0u%2BhgUpE5LdlOsybBS4%2BiaGSQFQNFp1wEWgno9HL2TmVfitQRh3NzM%2BD6HrbeValI7JoS7bySYU1GYELIQr9lcm1SDBEbaLNFpIpcL2ZiDT5NcaOw2vOfxbvxpVKeBEBwCP3hWtewetfpCzsDaPFoxjqehnuwZG2Zjyv5SAGeUvdA%3D%3D"
								alt="靜心空間"
								className="w-full h-64 object-cover rounded-lg shadow-md"
							/>
							<h3 className="text-xl title">靜心空間</h3>
							<p className="text">
								寬敞舒適的靜坐空間，讓您能夠沉浸在寧靜的氛圍中。
							</p>
						</div>
						<div className="space-y-4">
							<img
								src="https://storage.googleapis.com/vue-course-api.appspot.com/hexschool-billyji/1735717401414.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bH3yoELTNNihLnUDWMz9s8%2BLAxbFHeG0wUG0r3H1nsnMUaj4NU1mnbjrQ1JBBoFtf0WywIG8H2K%2Buu%2F%2F7IzhQz4iNXhMACDNcrwL8u%2FXSa1FtGLsj2Irht8iVEsFOIO9yRRr87pgjZRBluEnDtqprVvAy1BWc2HHPTjCw393FbUS5DXsX6ociCe%2F7n%2BhCFEaXzAIuQHBwDZjIcQbv8d0f7bo9jAv3M9%2BuQLI99t3JTNtsddDSwqIORCtqcoxYVd%2FVu6q3yAHouc3hGuCDtM1yWAcG8sHgkPwtuSAtvjsJ20NJiekOD6DV7LQkiEHflDr%2FEC0yvn10mpzndGvkJSkaQ%3D%3D"
								alt="瑜珈教室"
								className="w-full h-64 object-cover rounded-lg shadow-md"
							/>
							<h3 className="text-xl title">瑜珈教室</h3>
							<p className="text">明亮通風的瑜珈空間，配備專業的瑜珈器材。</p>
						</div>
						<div className="space-y-4">
							<img
								src="https://storage.googleapis.com/vue-course-api.appspot.com/hexschool-billyji/1735717099386.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=PhOGPdqE4dnFVnwNQnPGC1LaDRtXa4%2FjRSIZUfTZrVNZC%2Bgm2iYW6%2Bg3nvVbDeerDfLfTMcl8jJsyCHw%2FG09%2BdvfB6bK58JKkIhqmmzRQiF3%2BsVAwMBzv8PC3YNRVqsb2ibi%2BaTmcpQXgcy96%2BaR60anbgU52r%2FBvRuf%2BKg7nnHOPrED7CPNj7GXQOlYrmWwxaHqUX1%2FqRoqhP8DUTYME0kN5%2BdF4sc16t7OaNv33EzbhMNFHYljbubxkzgXDwpbcLfTKPKAmfgUi9SyQeg5hLn9hgm1wR5G6qYrPrTo8kI5u%2BIO2mqYZ5G2fo%2Biz%2Bc%2FqS2uzea7Nb%2Fe0jfu49EWvA%3D%3D"
								alt="休息區"
								className="w-full h-64 object-cover rounded-lg shadow-md"
							/>
							<h3 className="text-xl title">休息區</h3>
							<p className="text">
								溫馨的休息空間，您可以在這裡放鬆身心，享用熱茶。
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 md:py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<div>
							<h2 className="text-3xl title mb-8">聯絡資訊</h2>
							<div className="space-y-6">
								<div className="flex items-start space-x-4">
									<MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
									<div>
										<h3 className="font-semibold text-gray-900 mb-1">地址</h3>
										<p className="text">台北市大安區和平東路二段222號</p>
									</div>
								</div>
								<div className="flex items-start space-x-4">
									<Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
									<div>
										<h3 className="font-semibold text-gray-900 mb-1">電話</h3>
										<p className="text">02-6666-8888</p>
									</div>
								</div>
								<div className="flex items-start space-x-4">
									<Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
									<div>
										<h3 className="font-semibold text-gray-900 mb-1">Email</h3>
										<p className="text">backyouself@gmail.com</p>
									</div>
								</div>
								<div className="flex items-start space-x-4">
									<Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
									<div>
										<h3 className="font-semibold text-gray-900 mb-1">
											營業時間
										</h3>
										<p className="text">週二至週日 10:00-21:00</p>
										<p className="text">週一公休</p>
									</div>
								</div>
							</div>
						</div>
						<div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.004888756891!2d121.5336!3d25.026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAxJzMzLjYiTiAxMjHCsDMyJzAxLjAiRQ!5e0!3m2!1sen!2stw!4v1635000000000!5m2!1sen!2stw"
								width="100%"
								height="100%"
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="Google Map"
							></iframe>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
