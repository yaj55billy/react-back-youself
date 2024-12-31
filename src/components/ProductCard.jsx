import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { currency } from "@/utils/filter";

const ProductCard = ({ product, onViewMore, onAddCart, loadingCartId }) => {
	return (
		<div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
			<img
				src={product.imageUrl}
				alt={product.title}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<h3 className="text-lg title mb-2">{product.title}</h3>
				<div className="flex justify-between items-center mb-4">
					<div>
						<p className="text line-through">
							原價：${currency(product.origin_price)}
						</p>
						<p className="text-xl font-bold text-red-600">
							特價：${currency(product.price)}
						</p>
					</div>
				</div>
				<div className="flex justify-between gap-2">
					<button
						type="button"
						onClick={() => onViewMore(product)}
						className="flex-1 px-4 py-2 border border-gray-300 text rounded transition-colors hover:bg-gray-300"
					>
						查看更多
					</button>
					<button
						type="button"
						onClick={() => onAddCart(product.id, 1)}
						disabled={loadingCartId === product.id}
						className="flex flex-1 justify-center px-4 py-2 border border-primary text-primary rounded transition-colors hover:bg-primary hover:text-white "
					>
						{loadingCartId === product.id ? (
							<ReactLoading
								type="spin"
								color="#3A5A80"
								height={20}
								width={20}
							/>
						) : (
							"加入購物車"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

ProductCard.propTypes = {
	product: PropTypes.object.isRequired,
	onViewMore: PropTypes.func.isRequired,
	onAddCart: PropTypes.func.isRequired,
	loadingCartId: PropTypes.string,
};

export default ProductCard;
