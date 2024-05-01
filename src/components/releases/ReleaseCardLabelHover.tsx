import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { getImageUrl } from "../../lib/utils";
import { LabelIndex } from "@/data/labels/labelTypes";
import { Link } from "react-router-dom";

const ReleaseCardLabelHover = ({ label }: { label: LabelIndex }) => {
	const goToProfile = () => {
		window.location.href = `/labels/${label.id}`;
	};

	return (
		<HoverCard openDelay={1000}>
			<HoverCardTrigger asChild>
				{label.id && label.id !== "" ? (
					<Link to={`/labels/${label.id}`}>
						<div className="flex flex-row justify-center items-center gap-3">
							<img src={getImageUrl("labels", label.profilePicture)} alt={label.name} className="w-[43px] rounded-md aspect-square" />
							<p className="font-semibold text-lg">{label.name}</p>
						</div>
					</Link>
				) : (
					<div className="flex flex-row justify-center items-center gap-3">
						<img src={getImageUrl("labels", label.profilePicture)} alt={label.name} className="w-[43px] rounded-md aspect-square" />
						<p className="font-semibold text-lg">{label.name}</p>
					</div>
				)}
			</HoverCardTrigger>
			<HoverCardContent className="w-96">
				<div className="flex flex-row items-center justify-between w-full">
					<img src={getImageUrl("labels", label.profilePicture)} alt={label.name} className="w-[45%] aspect-square rounded-[12px] border-4 border-black border-solid object-cover" />
					<div className="flex flex-col items-start justify-center gap-1 p-2 w-full">
						<div className="flex flex-col justify-center items-start gap-1">
							<p className="text-[32px] font-bold leading-7">{label.name}</p>
							<p className="text-[16px]">{label.description}</p>
						</div>
						{label.id && label.id !== "" ? (
							<button className="px-4 py-2 bg-[#1ED760] rounded-[12px] text-white" onClick={goToProfile}>
								Go to profile
							</button>
						) : (
							<p>Label not found</p>
						)}
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export default ReleaseCardLabelHover;
