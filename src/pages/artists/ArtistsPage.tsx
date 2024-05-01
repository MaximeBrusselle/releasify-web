import { artists } from "../../data/artists/artists";
import ArtistComponent from "./ArtistComponent";

const ArtistsPage = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold underline">Welcome to the ArtistsPage</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
				{artists.map((artist) => (
					<ArtistComponent key={artist.id} artist={artist} />
				))}
			</div>
		</div>
	);
};

export default ArtistsPage;
