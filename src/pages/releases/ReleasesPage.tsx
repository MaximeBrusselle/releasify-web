"use client";
import ReleaseCard from "@/components/releases/ReleaseCard";
import { releases } from "@/data/releases/releases";

const ReleasesPage: React.FC = () => {
	const announcedReleases = releases.filter((release) => new Date(release.releaseDate) > new Date()).sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime());
  const previousReleases = releases.filter((release) => new Date(release.releaseDate) <= new Date()).sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());

	return (
		<div className="flex flex-col items-center justify-start gap-[28px] font-[Fira Sans] w-full">

			<div className="flex flex-col justify-start sm:items-start items-center xl:w-[75vw] lg:w-[80vw] md:w-[85vw] w-[90vw]">
				<h2 className="text-[48px] font-extrabold text-center">Announced Releases</h2>
				{announcedReleases.length === 0 && <p className="text-[24px] text-center">No announced releases</p>}
				{announcedReleases.length > 0 && (
					<div className="flex flex-row flex-wrap justify-between items-center w-full gap-y-6">
						{announcedReleases.map((release) => (
							<ReleaseCard key={release.id} release={release} />
						))}
					</div>
				)}
			</div>
			<div className="flex flex-col justify-start sm:items-start items-center xl:w-[75vw] lg:w-[80vw] md:w-[85vw] w-[90vw]">
				<h2 className="text-[48px] font-extrabold text-center">Previous Releases</h2>
				{previousReleases.length === 0 && <p className="text-[24px] text-center">No previous releases</p>}
				{previousReleases.length > 0 && (
					<div className="flex flex-row flex-wrap justify-between items-center w-full gap-y-6">
						{previousReleases.map((release) => (
							<ReleaseCard key={release.id} release={release} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ReleasesPage;
