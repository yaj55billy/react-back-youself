import { useState } from "react";
import { Upload, Copy, Check, AlertCircle } from "lucide-react";
import { authUploadImage } from "@/api/index.js";

const AuthImageUpload = () => {
	const [uploadedImage, setUploadedImage] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState("");
	const [copied, setCopied] = useState(false);

	const handleFileChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// 檢查檔案格式
		const validTypes = ["image/jpeg", "image/jpg", "image/png"];
		if (!validTypes.includes(file.type)) {
			setError("只接受 JPG、JPEG 或 PNG 格式的圖片");
			return;
		}

		// 檢查檔案大小 (3MB = 3 * 1024 * 1024 bytes)
		if (file.size > 3 * 1024 * 1024) {
			setError("圖片大小不能超過 3MB");
			return;
		}

		setError("");
		setIsUploading(true);

		try {
			const formData = new FormData();
			formData.append("file-to-upload", file);
			console.log(await formData.get("file-to-upload"));

			const response = await authUploadImage(formData);
			setUploadedImage(response.imageUrl);
		} catch (error) {
			setError("上傳圖片時發生錯誤，請稍後再試");
			console.error("Upload error:", error);
		} finally {
			setIsUploading(false);
		}
	};

	const copyImageUrl = async () => {
		try {
			await navigator.clipboard.writeText(uploadedImage);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<div className="p-6 min-h-screen bg-gray-100">
			<div className="max-w-2xl mx-auto">
				<h2 className="text-2xl title mb-6">圖片上傳</h2>

				{/* 上傳區域 */}
				<div className="bg-white p-6 rounded-lg shadow-sm mb-6">
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
						<input
							type="file"
							accept=".jpg,.jpeg,.png"
							onChange={handleFileChange}
							className="hidden"
							id="fileInput"
							disabled={isUploading}
						/>
						<label
							htmlFor="fileInput"
							className="cursor-pointer flex flex-col items-center"
						>
							<Upload className="w-12 h-12 text-gray-400 mb-2" />
							<span className="text mb-1">
								{isUploading ? "上傳中..." : "點擊或拖曳檔案至此處上傳"}
							</span>
							<span className="text-sm text-gray-400">
								支援 JPG、JPEG、PNG 格式，檔案大小限制 3MB 以下
							</span>
						</label>
					</div>

					{/* 錯誤訊息 */}
					{error && (
						<div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center">
							<AlertCircle className="w-5 h-5 mr-2" />
							{error}
						</div>
					)}
				</div>

				{/* 預覽區域 */}
				{uploadedImage && (
					<div className="bg-white p-6 rounded-lg shadow-sm">
						<h3 className="text-lg title mb-4">已上傳的圖片</h3>
						<div className="space-y-4">
							<img
								src={uploadedImage}
								alt="Uploaded preview"
								className="w-full h-auto rounded-lg"
							/>
							<div className="flex items-center gap-2">
								<input
									type="text"
									value={uploadedImage}
									readOnly
									className="flex-1 p-2 border rounded-lg bg-gray-50"
								/>
								<button
									onClick={copyImageUrl}
									className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
								>
									{copied ? (
										<>
											<Check className="w-4 h-4" />
											已複製
										</>
									) : (
										<>
											<Copy className="w-4 h-4" />
											複製網址
										</>
									)}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AuthImageUpload;
