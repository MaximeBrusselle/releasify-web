import { Badge } from "@/components/ui/badge";
import notifPlus from "../../../assets/icon_bell_plus.svg";
import notifOff from "../../../assets/icon_bell_off.svg";
import { getImageUrl } from "../../../lib/utils";
import { ArtistDetail } from "../../../data/artists/artistTypes";
import { Link } from "react-router-dom";

interface ArtistDetailInfoProps {
	artist: ArtistDetail;
	following: boolean;
	notification: boolean;
	handleFollow: () => void;
	handleNotification: () => void;
}

const ArtistDetailInfo: React.FC<ArtistDetailInfoProps> = (props: ArtistDetailInfoProps) => {
	const { artist, following, notification, handleFollow, handleNotification } = props;
	return (
		<div className="flex flex-col items-center justify-start gap-[14px] w-[75vw]">
			{/* The banner picture */}
			<img src={getImageUrl("artists", artist.bannerPicture)} alt="banner picture" className="w-full object-cover rounded-[20px] border-black border-[6px] border-solid aspect-[1452/412]" />
			{/* PFP + general info */}
			<div className="flex flex-row w-full h-full gap-[14px] items-center justify-center border-solid">
				{/* PFP */}
				<img src={getImageUrl("artists", artist.profilePicture)} alt="profile picture" className="w-[240px] object-cover rounded-[50px] border-black border-[6px] border-solid aspect-square" />
				{/* Info */}
				<div className="flex flex-row items-center justify-between h-[200px] w-full gap-6">
					{/* General Info */}
					<div className="flex flex-col justify-center items-start w-full gap-[7px] h-full">
						<div className="flex flex-col items-start justify-center gap-0">
							<p className="text-[36px] font-extrabold">{artist.artistName}</p>
							{artist.realName && <p className="text-[16px]">{artist.realName}</p>}
							<p className="text-[16px]">{artist.description}</p>
							{artist.bookingEmail && (
								<p className="text-[16px] flex flex-row gap-1">
									Booking:{" "}
									<Link className="text-[16px] text-blue-600 underline" to={`mailto:${artist.bookingEmail}?subject=Booking ${artist.artistName}`}>
										{artist.bookingEmail}
									</Link>
								</p>
							)}
						</div>
						<div className="flex flex-row gap-2 justify-start items-center">
							{artist.genres.map((genre) => (
								<Badge key={genre.id} color={genre.group.color} className="mr-1 mb-1">
									{genre.name}
								</Badge>
							))}
						</div>
						<div className="flex flex-row gap-2 justify-start items-center">
							{following ? (
								<button className="px-4 py-2 bg-[#f00] rounded-[12px] text-white" onClick={handleFollow}>
									Unfollow
								</button>
							) : (
								<button className="px-4 py-2 bg-[#1ED760] rounded-[12px] text-white" onClick={handleFollow}>
									Follow
								</button>
							)}

							<button className="p-2 bg-black rounded-[12px]" onClick={handleNotification}>
								{notification ? <img src={notifOff} alt="hasNotif" /> : <img src={notifPlus} alt="hasNoNotif" />}
							</button>
						</div>
					</div>

					<span className="block h-full w-px bg-black"></span>

					{/* Socials */}
					<div className="flex flex-col justify-start items-center w-full h-full">
						{artist.socials.length > 0 && (
							<div className="flex flex-row justify-end items-end w-full">
								<button className="rounded-[12px] px-2 bg-white border-[2px] border-black border-solid">More</button>
							</div>
						)}
						<div className="grid grid-cols-2 w-full gap-y-[14px]">
							{artist.socials.map((social) => (
								<Link to={social.url} key={social.platform.name}>
									<div className="flex flex-row justify-start items-center gap-1">
										<img src={getImageUrl("socialplatforms", social.platform.logo)} alt={social.platform.name.toString()} className="w-[30px] aspect-square" />
										<p className="text-[16px] font-semibold">{social.username}</p>
									</div>
								</Link>
							))}
						</div>
					</div>

					<span className="block h-full w-px bg-black"></span>

					{/* Stats and label */}
					<div className="flex flex-col justify-center items-center w-full h-full">
						<div className="flex flex-row justify-between items-center w-full">
							<div className="flex flex-col items-center justify-center">
								<p className="text-2xl font-bold">Followers</p>
								<p className="text-2xl">0</p>
							</div>
							<div className="flex flex-col items-center justify-center">
								<p className="text-2xl font-bold">Releases</p>
								<p className="text-2xl">{artist.releases.length}</p>
							</div>
							<div className="flex flex-col items-center justify-center">
								<p className="text-2xl font-bold">Likes</p>
								<p className="text-2xl">0</p>
							</div>
						</div>
						<hr className="my-[14px] h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-100 dark:via-neutral-900 w-full" />
						{!artist.label && <p>Independent Artist</p>}
						{artist.label && (
							<Link to={`/labels/${artist.label.id}`}>
								<div className="flex flex-row items-center justify-center gap-3">
									<img src={getImageUrl("labels", artist.label.profilePicture)} alt={artist.label.name} className="w-20 aspect-square rounded-md" />
									<p className="text-2xl font-bold">{artist.label.name}</p>
								</div>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArtistDetailInfo;
