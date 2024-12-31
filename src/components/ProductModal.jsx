import { useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { currency } from "@/utils/filter";

const ProductModal = ({ product, isOpen, onClose, onAddCart }) => {
	const [num, setNum] = useState(1);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg max-w-2xl w-full"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl title">產品名稱：{product.title}</h2>
						<button
							onClick={onClose}
							className="text-gray-600 hover:text-gray-700"
						>
							<X className="w-6 h-6" />
						</button>
					</div>

					<img
						src={product.imageUrl}
						alt={product.title}
						className="w-full h-64 object-cover rounded-lg mb-4"
					/>

					<div className="space-y-4">
						<div>
							<h3 className="font-semibold mb-2">產品內容：</h3>
							<p className="text">{product.description}</p>
						</div>

						<div>
							<h3 className="font-semibold mb-2">產品描述：</h3>
							<p className="text">{product.content}</p>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="text line-through">
									原價：${currency(product.origin_price)}
								</p>
								<p className="text-xl font-bold text-red-600">
									特價：${currency(product.price)}
								</p>
							</div>

							<div className="flex items-center gap-4">
								<div className="flex items-center border rounded">
									<input
										type="number"
										min="1"
										defaultValue={num}
										onChange={(e) => {
											setNum(Number(e.target.value));
										}}
										className="px-2 py-1 border rounded text-center"
									/>
								</div>
								<button
									type="button"
									onClick={() => {
										onAddCart(product.id, num);
										setNum(1);
										onClose();
									}}
									className="text-center border border-primary text-primary px-6 py-2 rounded transition-colors hover:bg-primary hover:text-white"
								>
									加入購物車
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ProductModal.propTypes = {
	product: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onAddCart: PropTypes.func.isRequired,
};

export default ProductModal;
