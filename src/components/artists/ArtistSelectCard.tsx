import { useState } from "react";
import { getImageUrl } from "@/lib/utils";
import { useRef, useEffect } from "react";
import { ArtistIndex } from "@/data/artists/artistTypes";

interface LabelSelectCardProps {
	artist: ArtistIndex;
	handleSelect: (artist: ArtistIndex) => void;
	selectedIds: string[];
}

const LabelSelectCard: React.FC<LabelSelectCardProps> = (props: LabelSelectCardProps) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [fontSize, setFontSize] = useState<string>("4xl");

	const { artist, handleSelect, selectedIds } = props;

	useEffect(() => {
		if (window.innerWidth < 640) setFontSize("3xl");

		const card = cardRef.current;
		if (!card) return;

		const container = card.querySelector("div");
		if (!container) return;

		const contentcontainer = container.querySelector("div");
		if (!contentcontainer) return;

		const content = contentcontainer.querySelector("div");
		if (!content) return;

		const contentHeight = content.offsetHeight;
		const cardHeight = card.offsetHeight;
		if (contentHeight > cardHeight) {
			const scale = cardHeight / contentHeight;
			const currentScale = parseInt(fontSize.split("xl")[0]);
			const computedScale = currentScale * scale;
			if (scale < 0.5) {
				setFontSize("md");
			} else if (scale < 0.75) {
				setFontSize("lg");
			} else {
				const newSize = Math.floor(computedScale) - 1;
				if (newSize > 1) {
					setFontSize(`${newSize}xl`);
				} else {
					setFontSize("lg");
				}
			}
		}
	}, []);

	return (
		<div className={`rounded-2xl p-4 shadow-input ${selectedIds.includes(artist.id!) ? "bg-slate-400" : "bg-white"} dark:bg-black hover:cursor-pointer w-full h-fit`} ref={cardRef} onClick={(_) => handleSelect(artist)}>
			<div className="flex sm:flex-row flex-col items-center sm:justify-start justify-center w-full h-full gap-4">
				<div className="flex flex-col justify-center items-center gap-2 w-full">
					<img src={getImageUrl("artists", artist.profilePicture)} alt={artist.artistName} className="w-[148px] aspect-square border-[4px] border-solid border-black rounded-lg object-cover" />
					<div className="flex flex-col items-center justify-center h-full">
						<p className={`font-bold text-${fontSize} text-center`}>{artist.artistName}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LabelSelectCard;
