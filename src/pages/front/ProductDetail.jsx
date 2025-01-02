import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleProduct } from "@/api";
import ReactLoading from "react-loading";
import { currency } from "@/utils/filter";

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedImage, setSelectedImage] = useState(0);

	const handleGetSingleProduct = async () => {
		try {
			const data = await getSingleProduct(id);
			setProduct(data.product);
		} catch (error) {
			console.error("Error fetching single product:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		handleGetSingleProduct();
	}, [id]);

	if (loading) {
		return (
			<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
				<ReactLoading type="spin" color="#fafafa" height={50} width={50} />
			</div>
		);
	}

	if (!product) {
		return (
			<div className="text-center py-56">
				<h2 className="text-3xl">Oops...課程不存在</h2>
				<Link to="/products" className="inline-block mt-4 text-primary text-xl">
					回產品頁
				</Link>
			</div>
		);
	}

	const formatDateTime = (dateTimeStr) => {
		const date = new Date(dateTimeStr);
		return date.toLocaleString("zh-TW", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="bg-gray-50 min-h-screen py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					<div className="md:flex">
						{/* 左側圖片區域 */}
						<div className="md:w-1/2">
							<div className="relative h-96">
								<img
									src={product.imagesUrl?.[selectedImage] || product.imageUrl}
									alt={product.title}
									className="w-full h-full object-cover"
								/>
							</div>
							{product.imagesUrl && product.imagesUrl.length > 0 && (
								<div className="p-4 flex gap-2 overflow-x-auto">
									{product.imagesUrl.map((url, index) => (
										<button
											key={`${url}${index}`}
											type="button"
											onClick={() => setSelectedImage(index)}
											className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
												selectedImage === index
													? "border-primary"
													: "border-transparent"
											}`}
										>
											<img
												src={url}
												alt={`${product.title} ${index + 1}`}
												className="w-full h-full object-cover"
											/>
										</button>
									))}
								</div>
							)}
						</div>

						{/* 右側內容區域 */}
						<div className="md:w-1/2 p-6">
							<h1 className="text-3xl title mb-4">{product.title}</h1>

							<div className="mb-6">
								<p className="text-gray-500 line-through mb-1">
									原價：${currency(product.origin_price)}
								</p>
								<p className="text-2xl text-red-600 font-bold">
									特價：${currency(product.price)}
								</p>
							</div>

							<div className="space-y-4 mb-6">
								<div>
									<h2 className="text-lg font-semibold mb-1">課程時間</h2>
									<p className="text">
										{formatDateTime(product.datetimeStart)} ~{" "}
										{formatDateTime(product.datetimeEnd)}
									</p>
								</div>

								<div>
									<h2 className="text-lg font-semibold mb-1">人數限制</h2>
									<p className="text">{product.numofPeople} 人</p>
								</div>

								<div>
									<h2 className="text-lg font-semibold mb-1">課程介紹</h2>
									<p className="text whitespace-pre-line">
										{product.description}
									</p>
								</div>

								<div>
									<h2 className="text-lg font-semibold mb-1">課程內容</h2>
									<p className="text whitespace-pre-line">{product.content}</p>
								</div>
								<div className="bg-yellow-50 p-4 rounded-lg">
									<h2 className="text-lg font-semibold mb-2 text-yellow-800">
										注意事項
									</h2>
									<p className="text-yellow-700">{product.notice}</p>
								</div>
							</div>

							<button
								type="button"
								className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors"
							>
								加入購物車
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
