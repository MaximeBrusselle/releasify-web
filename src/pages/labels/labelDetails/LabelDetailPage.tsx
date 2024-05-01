import { useParams } from "react-router-dom";
import { LabelDetail } from "../../../data/labels/labelTypes";
import LabelDetailInfo from "./LabelDetailInfo";
import ReleaseCard from "../../../components/releases/ReleaseCard";
import { useState } from "react";
import { labelDetails } from "@/data/labels/labelDetails";
import ArtistCard from "@/components/artists/ArtistCard";

const LabelDetailPage = () => {
	const { labelId } = useParams<{ labelId: string }>();

	const label: LabelDetail | undefined = labelId ? labelDetails[labelId] : undefined;
	if (!labelId || !label) {
		return <div>No Label Found For ID: {labelId}</div>;
	}

	const [following, setFollowing] = useState(false);
	const [notification, setNotification] = useState(false);

	const handleFollow = () => {
		setFollowing(!following);
	};

	const handleNotification = () => {
		setNotification(!notification);
	};

	const announcedReleases = label.releases.filter((release) => release.releaseDate > new Date());
	const announcedSpacing = announcedReleases.length > 2 ? "justify-between" : " justify-start gap-x-4";
	const previousReleases = label.releases.filter((release) => release.releaseDate <= new Date());
	const previousSpacing = previousReleases.length > 2 ? "justify-between" : " justify-start gap-x-4";

	return (
		<div className="flex flex-col items-center justify-start gap-[28px] font-[Fira Sans]">
			<LabelDetailInfo label={label} following={following} notification={notification} handleFollow={handleFollow} handleNotification={handleNotification} />
			{/* Artists */}
			<div className="flex flex-col justify-start items-start w-[75vw]">
				<h2 className="text-[48px] font-extrabold">Artists</h2>
				{label.artists.length === 0 && <p className="text-[24px]">No Artists On This Label</p>}
				{label.artists.length > 0 && (
					<div className={`flex flex-row flex-wrap ${announcedSpacing} items-center w-full gap-y-6`}>
						{label.artists.map((artist) => (
							<ArtistCard key={artist.id && artist.id !== "" ? artist.id : `${artist.artistName}notfound`} artist={artist} />
						))}
					</div>
				)}
			</div>
			{/* Announced releases */}
			<div className="flex flex-col justify-start items-start w-[75vw]">
				<h2 className="text-[48px] font-extrabold">Announced Releases</h2>
				{announcedReleases.length === 0 && <p className="text-[24px]">No Announced Releases</p>}
				{announcedReleases.length > 0 && (
					<div className={`flex flex-row flex-wrap ${announcedSpacing} items-center w-full gap-y-6`}>
						{announcedReleases.map((release) => (
							<ReleaseCard key={release.id} release={release} />
						))}
					</div>
				)}
			</div>
			{/* Previous releases */}
			<div className="flex flex-col justify-start items-start w-[75vw]">
				<h2 className="text-[48px] font-extrabold">Previous Releases</h2>
				{previousReleases.length === 0 && <p className="text-[24px]">No Previous Releases</p>}
				{previousReleases.length > 0 && (
					<div className={`flex flex-row flex-wrap ${previousSpacing} items-center w-full gap-y-6`}>
						{previousReleases.map((release) => (
							<ReleaseCard key={release.id} release={release} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default LabelDetailPage;
