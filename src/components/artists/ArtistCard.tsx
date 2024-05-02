import { ArtistIndex } from "../../data/artists/artistTypes";
import { useState } from "react";
import { getImageUrl } from "../../lib/utils";
import notifPlus from "../../assets/icon_bell_plus.svg";
import notifOff from "../../assets/icon_bell_off.svg";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ArtistCardProps {
	artist: ArtistIndex;
}

const ArtistCard: React.FC<ArtistCardProps> = (props: ArtistCardProps) => {
	const navigate = useNavigate();

	const cardRef = useRef<HTMLDivElement>(null);
	const [fontSize, setFontSize] = useState<string>("4xl");

	const { artist } = props;
	const [following, setFollowing] = useState(false);
	const [notification, setNotification] = useState(false);

	const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setFollowing(!following);
	};

	const handleNotification = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setNotification(!notification);
	};

	const handleNavigate = () => {
		if (artist.id && artist.id !== "") {
			navigate(`/artists/${artist.id}`);
		}
	};

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
		<div className="sm:w-[640px] sm:h-[182px] rounded-2xl p-4 shadow-input bg-white dark:bg-black cursor-auto w-full h-fit" ref={cardRef} onClick={handleNavigate}>
			<div className="flex sm:flex-row flex-col items-center sm:justify-start justify-center w-full h-full gap-4">
				<div className="flex flex-row sm:justify-start justify-center items-center gap-2 w-full">
					<img
						src={getImageUrl("artists", artist.profilePicture)}
						alt={artist.artistName}
						className="w-[148px] aspect-square border-[4px] border-solid border-black rounded-lg object-cover"
					/>
					<div className="flex flex-col items-start justify-center h-full">
						<p className={`font-bold text-${fontSize}`}>{artist.artistName}</p>
						<p className="text-md">{artist.description}</p>
						<div className="flex flex-row gap-2 justify-start items-center">
							{following ? (
								<button className="px-4 py-2 bg-[#f00] rounded-[12px] text-white" onClick={handleFollow}>
									Unfollow
								</button>
							) : (
								<button className="px-4 py-2 bg-[#1ED760] rounded-[12px] text-white" onClick={handleFollow}>
									Follow
								</button>
							)}

							<button className="p-2 bg-black rounded-[12px]" onClick={handleNotification}>
								{notification ? <img src={notifOff} alt="hasNotif" /> : <img src={notifPlus} alt="hasNoNotif" />}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArtistCard;
