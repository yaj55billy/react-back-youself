import PropTypes from "prop-types";
import { X } from "lucide-react";

const DeleteConfirmModal = ({ isOpen, onClose, onDelete, productTitle }) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg w-full max-w-md m-4"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl title">刪除產品</h2>
						<button
							onClick={onClose}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					<p className="text-gray-600 mb-6">
						確定要刪除「{productTitle}」嗎？此操作無法復原。
					</p>

					<div className="flex justify-end space-x-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
						>
							取消
						</button>
						<button
							type="button"
							className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
							onClick={onDelete}
						>
							刪除
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

DeleteConfirmModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	productTitle: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default DeleteConfirmModal;
