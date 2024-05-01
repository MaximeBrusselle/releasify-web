import { ReleaseShort } from "../../pages/artists/types";
import { useState } from "react";
import { getImageUrl } from "../../lib/utils";
import notifplus from "../../assets/icon_bell_plus_black.svg";
import notifoff from "../../assets/icon_bell_off_black.svg";
import { useRef, useEffect } from "react";
import ReleaseCardArtistHover from "./ReleaseCardArtistHover";
import ReleaseCardLabelHover from "./ReleaseCardLabelHover";


interface ReleaseCardProps {
	release: ReleaseShort;
}

const ReleaseCard = (props: ReleaseCardProps) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [fontSize, setFontSize] = useState<string>("4xl");

	const { release } = props;
	const [notification, setNotification] = useState(false);
	const handleNotification = () => {
		setNotification(!notification);
	};

	const isReleased = release.releaseDate < new Date();

	const month = release.releaseDate.toDateString().split(" ")[1];

	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		const container = card.querySelector("div");
		if (!container) return;

		const contentcontainer = container.querySelector("div");
		if (!contentcontainer) return;

		const content = contentcontainer.querySelector("div");
		if (!content) return;

		const inner = content.querySelector("p")?.innerHTML;

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
				const newSize = Math.floor(computedScale)-1;
				if (newSize > 1) {
					setFontSize(`${newSize}xl`);
				} else {
					setFontSize("lg");
				}
			}
		}
	}, []);

	return (
		<div className="w-[640px] h-[182px] rounded-none md:rounded-2xl p-4 shadow-input bg-white dark:bg-black cursor-auto" ref={cardRef}>
			<div className="flex flex-row items-center justify-start w-full h-full gap-4">
				<div className="flex flex-row justify-start items-center gap-2 w-full">
					<img src={getImageUrl("releases", release.picture)} alt={release.name} className="w-[148px] aspect-square border-[2px] border-solid border-black rounded-lg" />
					<div className="flex flex-col items-start justify-center h-full">
						<p className={`font-bold text-${fontSize}`}>{release.name}</p>
						<div className="flex flex-row flex-wrap justify-start items-center gap-x-1">
							{release.artists.map((artist) => (
								<ReleaseCardArtistHover key={artist.id || `${artist.name}notfound`} artist={artist} />
							))}
						</div>
						<ReleaseCardLabelHover label={release.label} />
					</div>
				</div>

				<span className="block h-full w-px bg-black"></span>

				{isReleased ? (
					<div className="flex flex-col items-center justify-center gap-4 w-[20%] m-2">
						<div className=" flex flex-wrap justify-center items-center gap-1">
							{release.urls.map((url) => (
								<a key={url.platform.name} href={url.url} target="_blank" rel="noreferrer" className="flex-releaseCardSocials hover:cursor-pointer">
									<img src={getImageUrl("socialplatforms", url.platform.logo)} alt={url.platform.name.toString()} className="aspect-square hover:cursor-pointer" />
								</a>
							))}
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center gap-4 w-[20%] m-2">
						<div className="flex flex-col justify-center items-center">
							<p className="text-4xl font-bold">{month}</p>
							<p className="text-3xl">{release.releaseDate.getDay()}</p>
						</div>
						{notification ? (
							<img src={notifoff} alt="notif off" onClick={handleNotification} className="w-6 aspect-square" />
						) : (
							<img src={notifplus} alt="notif on" onClick={handleNotification} />
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ReleaseCard;
