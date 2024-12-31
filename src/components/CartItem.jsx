import PropTypes from "prop-types";
import { currency } from "@/utils/filter";

const CartItem = ({ item, onUpdateCart, onDeleteCart }) => {
	return (
		<tr className="hover:bg-gray-50">
			<td className="px-4 py-2">
				<button
					type="button"
					className="text-red-500 hover:text-red-600"
					onClick={() => onDeleteCart(item.id)}
				>
					刪除
				</button>
			</td>
			<td className="px-4 py-2">
				<div className="flex items-center gap-4">
					<img
						src={item?.product?.imageUrl}
						alt={item?.product?.title}
						className="hidden sm:block w-16 h-16 object-cover rounded"
					/>
					<span className="title">{item?.product?.title}</span>
				</div>
			</td>
			<td className="px-4 py-2">
				<div className="flex justify-center">
					<input
						type="number"
						min="1"
						value={item.qty}
						onChange={(e) => {
							onUpdateCart(item.product_id, Number(e.target.value), item.id);
						}}
						className="px-2 py-1 border rounded text-center"
					/>
				</div>
			</td>
			<td className="px-4 py-2 text-right font-medium">
				${currency(item.final_total)}
			</td>
		</tr>
	);
};

CartItem.propTypes = {
	item: PropTypes.object.isRequired,
	onUpdateCart: PropTypes.func.isRequired,
	onDeleteCart: PropTypes.func.isRequired,
};

export default CartItem;
