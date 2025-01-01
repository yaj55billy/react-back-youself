import PropTypes from "prop-types";

const HeroSection = ({ url, height, title, description }) => {
	return (
		<section
			className={`relative bg-cover bg-center ${height} before:absolute before:bg-black/50 before:w-full before:h-full`}
			style={{
				backgroundImage: `url(${url})`,
			}}
		>
			<div className="relative h-full flex items-center justify-center text-center">
				<div className="max-w-3xl px-4">
					<h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
					<p className="text-xl text-white/90">
						{description ? description : ""}
					</p>
				</div>
			</div>
		</section>
	);
};

HeroSection.propTypes = {
	url: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
};

export default HeroSection;
