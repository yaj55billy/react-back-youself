import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

const Loading = () => {
	const isLoading = useSelector((state) => state.loader.isLoading);

	return (
		<>
			{isLoading && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
					<ReactLoading type="spin" color="#fafafa" height={50} width={50} />
				</div>
			)}
		</>
	);
};

export default Loading;
