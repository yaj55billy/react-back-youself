import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";

import { getAllProducts, createCart } from "@/api";

const Products = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [products, setProducts] = useState([]);
	const [loadingCartId, setLoadingCartId] = useState(null);
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [activeCategory, setActiveCategory] = useState("全部課程");

	const onGetAllProducts = async () => {
		try {
			const data = await getAllProducts();
			setProducts(data.products);

			const uniqueCategories = [
				"全部課程",
				...new Set(data.products.map((p) => p.category)),
			];
			setCategories(uniqueCategories);

			const categoryFromUrl = searchParams.get("category");
			if (categoryFromUrl && uniqueCategories.includes(categoryFromUrl)) {
				setActiveCategory(categoryFromUrl);
			}
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleCategoryChange = (category) => {
		setActiveCategory(category);
		if (category === "全部課程") {
			searchParams.delete("category");
		} else {
			searchParams.set("category", category);
		}
		setSearchParams(searchParams);
	};

	const handleAddCart = async (id, num = 1) => {
		setLoadingCartId(id);
		const data = {
			product_id: id,
			qty: num,
		};
		try {
			await createCart(data);
		} catch (error) {
			console.error("Error adding cart:", error);
		} finally {
			setLoadingCartId(null);
		}
	};

	const filteredProducts =
		activeCategory === "全部課程"
			? products
			: products.filter((product) => product.category === activeCategory);

	useEffect(() => {
		onGetAllProducts();
	}, []);

	return (
		<>
			{loading && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
					<ReactLoading type="spin" color="#fafafa" height={50} width={50} />
				</div>
			)}
			<div className="bg-gray-50">
				<HeroSection
					url="https://storage.googleapis.com/vue-course-api.appspot.com/hexschool-billyji/1735717401414.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bH3yoELTNNihLnUDWMz9s8%2BLAxbFHeG0wUG0r3H1nsnMUaj4NU1mnbjrQ1JBBoFtf0WywIG8H2K%2Buu%2F%2F7IzhQz4iNXhMACDNcrwL8u%2FXSa1FtGLsj2Irht8iVEsFOIO9yRRr87pgjZRBluEnDtqprVvAy1BWc2HHPTjCw393FbUS5DXsX6ociCe%2F7n%2BhCFEaXzAIuQHBwDZjIcQbv8d0f7bo9jAv3M9%2BuQLI99t3JTNtsddDSwqIORCtqcoxYVd%2FVu6q3yAHouc3hGuCDtM1yWAcG8sHgkPwtuSAtvjsJ20NJiekOD6DV7LQkiEHflDr%2FEC0yvn10mpzndGvkJSkaQ%3D%3D"
					height="h-[300px]"
					title="課程列表"
				/>
				<div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
					<div className="flex flex-wrap gap-2 mb-6">
						{categories.map((category) => (
							<button
								key={category}
								type="button"
								onClick={() => handleCategoryChange(category)}
								className={`px-4 py-2 rounded-full transition-colors ${
									activeCategory === category
										? "bg-primary text-white"
										: "bg-gray-100 hover:bg-gray-200 text-gray-700"
								}`}
							>
								{category}
							</button>
						))}
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{filteredProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onAddCart={handleAddCart}
								loadingCartId={loadingCartId}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Products;
