import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import PropTypes from "prop-types";

const ProductModal = ({
	isOpen,
	onClose,
	mode,
	selectedData,
	onCreate,
	onEdit,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: selectedData?.title || "",
			category: selectedData?.category || "",
			unit: selectedData?.unit || "",
			origin_price: selectedData?.origin_price || "",
			price: selectedData?.price || "",
			description: selectedData?.description || "",
			content: selectedData?.content || "",
			is_enabled: selectedData?.is_enabled || false,
			imageUrl: selectedData?.imageUrl || "",
			imagesUrl: selectedData?.imagesUrl || [],
		},
		mode: "onTouched",
	});

	const images = watch("imagesUrl");
	const mainImage = watch("imageUrl");
	const [imageUrl, setImageUrl] = useState("");

	const handleAddImage = () => {
		if (imageUrl && images.length < 5) {
			const newImages = [...images, imageUrl];
			setValue("imagesUrl", newImages);
			if (!mainImage) setValue("imageUrl", imageUrl);
			setImageUrl("");
		}
	};

	const handleRemoveImage = (url) => {
		if (url === mainImage) {
			const remainingImages = images.filter((img) => img !== url);
			setValue("imageUrl", remainingImages[0] || "");
		}
		setValue(
			"imagesUrl",
			images.filter((img) => img !== url)
		);
	};

	const handleSetMainImage = (url) => {
		setValue("imageUrl", url);
	};

	const onSubmit = async (data) => {
		data.origin_price = Number(data.origin_price);
		data.price = Number(data.price);

		try {
			if (mode === "create") {
				await onCreate(data);
			} else if (mode === "edit") {
				await onEdit(data);
			}
			onClose(); // 關閉 Modal
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	useEffect(() => {
		if (isOpen) {
			reset({
				...selectedData,
				imagesUrl: selectedData?.imagesUrl || [],
				imageUrl: selectedData?.imageUrl || "",
			});
		}
	}, [isOpen, selectedData, reset]);

	const handleClose = () => {
		reset({
			title: "",
			category: "",
			unit: "",
			origin_price: "",
			price: "",
			description: "",
			content: "",
			is_enabled: false,
			imageUrl: "",
			imagesUrl: [],
		});

		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl title">
							{mode === "create" ? "新增產品" : "編輯產品"}
						</h2>
						<button
							onClick={handleClose}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						>
							<X className="w-6 h-6" />
						</button>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						{/* 圖片上傳區塊 */}
						<div className="space-y-4">
							{/* 主圖顯示 */}
							{mainImage && (
								<div className="relative">
									<img
										src={mainImage}
										alt="主圖"
										className="w-full h-64 object-cover rounded-lg"
									/>
									<button
										type="button"
										onClick={() => handleRemoveImage(mainImage)}
										className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
									>
										<X className="w-4 h-4" />
									</button>
								</div>
							)}

							{/* 圖片網址輸入 */}
							<div className="space-y-2">
								<label className="block text-sm title text-gray-600">
									圖片網址
								</label>
								<div className="flex gap-4">
									<div className="flex-1 relative">
										<input
											type="url"
											value={imageUrl}
											onChange={(e) => setImageUrl(e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
											placeholder="請輸入或貼上圖片網址"
										/>
									</div>
									<button
										type="button"
										onClick={handleAddImage}
										className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
										disabled={images.length >= 5 || !imageUrl}
									>
										新增
									</button>
								</div>
							</div>

							{/* 圖片預覽區 */}
							{images.length > 0 && (
								<div className="grid grid-cols-5 gap-2">
									{images.map((url, index) => (
										<div key={url + index} className="relative group">
											<img
												src={url}
												alt={`圖片 ${index + 1}`}
												className={`w-full h-20 object-cover rounded-lg cursor-pointer ${
													url === mainImage ? "ring-2 ring-primary" : ""
												}`}
												onClick={() => handleSetMainImage(url)}
											/>
											<button
												type="button"
												onClick={() => handleRemoveImage(url)}
												className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
											>
												<X className="w-3 h-3" />
											</button>
										</div>
									))}
								</div>
							)}
						</div>

						<div>
							<label
								className="block text-sm title text-gray-600 mb-1"
								htmlFor="title"
							>
								標題
							</label>
							<input
								type="text"
								name="title"
								id="title"
								{...register("title", {
									required: {
										value: true,
										message: "請輸入標題",
									},
								})}
								className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
									errors.title
										? "border-red-500 focus:ring-red-500 focus:border-red-500"
										: ""
								}`}
								placeholder="請輸入標題"
							/>
							{errors.title && (
								<p className="mt-1 text-sm text-red-500">
									{errors?.title?.message}
								</p>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									className="block text-sm title text-gray-600 mb-1"
									htmlFor="category"
								>
									分類
								</label>
								<input
									type="text"
									name="category"
									id="category"
									{...register("category", {
										required: {
											value: true,
											message: "請輸入分類",
										},
									})}
									className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
										errors.category
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: ""
									}`}
									placeholder="請輸入分類"
								/>
								{errors.category && (
									<p className="mt-1 text-sm text-red-500">
										{errors?.category?.message}
									</p>
								)}
							</div>
							<div>
								<label
									className="block text-sm title text-gray-700 mb-1"
									htmlFor="unit"
								>
									單位
								</label>
								<input
									type="text"
									name="unit"
									id="unit"
									{...register("unit", {
										required: {
											value: true,
											message: "請輸入單位",
										},
									})}
									className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
										errors.unit
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: ""
									}`}
									placeholder="請輸入單位"
								/>
								{errors.unit && (
									<p className="mt-1 text-sm text-red-500">
										{errors?.unit?.message}
									</p>
								)}
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									className="block text-sm title text-gray-600 mb-1"
									htmlFor="origin_price"
								>
									原價
								</label>
								<input
									type="number"
									name="origin_price"
									id="origin_price"
									{...register("origin_price", {
										required: "請輸入原價",
										min: { value: 0, message: "原價不能小於0" },
									})}
									className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
										errors.origin_price
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: ""
									}`}
									placeholder="請輸入原價"
								/>
								{errors.origin_price && (
									<p className="mt-1 text-sm text-red-500">
										{errors?.origin_price?.message}
									</p>
								)}
							</div>
							<div>
								<label
									className="block text-sm title text-gray-600 mb-1"
									htmlFor="price"
								>
									售價
								</label>
								<input
									type="number"
									name="price"
									id="price"
									{...register("price", {
										required: "請輸入售價",
										min: { value: 0, message: "售價不能小於0" },
										validate: (value, formValues) =>
											parseInt(value) <= parseInt(formValues.origin_price) ||
											"售價不能大於原價",
									})}
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
										errors.price
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: ""
									}`}
									placeholder="請輸入售價"
								/>
								{errors.price && (
									<p className="mt-1 text-sm text-red-500">
										{errors?.price?.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<label
								className="block text-sm title text-gray-600 mb-1"
								htmlFor="description"
							>
								產品描述
							</label>
							<textarea
								name="description"
								id="description"
								{...register("description", {
									required: {
										value: true,
										message: "請輸入產品描述",
									},
								})}
								className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
									errors.description
										? "border-red-500 focus:ring-red-500 focus:border-red-500"
										: ""
								}`}
								placeholder="請輸入產品描述"
								rows="3"
							/>
							{errors.description && (
								<p className="mt-1 text-sm text-red-500">
									{errors?.description?.message}
								</p>
							)}
						</div>

						<div>
							<label
								className="block text-sm title text-gray-600 mb-1"
								htmlFor="content"
							>
								說明內容
							</label>
							<textarea
								name="content"
								id="content"
								{...register("content", {
									required: {
										value: true,
										message: "請輸入說明內容",
									},
								})}
								className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
									errors.content
										? "border-red-500 focus:ring-red-500 focus:border-red-500"
										: ""
								}`}
								placeholder="請輸入說明內容"
								rows="3"
							/>
							{errors.content && (
								<p className="mt-1 text-sm text-red-500">
									{errors?.content?.message}
								</p>
							)}
						</div>

						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								name="is_enabled"
								id="is_enabled"
								{...register("is_enabled")}
								className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
							/>
							<label
								htmlFor="is_enabled"
								className="text-sm title text-gray-600"
							>
								是否啟用
							</label>
						</div>

						<div className="flex justify-end space-x-2 pt-4">
							<button
								type="button"
								onClick={handleClose}
								className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
							>
								取消
							</button>
							<button
								type="submit"
								className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
							>
								確認
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

ProductModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	mode: PropTypes.oneOf(["create", "edit"]).isRequired,
	selectedData: PropTypes.object,
	onCreate: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
};

export default ProductModal;
