const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-primary-dark text-white">
			<div className="max-w-7xl mx-auto p-6">
				<p className="text-center text-gray-300">
					&copy; {currentYear} 返家之路.回歸自身 All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
