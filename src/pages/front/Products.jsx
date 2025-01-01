import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";

import {
	// getProducts,
	getAllProducts,
	// getCarts,
	createCart,
} from "@/api";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loadingCartId, setLoadingCartId] = useState(null);
	const [loading, setLoading] = useState(true);

	const onGetAllProducts = async () => {
		try {
			const data = await getAllProducts();
			setProducts(data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setLoading(false);
		}
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
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{products.map((product) => (
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
