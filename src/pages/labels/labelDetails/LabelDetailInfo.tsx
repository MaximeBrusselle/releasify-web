import { Badge } from "@/components/ui/badge";
import notifPlus from "../../../assets/icon_bell_plus.svg";
import notifOff from "../../../assets/icon_bell_off.svg";
import { getImageUrl } from "../../../lib/utils";
import { LabelDetail } from "../../../data/labels/labelTypes";
import { Link } from "react-router-dom";

interface LabelDetailInfoProps {
	label: LabelDetail;
	following: boolean;
	notification: boolean;
	handleFollow: () => void;
	handleNotification: () => void;
}

const LabelDetailInfo: React.FC<LabelDetailInfoProps> = (props: LabelDetailInfoProps) => {
	const { label, following, notification, handleFollow, handleNotification } = props;
	return (
		<div className="flex flex-col items-center justify-start gap-[14px] xl:w-[75vw] h-full lg:w-[80vw] md:w-[85vw] w-[90vw]">
			<img src={getImageUrl("labels", label.bannerPicture)} alt="banner picture" className="w-full object-cover rounded-[20px] border-black border-[6px] border-solid xl:aspect-[1400/400] lg:aspect-[1400/500] md:aspect-[1400/600] aspect-[1400/900]" />
			<div className="flex 2xl:flex-row flex-col w-full h-full gap-[14px] items-center justify-center border-solid">
				<div className="flex 2xl:flex-row flex-col 2xl:justify-start justify-center items-center w-full gap-2 h-full">
					<img
						src={getImageUrl("labels", label.profilePicture)}
						alt="profile picture"
						className="w-[20vh] object-cover rounded-[50px] border-black border-[6px] border-solid aspect-square"
					/>
					<div className="flex flex-col justify-center 2xl:items-start items-center w-fit gap-[7px] h-full">
						<div className="flex flex-col 2xl:items-start items-center justify-center gap-0">
							<p className="text-4xl font-extrabold text-center">{label.name}</p>
							<p className="text-[16px] text-center">{label.description}</p>
							{label.contactEmail && (
								<p className="text-[16px] flex flex-row gap-1 text-center">
									Contact:{" "}
									<Link className="text-[16px] text-blue-600 underline" to={`mailto:${label.contactEmail}?subject=Contact ${label.name}`}>
										{label.contactEmail}
									</Link>
								</p>
							)}
						</div>
						<div className="flex flex-row gap-2 justify-start items-center text-center">
							{label.genres.map((genre) => (
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
						{label.socials.length > 0 && (
							<div className="flex flex-row justify-end items-end w-full">
								<button className="rounded-[12px] px-2 bg-white border-[2px] border-black border-solid">More</button>
							</div>
						)}
						<div className="flex flex-row flex-wrap items-center justify-center w-fit gap-y-[14px]">
							{label.socials.map((social) => (
								<Link to={social.url} key={social.platform.name} className="flex-artistSocials h-fit w-fit flex flex-row items-center justify-center">
									<img src={getImageUrl("socialplatforms", social.platform.logo)} alt={social.platform.name.toString()} className="w-[30px] aspect-square" />
								</Link>
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
								<p className="text-2xl">{label.releases.length}</p>
							</div>
							<div className="flex flex-col items-center justify-center">
								<p className="text-2xl font-bold">Likes</p>
								<p className="text-2xl">0</p>
							</div>
						</div>
						<hr className="my-[14px] h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-100 dark:via-neutral-900 w-full" />
						<div className="flex flex-row items-center justify-center h-full">
							<p className="text-2xl">
								<strong>Artists:</strong> {label.artists.length}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LabelDetailInfo;
