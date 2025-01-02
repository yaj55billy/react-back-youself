import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { currency } from "@/utils/filter";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddCart, loadingCartId }) => {
	return (
		<div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
			<img
				src={product.imageUrl}
				alt={product.title}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<h3 className="text-lg font-semibold mb-2">{product.title}</h3>
				<p className="text text-sm mb-3 line-clamp-3">{product.description}</p>
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm text-gray-500 line-through">
							原價：${currency(product.origin_price)}
						</p>
						<p className="text-red-600 font-semibold">
							特價：${currency(product.price)}
						</p>
					</div>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onAddCart(product.id, 1);
						}}
						disabled={loadingCartId === product.id}
						className="relative z-20 px-4 py-2 border border-primary text-primary rounded transition-colors hover:bg-primary hover:text-white"
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
			<Link
				to={`/products/${product.id}`}
				className="absolute inset-0 z-10"
			></Link>
		</div>
	);
};

ProductCard.propTypes = {
	product: PropTypes.object.isRequired,
	onAddCart: PropTypes.func.isRequired,
	loadingCartId: PropTypes.string,
};

export default ProductCard;
