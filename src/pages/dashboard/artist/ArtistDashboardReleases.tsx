import { DetailInfo } from "@/components/dashboard/artist/releases/DetailInfo";
import { GeneralInfo } from "@/components/dashboard/artist/releases/GeneralInfo";
import { ReleaseData } from "@/components/dashboard/artist/releases/ReleaseData";
import { getLoginUserReleases } from "@/data/api/getLoginUserReleases";
import { ReleaseIndex } from "@/data/releases/releaseTypes";
// import { releases } from "@/data/releases/releases";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ArtistDashboardReleases = () => {
	const [releases, setReleases] = useState<ReleaseIndex[]>([]);
	const [selectedRow, setSelectedRow] = useState<ReleaseIndex | null>(null);

	useEffect(() => {
		async function getReleases() {
			try {
				const releasesFromArtist = await getLoginUserReleases();
				if (!releasesFromArtist) {
					throw new Error("No releases found");
				}
				setReleases(releasesFromArtist);
			} catch (error: any) {
				toast.error(error.message);
			}
		}
		getReleases();
	}, []);

	const handleSelectRow = (row?: ReleaseIndex) => {
		if (row) {
			setSelectedRow(row);
			return;
		}
		setSelectedRow(null);
	};
	const announcedAmount = releases.filter((release) => new Date(release.releaseDate) > new Date()).length;
	const releasedAmount = releases.filter((release) => new Date(release.releaseDate) <= new Date()).length;
	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
			<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
				<GeneralInfo announcedAmount={announcedAmount} releasedAmount={releasedAmount} />
				<ReleaseData handleSelectRow={handleSelectRow} selectedRow={selectedRow} releases={releases} />
			</div>
			<div>
				<DetailInfo selected={selectedRow} />
			</div>
		</main>
	);
};
export default ArtistDashboardReleases;
