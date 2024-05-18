"use client";
import { ReleaseIndex } from "@/data/releases/releaseTypes";
import { useState } from "react";
import { capitalizeFirstLetter, getImageUrl } from "@/lib/utils";
import notifplus from "@/assets/icon_bell_plus_black.svg";
import notifoff from "@/assets/icon_bell_off_black.svg";
import { useRef, useEffect } from "react";
import ReleaseCardArtistHover from "@/components/releases/ReleaseCardArtistHover";
import ReleaseCardLabelHover from "@/components/releases/ReleaseCardLabelHover";
import { useNavigate } from "react-router-dom";
import { formattedDateOptions } from "@/lib/formattedDateOptions";
import { handleSocialLinkClick } from "@/lib/utils";
import { ArtistDetail } from "@/data/artists/artistTypes";
import { LabelDetail } from "@/data/labels/labelTypes";

interface ReleaseCardProps {
	release: ReleaseIndex;
}

const ReleaseCard: React.FC<ReleaseCardProps> = (props: ReleaseCardProps) => {
	const navigate = useNavigate();
	const locale = window.navigator.language;

	const cardRef = useRef<HTMLDivElement>(null);
	const [fontSize, setFontSize] = useState<string>("4xl");

	const { release } = props;

	const [notification, setNotification] = useState(false);
	const handleNotification = (e: React.MouseEvent<HTMLImageElement>) => {
		e.stopPropagation();
		setNotification(!notification);
	};

	const isReleased = new Date(release.releaseDate) < new Date();
	const month = capitalizeFirstLetter(new Date(release.releaseDate).toDateString().split(" ")[1].toLocaleLowerCase(locale));

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

	const handleNavigate = () => {
		navigate(`/releases/${release.id}`);
	};

	return (
		<div className="sm:w-[640px] sm:h-[182px] rounded-2xl p-4 shadow-input bg-white dark:bg-black cursor-auto w-full h-fit hover:cursor-pointer" ref={cardRef} onClick={handleNavigate}>
			<div className="flex sm:flex-row flex-col items-center sm:justify-start justify-center w-full h-full gap-4">
				<div className="sm:flex flex-row justify-start items-center gap-2 w-full hidden">
					<img src={release.picture} alt={release.name} className="w-[148px] aspect-square border-[2px] border-solid border-black rounded-lg object-cover" />
					<div className="flex flex-col items-start justify-center h-full gap-y-2">
						<p className={`font-bold text-${fontSize}`}>{release.name}</p>
						{isReleased && <p className="text-md leading-4">📅 {new Date(release.releaseDate).toLocaleDateString(locale, formattedDateOptions)}</p>}
						<div className="flex flex-row flex-wrap justify-start items-center gap-x-1">
							{release.artists.map((artist) => {
								artist = artist as ArtistDetail;
								return <ReleaseCardArtistHover key={artist.id || `${artist.artistName}notfound`} artist={artist} />;
							})}
						</div>
						{release.label && <ReleaseCardLabelHover label={release.label as LabelDetail} />}
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-2 w-full sm:hidden">
					<p className="font-bold text-3xl text-center">{release.name}</p>
					<div className="flex flex-row justify-center items-center w-full gap-3">
						<img src={release.picture} alt={release.name} className="w-[148px] aspect-square border-[2px] border-solid border-black rounded-lg object-cover" />
						<div className="flex flex-col items-start justify-center h-full gap-y-2">
							{isReleased && <p className="text-md leading-4">📅 {new Date(release.releaseDate).toLocaleDateString(locale, formattedDateOptions)}</p>}
							<div className="flex flex-row flex-wrap justify-start items-center gap-x-1">
								{release.artists.map((artist) => {
									artist = artist as ArtistDetail;
									return <ReleaseCardArtistHover key={artist.id || `${artist.artistName}notfound`} artist={artist} />;
								})}
							</div>
							{release.label && <ReleaseCardLabelHover label={release.label as LabelDetail} />}
						</div>
					</div>
				</div>
				{(!isReleased || (isReleased && release.urls.length > 0)) && <span className="sm:block h-full w-px bg-black hidden"></span>}
				{isReleased && release.urls.length > 0 && (
					<div className="flex sm:flex-col flex-row items-center justify-center gap-4 sm:w-[20%] w-full m-2">
						<div className=" flex flex-row flex-wrap justify-center items-center gap-1">
							{release.urls.map((url) => (
								<button className="w-[30px] aspect-square sm:flex-releaseCardSocials hover:cursor-pointer" key={url.platform.name}>
									<img src={getImageUrl("socialplatforms", url.platform.logo)} alt={url.platform.name.toString()} onClick={(event) => handleSocialLinkClick(event, url.url)} />
								</button>
							))}
						</div>
					</div>
				)}
				{!isReleased && (
					<div className="flex sm:flex-col items-center justify-center gap-4 sm:w-[20%] w-[7.5%] m-2">
						<div className="flex sm:flex-col flex-row justify-center items-center text-center sm:gap-0 gap-2">
							<p className="text-4xl font-bold">{month}</p>
							<p className="text-3xl">{new Date(release.releaseDate).getDay() + 1}</p>
						</div>
						{notification ? (
							<img src={notifoff} alt="notif off" onClick={handleNotification} className="w-6 aspect-square" />
						) : (
							<img src={notifplus} alt="notif on" onClick={handleNotification} className="w-6 aspect-square" />
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ReleaseCard;
