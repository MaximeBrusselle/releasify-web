import { Badge } from "@/components/ui/badge";
import notifPlus from "@/assets/icon_bell_plus.svg";
import notifOff from "@/assets/icon_bell_off.svg";
import { getImageUrl } from "@/lib/utils";
import { ArtistDetail } from "@/data/artists/artistTypes";
import { Link } from "react-router-dom";
import { handleSocialLinkClick } from "@/lib/utils";

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
		<div className="flex flex-col items-center justify-start gap-[14px] xl:w-[75vw] h-full lg:w-[80vw] md:w-[85vw] w-[90vw]">
			<img src={getImageUrl("artists", artist.bannerPicture)} alt="banner picture" className="w-full object-cover rounded-[20px] border-black border-[6px] border-solid xl:aspect-[1400/400] lg:aspect-[1400/500] md:aspect-[1400/600] aspect-[1400/900]" />
			<div className="flex 2xl:flex-row flex-col w-full h-full gap-[14px] items-center justify-center border-solid">
				<div className="flex 2xl:flex-row flex-col 2xl:justify-start justify-center items-center w-full gap-2 h-full">
					<img
						src={getImageUrl("artists", artist.profilePicture)}
						alt="profile picture"
						className="w-[20vh] object-cover rounded-[50px] border-black border-[6px] border-solid aspect-square"
					/>
					<div className="flex flex-col justify-center 2xl:items-start items-center w-fit gap-[7px] h-full">
						<div className="flex flex-col 2xl:items-start items-center justify-center gap-0">
							<p className="text-4xl font-extrabold text-center">{artist.artistName}</p>
							{artist.realName && <p className="text-[16px] text-center">{artist.realName}</p>}
							<p className="text-[16px] text-center">{artist.description}</p>
							{artist.bookingEmail && (
								<p className="text-[16px] text-center">
									Booking:&nbsp;
									<Link className="text-[16px] text-blue-600 underline" to={`mailto:${artist.bookingEmail}?subject=Booking ${artist.artistName}`}>
										{artist.bookingEmail}
									</Link>
								</p>
							)}
						</div>
						<div className="flex flex-row gap-2 justify-start items-center text-center">
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
				</div>
				<div className="flex 2xl:flex-row flex-col items-center justify-between 2xl:h-[200px] w-full gap-6 h-full">
					<span className="2xl:block h-full w-px bg-black hidden"></span>
					<div className="flex flex-col justify-center items-center w-[70%] h-full">
						{artist.socials.length > 1 && (
							<div className="flex flex-row justify-end items-end w-full">
								<button className="rounded-[12px] px-2 bg-white border-[2px] border-black border-solid">More</button>
							</div>
						)}
						<div className="flex flex-row flex-wrap items-center justify-center w-fit gap-y-[14px]">
							{artist.socials.map((social) => (
								<button key={social.platform.name} className="flex-artistSocials h-fit w-fit flex flex-row items-center justify-center">
									<img src={getImageUrl("socialplatforms", social.platform.logo)} alt={social.platform.name.toString()} className="w-[30px] aspect-square" onClick={(event) => handleSocialLinkClick(event, social.url)}/>
								</button>
							))}
						</div>
					</div>
					<span className="2xl:block h-full w-px bg-black hidden"></span>
					<div className="flex flex-col justify-center items-center w-full h-full">
						<div className="flex sm:flex-row flex-col justify-between items-center w-full">
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
