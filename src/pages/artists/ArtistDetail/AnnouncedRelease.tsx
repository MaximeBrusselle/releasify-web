import { ReleaseShort } from "../types";
import { useState } from "react";
import { getImageUrl } from "../../../lib/utils";
import notifplus from "../../../assets/icon_bell_plus_black.svg";
import notifoff from "../../../assets/icon_bell_off_black.svg";

interface AnnouncedReleaseProps {
	release: ReleaseShort;
}

const announcedRelease = (props: AnnouncedReleaseProps) => {
	const { release } = props;
	const [notification, setNotification] = useState(false);
	const handleNotification = () => {
		setNotification(!notification);
	};

	const month = release.releaseDate.toDateString().split(" ")[1];

	return (
		<div className="w-[670px] h-[182px] rounded-none md:rounded-2xl p-4 shadow-input bg-white dark:bg-black">
			<div className="flex flex-row items-center justify-between w-full h-full gap-4">
				<img src={getImageUrl("releases", release.picture)} alt={release.name} className="w-[148px] aspect-square border-[2px] border-solid border-black rounded-lg" />
				<div className="flex flex-col items-start justify-center">
					<p className="font-bold text-4xl">{release.name}</p>
					<div className="flex flex-row flex-wrap justify-start items-center">
						{release.artists.map((artist) => (
							<div className="flex flex-row justify-center items-center gap-1" key={artist.id}>
								<img src={getImageUrl("artists", artist.picture)} alt={artist.name} className="w-[16px] aspect-square rounded-full border-1 border-black border-solid" />
								<p className="text-[16px]">{artist.name}</p>
							</div>
						))}
					</div>
					<div className="flex flex-row justify-center items-center gap-3">
						<img src={getImageUrl("labels", release.label.picture)} alt={release.label.name} className="w-[43px] rounded-md aspect-square" />
						<p className="font-semibold text-lg">{release.label.name}</p>
					</div>
				</div>

				<span className="block h-full w-px bg-black"></span>

				<div className="flex flex-col justify-center items-center">
					<p className="text-4xl font-bold">{month}</p>
					<p className="text-3xl">{release.releaseDate.getDay()}</p>
				</div>

				{notification ? <img src={notifoff} alt="notif off" onClick={handleNotification} className="w-6 aspect-square" /> : <img src={notifplus} alt="notif on" onClick={handleNotification} />}
			</div>
		</div>
	);
};

export default announcedRelease;
