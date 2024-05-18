import { getArtists } from "@/data/api/artist/getArtists";
import { ArtistDetail } from "@/data/artists/artistTypes";
import ArtistComponent from "@/pages/artists/ArtistComponent";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const ArtistsPage: React.FC = () => {
	const initialized = useRef(false);
	const [artists, setArtists] = useState<ArtistDetail[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;
			async function fetchData() {
				try {
					const fetchedReleases = await getArtists();
					setArtists(fetchedReleases);
					setLoading(false);
				} catch (error: any) {
					setError(true);
					console.error(error.message);
					throw new Error(error.message);
				}
			}
			if (loading && !error) {
				toast.promise(fetchData(), {
					loading: "Fetching artists...",
					success: "Artists fetched",
					error: "Error fetching artists",
				});
			}
		}
	}, []);
	if (error) {
		return <p>Error fetching artists</p>;
	}
	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
				{artists.length === 0 && <p className="text-[24px] text-center">No artists found</p>}
				{!error && artists.length > 0 && artists.map((artist) => <ArtistComponent key={artist.id} artist={artist} />)}
			</div>
		</div>
	);
};

export default ArtistsPage;
