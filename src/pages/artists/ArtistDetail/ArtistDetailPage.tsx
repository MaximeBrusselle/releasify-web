import { useParams } from "react-router-dom";
import { ArtistDetail } from "../../../data/artists/artistTypes";
import { details } from "../../../data/artists/artistDetails";
import ArtistDetailInfo from "./ArtistDetailInfo";
import ReleaseCard from "../../../components/artistDetail/ReleaseCard";
import { useState } from "react";

const ArtistDetailPage = () => {
	const { artistId } = useParams<{ artistId: string }>();

	// Check if artistId exists before accessing details
	const artist: ArtistDetail | undefined = artistId ? details[artistId] : undefined;

	// If artistId doesn't exist or details[artistId] is undefined, handle the case accordingly
	if (!artistId || !artist) {
		return <div>No artist found for ID: {artistId}</div>;
	}

	const [following, setFollowing] = useState(false);
	const [notification, setNotification] = useState(false);

	const handleFollow = () => {
		setFollowing(!following);
	};

	const handleNotification = () => {
		setNotification(!notification);
	};

	const announcedReleases = artist.releases.filter((release) => release.releaseDate > new Date());
	const announcedSpacing = announcedReleases.length > 2 ? "justify-between" : " justify-start gap-x-4";
	const previousReleases = artist.releases.filter((release) => release.releaseDate <= new Date());
	const previousSpacing = previousReleases.length > 2 ? "justify-between" : " justify-start gap-x-4";

	return (
		<div className="flex flex-col items-center justify-start gap-[28px] font-[Fira Sans]">
			<ArtistDetailInfo artist={artist} following={following} notification={notification} handleFollow={handleFollow} handleNotification={handleNotification} />
			{/* Announced releases */}
			<div className="flex flex-col justify-start items-start w-[75vw]">
				<h2 className="text-[48px] font-extrabold">Announced Releases</h2>
				{announcedReleases.length === 0 && <p className="text-[24px]">No announced releases</p>}
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
				{previousReleases.length === 0 && <p className="text-[24px]">No previous releases</p>}
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

export default ArtistDetailPage;
