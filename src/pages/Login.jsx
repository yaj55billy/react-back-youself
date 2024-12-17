
import PropTypes from 'prop-types';
const Login = ({ formData, setFormData, signIn }) => {
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<h2 className="text-center text-3xl title mb-8">
						請先登入 Week3
					</h2>
					<form className="space-y-6" onSubmit={ signIn }>
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
                  value={formData.username} 
                  onChange={handleChange} 
									autoComplete="email"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
								/>
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
                  value={formData.password} 
                  onChange={handleChange} 
									autoComplete="current-password"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
								/>
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
  )
};

Login.propTypes = {
  formData: PropTypes.shape({
    username: PropTypes.string.isRequired, 
    password: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

export default Login;

