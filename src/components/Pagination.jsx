import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

const Pagination = ({ pagination, changePage }) => {
	return (
		<div className="flex items-center justify-center mt-4">
			<div className="flex items-center space-x-2">
				<button
					type="button"
					onClick={() => changePage(pagination.current_page - 1)}
					disabled={pagination.has_pre === false}
					className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
				>
					<ChevronLeft className="w-5 h-5" />
				</button>

				{Array.from({ length: pagination.total_pages }, (_, index) => (
					<button
						type="button"
						onClick={() => changePage(index + 1)}
						key={`${index + 1}page`}
						className={`px-3 py-2 rounded-lg transition-colors ${
							pagination.current_page === index + 1
								? "bg-primary text-white"
								: "hover:bg-gray-100"
						}`}
					>
						{index + 1}
					</button>
				))}

				<button
					type="button"
					onClick={() => changePage(pagination.current_page + 1)}
					disabled={pagination.has_next === false}
					className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
				>
					<ChevronRight className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
};

Pagination.propTypes = {
	pagination: PropTypes.shape({
		total_pages: PropTypes.number,
		current_page: PropTypes.number,
		has_pre: PropTypes.bool,
		has_next: PropTypes.bool,
	}).isRequired,
	changePage: PropTypes.func.isRequired,
};

export default Pagination;
