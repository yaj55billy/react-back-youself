import { useState, useEffect } from "react";
import ProductModal from "@/components/admin/ProductModal.jsx";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal.jsx";
import Pagination from "@/components/Pagination.jsx";
import {
	authGetProducts,
	authCreateProduct,
	authEditProduct,
	authDeleteProduct,
} from "@/api/index.js";

import { useDispatch } from "react-redux";
import { setIsLoading } from "@/slice/loadingSlice";
import { addAsyncMessageToast } from "@/slice/messageToastSlice";

const AuthProducts = () => {
	const [products, setProducts] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("create");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [pagination, setPagination] = useState({});
	const dispatch = useDispatch();

	const handleOpenModal = (mode, product = null) => {
		setIsModalOpen(true);
		setModalMode(mode);
		setSelectedProduct(product);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
	};

	const handleOpenDeleteModal = (product) => {
		setIsDeleteModalOpen(true);
		setSelectedProduct(product);
	};

	const handleCloseDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setSelectedProduct(null);
	};

	const getProducts = async (page = 1) => {
		dispatch(setIsLoading(true));
		try {
			const data = await authGetProducts(page);
			setProducts(data.products);
			setPagination(data.pagination);
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			dispatch(setIsLoading(false));
		}
	};

	const handleCreateProduct = async (data) => {
		dispatch(setIsLoading(true));
		try {
			const result = await authCreateProduct(data);
			dispatch(addAsyncMessageToast(result));
			await getProducts();
			handleCloseModal();
		} catch (error) {
			dispatch(addAsyncMessageToast(error.response.data));
			console.error("Error creating product:", error);
		} finally {
			dispatch(setIsLoading(false));
		}
	};

	const handleEditProduct = async (data) => {
		dispatch(setIsLoading(true));
		try {
			const result = await authEditProduct(data);
			console.log(result);

			dispatch(addAsyncMessageToast(result));
			await getProducts();
			handleCloseModal();
		} catch (error) {
			dispatch(addAsyncMessageToast(error.response.data));
			console.error("Error editing product:", error);
		} finally {
			dispatch(setIsLoading(false));
		}
	};

	const handleDeleteProduct = async (productId) => {
		dispatch(setIsLoading(true));
		try {
			const result = await authDeleteProduct(productId);
			dispatch(addAsyncMessageToast(result));
			await getProducts();
			handleCloseDeleteModal();
		} catch (error) {
			dispatch(addAsyncMessageToast(error.response.data));
			console.error("Error delete form:", error);
		} finally {
			dispatch(setIsLoading(false));
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className="p-6 min-h-screen bg-gray-100">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
				<h2 className="text-2xl title">產品列表</h2>
				<button
					type="button"
					className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-full sm:w-auto text-center"
					onClick={() => handleOpenModal("create")}
				>
					建立新的產品
				</button>
			</div>

			{/* 產品列表 */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
				{products.map((product) => (
					<div
						key={product.id}
						className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
					>
						<div className="flex items-center justify-between mb-3">
							<span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
								{product.category}
							</span>
							<span
								className={`px-3 py-1 rounded-full text-sm font-medium ${
									product.is_enabled
										? "bg-green-100 text-green-800"
										: "bg-red-100 text-red-800"
								}`}
							>
								{product.is_enabled ? "啟用" : "未啟用"}
							</span>
						</div>

						<h3 className="text-lg title mb-4">{product.title}</h3>

						<div className="space-y-2 mb-4">
							<div className="flex items-center justify-between">
								<span className="text">原價</span>
								<span className="text line-through">
									NT$ {product.origin_price.toLocaleString()}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text">售價</span>
								<span className="text-primary font-medium">
									NT$ {product.price.toLocaleString()}
								</span>
							</div>
						</div>

						<div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-100">
							<button
								type="button"
								className="px-3 py-1.5 font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
								onClick={() => handleOpenModal("edit", product)}
							>
								編輯
							</button>
							<button
								type="button"
								className="px-3 py-1.5 font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
								onClick={() => handleOpenDeleteModal(product)}
							>
								刪除
							</button>
						</div>
					</div>
				))}
			</div>

			<Pagination pagination={pagination} changePage={getProducts} />
			<ProductModal
				isOpen={isModalOpen}
				mode={modalMode}
				onClose={handleCloseModal}
				selectedData={selectedProduct}
				onCreate={handleCreateProduct}
				onEdit={handleEditProduct}
			/>
			<DeleteConfirmModal
				isOpen={isDeleteModalOpen}
				onClose={handleCloseDeleteModal}
				productTitle={selectedProduct?.title || ""}
				onDelete={() => handleDeleteProduct(selectedProduct?.id)}
			/>
		</div>
	);
};

export default AuthProducts;
