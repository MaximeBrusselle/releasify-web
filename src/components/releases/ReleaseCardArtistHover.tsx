import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { getImageUrl } from "../../lib/utils";
import { ReleaseArtist } from "@/data/releases/releaseTypes";
import { Link } from "react-router-dom";

interface ReleaseArtistProps {
	artist: ReleaseArtist;
}

const ReleaseCardArtistHover: React.FC<ReleaseArtistProps> = (props: ReleaseArtistProps) => {
	const { artist } = props;
	const goToProfile = () => {
		window.location.href = `/artists/${artist.id}`;
	};

	return (
		<HoverCard openDelay={1000}>
			<HoverCardTrigger asChild>
				{artist.id && artist.id !== "" ? (
					<Link to={`/artists/${artist.id}`} key={artist.id}>
						<div className="flex flex-row justify-center items-center gap-1 hover:cursor-pointer">
							<img src={getImageUrl("artists", artist.profilePicture)} alt={artist.artistName} className="w-[24px] aspect-square rounded-full border-1 border-black border-solid" />
							<p className="text-md underline">{artist.artistName}</p>
						</div>
					</Link>
				) : (
					<div className="flex flex-row justify-center items-center gap-1 hover:cursor-default" key={`${artist.artistName}notexisting`}>
						<img src={getImageUrl("artists", artist.profilePicture)} alt={artist.artistName} className="w-[16px] aspect-square rounded-full border-1 border-black border-solid" />
						<p className="text-md">{artist.artistName}</p>
					</div>
				)}
			</HoverCardTrigger>
			<HoverCardContent className="w-96">
				<div className="flex flex-row items-center justify-between w-full">
					<img src={getImageUrl("artists", artist.profilePicture)} alt={artist.artistName} className="w-[45%] aspect-square rounded-[12px] border-4 border-black border-solid object-cover" />
					<div className="flex flex-col items-start justify-center gap-1 p-2 w-full">
						<div className="flex flex-col justify-center items-start gap-1">
							<p className="text-[32px] font-bold leading-4">{artist.artistName}</p>
							<p className="text-md">{artist.description}</p>
						</div>
						{artist.id && artist.id !== "" ? (
							<button className="px-4 py-2 bg-[#1ED760] rounded-[12px] text-white" onClick={goToProfile}>
								Go to profile
							</button>
						) : (
							<p>Artist not found</p>
						)}
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export default ReleaseCardArtistHover;
