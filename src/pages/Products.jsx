import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
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
	createOrder,
} from "@/api";
import { currency } from "@/utils/filter";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [cartItems, setCartItems] = useState({});
	const [loadingCartId, setLoadingCartId] = useState(null);
	const [loading, setLoading] = useState(true);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			tel: "",
			address: "",
			message: "",
		},
		mode: "onTouched",
	});

	const onSubmit = async (data) => {
		setLoading(true);
		const orderData = {
			user: data,
			message: data.message,
		};

		try {
			const result = await createOrder(orderData);
			alert(result.message);
			reset();
			onGetCarts();
		} catch (error) {
			console.error("Error creating order:", error);
		} finally {
			setLoading(false);
		}
	};

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
		} catch (error) {
			console.error("Error fetching carts:", error);
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
			onGetCarts();
		} catch (error) {
			console.error("Error adding cart:", error);
		} finally {
			setLoadingCartId(null);
		}
	};

	const handleUpdateCart = async (product_id, num, itemId) => {
		const data = {
			product_id,
			qty: num,
		};
		try {
			await editCart(data, itemId);
			onGetCarts();
		} catch (error) {
			console.error("Error updating cart:", error);
		}
	};

	const handleClearCart = async () => {
		try {
			await deleteAllCarts();
			setCartItems({ carts: [] });
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
			{loading && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
					<ReactLoading type="spin" color="#fafafa" height={50} width={50} />
				</div>
			)}
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
								loadingCartId={loadingCartId}
							/>
						))}
					</div>
					{selectedProduct && (
						<ProductModal
							product={selectedProduct}
							isOpen={isModalOpen}
							onClose={handleCloseModal}
							onAddCart={handleAddCart}
							loadingCartId={loadingCartId}
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
												onUpdateCart={handleUpdateCart}
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
									<span className="px-4">
										總計：${currency(cartItems.final_total)}
									</span>
								</div>
							</div>
						)}
					</div>

					<form
						className="bg-white rounded-lg shadow-sm p-6 mt-8"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="space-y-6">
							{/* 收件人姓名 */}
							<div>
								<label htmlFor="name" className="block text-sm text mb-2">
									收件人姓名
								</label>
								<input
									type="text"
									name="name"
									id="name"
									{...register("name", {
										required: {
											value: true,
											message: "請輸入姓名",
										},
									})}
									className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
										errors.name
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: ""
									}`}
									placeholder="請輸入姓名"
								/>
								{errors.name && (
									<p className="mt-1 text-sm text-red-500">
										{errors?.name?.message}
									</p>
								)}
							</div>

							{/* Email */}
							<div>
								<label htmlFor="email" className="block text-sm text mb-2">
									Email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									{...register("email", {
										required: {
											value: true,
											message: "請輸入 Email",
										},
										pattern: {
											value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
											message: "Email 格式不正確",
										},
									})}
									className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
										errors.email
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: ""
									}`}
									placeholder="請輸入 Email"
								/>
								{errors.email && (
									<p className="mt-1 text-sm text-red-500">
										{errors?.email?.message}
									</p>
								)}
							</div>

							{/* 收件人電話 */}
							<div>
								<label htmlFor="tel" className="block text-sm text mb-2">
									收件人電話
								</label>
								<input
									type="tel"
									name="tel"
									id="tel"
									{...register("tel", {
										required: {
											value: true,
											message: "請輸入電話",
										},
										minLength: {
											value: 8,
											message: "電話號碼需超過 8 碼",
										},
										pattern: {
											value: /^\d+$/,
											message: "電話號碼格式不正確，僅限數字。",
										},
									})}
									className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
										errors.tel
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: ""
									}`}
									placeholder="請輸入電話"
								/>
								{errors.tel && (
									<p className="mt-1 text-sm text-red-500">
										{errors?.tel?.message}
									</p>
								)}
							</div>

							{/* 收件人地址 */}
							<div>
								<label htmlFor="address" className="block text-sm text mb-2">
									收件人地址
								</label>
								<input
									type="text"
									name="address"
									id="address"
									{...register("address", {
										required: {
											value: true,
											message: "請輸入地址",
										},
									})}
									className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
										errors.address
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: ""
									}`}
									placeholder="請輸入地址"
								/>
								{errors.address && (
									<p className="mt-1 text-sm text-red-500">
										{errors?.address?.message}
									</p>
								)}
							</div>

							{/* 留言 */}
							<div>
								<label htmlFor="message" className="block text-sm text mb-2">
									留言
								</label>
								<textarea
									id="message"
									rows="4"
									{...register("message")}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
									placeholder="請輸入留言"
								></textarea>
							</div>

							{/* 送出按鈕 */}
							{cartItems?.carts?.length !== 0 && (
								<button
									type="submit"
									className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
								>
									送出訂單
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Products;
