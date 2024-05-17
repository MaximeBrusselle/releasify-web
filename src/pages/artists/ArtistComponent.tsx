import { Badge } from "@/components/ui/badge";
import { ArtistIndex } from "@/data/artists/artistTypes";
import { Link } from "react-router-dom";

interface ArtistComponentProps {
	artist: ArtistIndex;
}

const ArtistComponent: React.FC<ArtistComponentProps> = (props: ArtistComponentProps) => {
	const { artist } = props;
	return (
		<div key={artist.id} className="flex flex-col items-center">
			<div className="relative w-48 h-48">
				<img src={artist.profilePicture} alt={artist.artistName} className="object-cover w-full h-full rounded-lg" />
			</div>
			<Link to={`/artists/${artist.id}`}>
				<h2 className="mt-2 text-center font-bold">{artist.artistName}</h2>
			</Link>
			<div className="flex flex-wrap justify-center mt-1">
				{artist.genres.map((genre) => (
					<Badge key={genre.id} color={genre.group.color} className="mr-1 mb-1">
						{genre.name}
					</Badge>
				))}
			</div>
		</div>
	);
};

export default ArtistComponent;
