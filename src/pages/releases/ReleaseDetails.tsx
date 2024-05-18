import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getReleaseById } from "@/data/api/release/getReleaseById";
import { ReleaseIndex } from "@/data/releases/releaseTypes";
import { formattedDateOptions } from "@/lib/formattedDateOptions";
import { getImageUrl } from "@/lib/utils";
import { DocumentReference } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export const ReleaseDetails = () => {
	let initialize = useRef(false);
	const { releaseId } = useParams<{ releaseId: string }>();
	const [release, setRelease] = useState<ReleaseIndex | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		if (initialize.current || !releaseId) {
			return;
		}
		initialize.current = true;
		async function getRelease() {
			try {
				setLoading(true);
				const releaseData = await getReleaseById(releaseId!);
				setRelease(releaseData);
				setLoading(false);
			} catch (error: any) {
				console.error(error.message);
			}
		}
		toast.promise(getRelease(), {
			loading: "Fetching release...",
			success: "Release fetched",
			error: "Error fetching release",
		});
	}, []);
	const locale = window.navigator.language;

	return (
		<div className="flex flex-col justify-center items-center w-full h-full gap-4">
			<Card className="w-fit p-4" x-chunk="dashboard-05-chunk-0">
				<CardHeader className="pb-3 w-fit">
					<CardTitle>⏳ Coming soon...</CardTitle>
					<CardDescription className="w-fit max-w-2xl text-balance leading-relaxed">
						This page is not implemented yet but is coming soon. More info will be available in the future.
					</CardDescription>
				</CardHeader>
			</Card>
			{!release && !loading && <p>Release not found with id: {releaseId}</p>}
			{release && (
				<>
					<p className="text-2xl font-bold">Details</p>
					<div className="flex flex-col justify-start items-center sm:w-[50vw] w-[80vw]">
						<div className="flex justify-center items-center w-full">
							<img src={release.picture} alt="picture" className="border-2 border-solid border-black aspect-square w-[140px] rounded-lg mb-4" />
						</div>
						<p>
							<b>Id:</b> {release.id}
						</p>
						<p>
							<b>Name:</b> {release.name}
						</p>
						<p>
							<b>ReleaseDate:</b> {new Date(release.releaseDate).toLocaleString(locale, formattedDateOptions)}
						</p>
						<p>
							<b>AnnouncementDate:</b> {new Date(release.announcementDate).toLocaleString(locale, formattedDateOptions)}
						</p>
						<Separator className="my-2" />
						{release.description && (
							<>
								<p className="font-bold">Description:</p>
								<p className="text-center">{release.description}</p>
								<Separator className="my-2" />
							</>
						)}
						<p>
							<b>Artists</b>
						</p>
						<div className="flex flex-row justify-start items-start flex-wrap text-center">
							{release.artists
								.map((artist) => {
									if (!artist) return null;
									if (artist instanceof DocumentReference) return artist.path;
									return artist.artistName;
								})
								.join(", ")}
						</div>
						<Separator className="my-2" />
						<p>
							<b>Label</b>
						</p>
						{release.label && <p>{release.label instanceof DocumentReference ? release.label.path : release.label.name}</p>}
						<Separator className="my-2" />
						<p>
							<b>Genres</b>
						</p>
						<div className="flex flex-row justify-start items-start flex-wrap text-center">
							{release.genres
								.map((genre) => {
									if (!genre) return null;
									return genre.name;
								})
								.join(", ")}
						</div>
						<Separator className="my-2" />
						<p className="font-bold">Urls</p>
						<div className="flex flex-row flex-wrap gap-4 items-center justify-center">
							{release.urls.map((url) => (
								<a href={url.url} target="_blank" className="flex items-center gap-1 text-muted-foreground hover:underline" key={url.platform.name}>
									<img src={getImageUrl("socialplatforms", url.platform.logo)} alt={url.platform.name} className="h-4 w-4" />
									{url.platform.name}
								</a>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};
