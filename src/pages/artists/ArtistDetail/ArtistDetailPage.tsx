import { useParams } from "react-router-dom";
import { ArtistDetail } from "@/data/artists/artistTypes";
import ReleaseCard from "@/components/releases/ReleaseCard";
import { useEffect, useRef, useState } from "react";
import ArtistDetailInfo from "@/pages/artists/artistDetail/ArtistDetailInfo";
import { getArtistById } from "@/data/api/artist/getArtistById";
import toast from "react-hot-toast";

const ArtistDetailPage: React.FC = () => {
	const initialized = useRef(false);
	const { artistId } = useParams<{ artistId: string }>();
	const [artist, setArtist] = useState<ArtistDetail | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	// Check if artistId exists before accessing details
	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;
			async function fetchData() {
				try {
					const fetchedArtist = await getArtistById(artistId!);
					if ("code" in fetchedArtist) {
						setError(true);
						throw new Error(fetchedArtist.message);
					}
					setArtist(fetchedArtist);
					setLoading(false);
				} catch (error: any) {
					setError(true);
					console.log(error.message);
					throw new Error(error.message);
				}
			}
			if (loading && !error && artistId) {
				toast.promise(fetchData(), {
					loading: "Fetching artist...",
					success: "Artist fetched",
					error: "Error fetching artist",
				});
			}
		}
	}, []);

	const [following, setFollowing] = useState(false);
	const [notification, setNotification] = useState(false);

	const handleFollow = () => {
		setFollowing(!following);
	};

	const handleNotification = () => {
		setNotification(!notification);
	};

	const announcedReleases = artist ? artist.releases.filter((release) => new Date(release.releaseDate) > new Date()) : [];
	const announcedSpacing = announcedReleases.length > 2 ? "justify-between" : "justify-start gap-x-4";
	const previousReleases = artist ? artist.releases.filter((release) => new Date(release.releaseDate) <= new Date()) : [];
	const previousSpacing = previousReleases.length > 2 ? "justify-between" : "justify-start gap-x-4";

	return (
		<div className="flex flex-col items-center justify-start gap-[28px] font-[Fira Sans]">
			{artist && <ArtistDetailInfo artist={artist} following={following} notification={notification} handleFollow={handleFollow} handleNotification={handleNotification} />}
			{/* Announced releases */}
			<div className="flex flex-col justify-start sm:items-start items-center xl:w-[75vw] lg:w-[80vw] md:w-[85vw] w-[90vw]">
				<h2 className="text-[48px] font-extrabold text-center">Announced Releases</h2>
				{announcedReleases.length === 0 && <p className="text-[24px] text-center">No announced releases</p>}
				{announcedReleases.length > 0 && (
					<div className={`flex flex-row flex-wrap sm:${announcedSpacing} justify-center items-center w-full gap-y-6`}>
						{announcedReleases.map((release) => (
							<ReleaseCard key={release.id} release={release} />
						))}
					</div>
				)}
			</div>
			{/* Previous releases */}
			<div className="flex flex-col justify-start sm:items-start items-center xl:w-[75vw] lg:w-[80vw] md:w-[85vw] w-[90vw]">
				<h2 className="text-[48px] font-extrabold text-center">Previous Releases</h2>
				{previousReleases.length === 0 && <p className="text-[24px] text-center">No previous releases</p>}
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
