import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import CartItem from "@/components/CartItem";
import {
	getProducts,
	getCarts,
	createCart,
	editCart,
	deleteCart,
	deleteAllCarts,
} from "@/api";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	const handleViewMore = (product) => {
		setIsModalOpen(true);
		setSelectedProduct(product);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
	};

	const onGetProducts = async (page = 1) => {
		try {
			const data = await getProducts(page);
			setProducts(data.products.slice(0, 9)); // 只取九筆資料
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const onGetCarts = async () => {
		try {
			const result = await getCarts();
			setCartItems(result.data);
			console.log(result.data);
		} catch (error) {
			console.error("Error fetching carts:", error);
		}
	};

	const handleAddCart = async (id, num = 1) => {
		const data = {
			product_id: id,
			qty: num,
		};
		try {
			await createCart(data);
			onGetCarts();
		} catch (error) {
			console.error("Error adding cart:", error);
		}
	};

	const handleClearCart = async () => {
		try {
			await deleteAllCarts();
			setCartItems([]);
		} catch (error) {
			console.error("Error clearing cart:", error);
		}
	};

	const handleDeleteCart = async (id) => {
		try {
			await deleteCart(id);
			onGetCarts();
		} catch (error) {
			console.error("Error deleting cart:", error);
		}
	};

	useEffect(() => {
		onGetProducts();
		onGetCarts();
	}, []);

	return (
		<>
			<Header />
			<div className="min-h-screen bg-gray-50">
				<div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
					<h1 className="text-3xl title mb-8">課程列表</h1>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onViewMore={handleViewMore}
								onAddCart={handleAddCart}
							/>
						))}
					</div>
					{selectedProduct && (
						<ProductModal
							product={selectedProduct}
							isOpen={isModalOpen}
							onClose={handleCloseModal}
						/>
					)}

					{/* 購物車列表 */}
					<div className="bg-white rounded-lg shadow-sm p-6 mt-8">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl title">購物車</h2>
							{cartItems?.carts?.length > 0 && (
								<button
									onClick={handleClearCart}
									className="px-4 py-2 text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 rounded-lg transition-colors"
								>
									清空購物車
								</button>
							)}
						</div>

						<div className="overflow-x-auto">
							<table className="min-w-full table-auto">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-4 py-2"></th>
										<th className="px-4 py-2 text-left">品名</th>
										<th className="px-4 py-2 text-center">數量</th>
										<th className="px-4 py-2 text-right">小計</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{cartItems?.carts?.length === 0 ? (
										<tr>
											<td
												colSpan="4"
												className="text-center text-gray-600 py-8"
											>
												Oops...購物車是空的！
											</td>
										</tr>
									) : (
										cartItems?.carts?.map((item) => (
											<CartItem
												key={item.id}
												item={item}
												onDeleteCart={handleDeleteCart}
											/>
										))
									)}
								</tbody>
							</table>
						</div>

						{cartItems?.carts?.length > 0 && (
							<div className="mt-4">
								<div className="flex justify-end items-center text-xl font-medium">
									<span className="px-4">總計：${cartItems.final_total}</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Products;
