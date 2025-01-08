import { useSelector, useDispatch } from "react-redux";
import { CheckCircle, XCircle, X } from "lucide-react";
import { removeMessageToast } from "@/slice/messageToastSlice";

const MessageToast = () => {
	const messages = useSelector((state) => state.message);
	const dispatch = useDispatch();

	return (
		<div className="fixed top-16 right-4 z-[120] space-y-2">
			{messages?.map((msg) => (
				<div
					key={msg.id}
					className={`
            min-w-[320px] p-4 rounded-lg shadow-lg flex items-start space-x-3
            ${
							msg.type === "success"
								? "bg-green-50 border border-green-100"
								: "bg-red-50 border border-red-100"
						}
          `}
				>
					{msg.type === "success" ? (
						<CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
					) : (
						<XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
					)}

					<div className="flex-1">
						<h3
							className={`text-base font-medium ${
								msg.type === "success" ? "text-green-800" : "text-red-800"
							}`}
						>
							{msg.title}
						</h3>
						<p
							className={`text-sm mt-1 ${
								msg.type === "success" ? "text-green-700" : "text-red-700"
							}`}
						>
							{msg.content}
						</p>
					</div>

					<button
						onClick={() => dispatch(removeMessageToast(msg.id))}
						className={`flex-shrink-0 p-0.5 rounded-md hover:bg-white transition-colors
              ${
								msg.type === "success"
									? "text-green-500 hover:text-green-700"
									: "text-red-500 hover:text-red-700"
							}
            `}
					>
						<X className="w-5 h-5" />
					</button>
				</div>
			))}
		</div>
	);
};

export default MessageToast;
