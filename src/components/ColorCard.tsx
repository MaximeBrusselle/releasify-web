import React from "react";

interface ColorCardProps {
	title: string;
	imageUrl: string;
	selected: boolean;
	index: number;
	selectCard: (index: number) => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ title, imageUrl, selected, index, selectCard }) => {
	const handleClick = () => {
		selectCard(index);
	};

	return (
		<div className="group relative w-64 h-40 overflow-hidden shadow-lg cursor-pointer" onClick={handleClick}>
			<img src={imageUrl} alt={title} className={`object-cover w-full h-full transition duration-100 ease-in group-hover:grayscale-0 ${selected ? "" : "grayscale"}`} />
			<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-100 ease-in">
				<span className="text-white text-lg font-semibold opacity-100">{title}</span>
			</div>
		</div>
	);
};

export default ColorCard;
