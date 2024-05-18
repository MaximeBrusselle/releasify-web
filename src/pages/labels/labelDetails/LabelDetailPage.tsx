import { useParams } from "react-router-dom";
import { LabelDetail } from "@/data/labels/labelTypes";
import LabelDetailInfo from "@/pages/labels/labelDetails/LabelDetailInfo";
import ReleaseCard from "@/components/releases/ReleaseCard";
import { useEffect, useRef, useState } from "react";
import ArtistCard from "@/components/artists/ArtistCard";
import { getLabelById } from "@/data/api/label/getLabelById";
import toast from "react-hot-toast";

const LabelDetailPage: React.FC = () => {
	const initialized = useRef(false);
	const { labelId } = useParams<{ labelId: string }>();
	const [label, setLabel] = useState<LabelDetail>();

	// Check if artistId exists before accessing details
	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;
			async function fetchData() {
				const fetchedLabel = await getLabelById(labelId!);
				setLabel(fetchedLabel);
			}
			if (labelId) {
				toast.promise(fetchData(), {
					loading: "Fetching label...",
					success: "Label fetched",
					error: "Error fetching label",
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

	const announcedReleases = label ? label.releases.filter((release) => new Date(release.releaseDate) > new Date()).sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime()) : [];
	const announcedSpacing = announcedReleases.length > 2 ? "justify-between" : "justify-start gap-x-4";
	const previousReleases = label ? label.releases.filter((release) => new Date(release.releaseDate) <= new Date()).sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime()) : [];
	const previousSpacing = previousReleases.length > 2 ? "justify-between" : "justify-start gap-x-4";

	const sortedArtists = label ? label.artists.sort((a, b) => a.artistName.localeCompare(b.artistName)) : [];

	return (
		<div className="flex flex-col items-center justify-start gap-[28px] font-[Fira Sans]">
			{label && <LabelDetailInfo label={label} following={following} notification={notification} handleFollow={handleFollow} handleNotification={handleNotification} />}
			{/* Artists */}
			<div className="flex flex-col justify-start sm:items-start items-center xl:w-[75vw] lg:w-[80vw] md:w-[85vw] w-[90vw]">
				<h2 className="text-[48px] font-extrabold text-center">Artists</h2>
				{sortedArtists.length === 0 && <p className="text-[24px] text-center">No Artists On This Label</p>}
				{sortedArtists.length > 0 && (
					<div className={`flex flex-row flex-wrap sm:${announcedSpacing} justify-center items-center w-full gap-y-6`}>
						{sortedArtists.map((artist) => (
							<ArtistCard key={artist.id && artist.id !== "" ? artist.id : `${artist.artistName}notfound`} artist={artist} />
						))}
					</div>
				)}
			</div>
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

export default LabelDetailPage;
