import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiAuth, authLogin } from "@/api/index.js";

const Login = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		mode: "onTouched",
	});

	const signIn = async (formData) => {
		try {
			const { token, expired } = await authLogin(formData);
			const expiryDate = new Date(expired).toUTCString();
			document.cookie = `hexToken=${token};expires=${expiryDate};path=/;`;
			apiAuth.defaults.headers.common.Authorization = `${token}`;
			navigate("/admin/products");
		} catch {
			alert("登入失敗，請再檢查一下帳密唷");
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<h2 className="text-center text-3xl title mb-8">請先登入</h2>
					<form className="space-y-6" onSubmit={handleSubmit(signIn)}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-600"
							>
								Email
							</label>
							<div className="mt-1">
								<input
									id="username"
									name="username"
									type="email"
									{...register("username", {
										required: {
											value: true,
											message: "請輸入 email",
										},
										pattern: {
											value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
											message: "Email 格式不正確",
										},
									})}
									autoComplete="email"
									className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary ${
										errors.username
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: ""
									}`}
								/>
								{errors.username && (
									<p className="mt-1 text-sm text-red-500">
										{errors?.username?.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-600"
							>
								密碼
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									{...register("password", {
										required: {
											value: true,
											message: "請輸入密碼",
										},
									})}
									autoComplete="current-password"
									className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary ${
										errors.password
											? "border-red-500 focus:ring-red-500 focus:border-red-500"
											: ""
									}`}
								/>
								{errors.password && (
									<p className="mt-1 text-sm text-red-500">
										{errors?.password?.message}
									</p>
								)}
							</div>
						</div>

						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
						>
							登入
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
