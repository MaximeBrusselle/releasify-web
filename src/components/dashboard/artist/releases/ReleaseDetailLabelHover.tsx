import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { getImageUrl } from "@/lib/utils";
import { LabelIndex } from "@/data/labels/labelTypes";
import { useNavigate } from "react-router-dom";
import { ignoreClick } from "@/lib/utils";

interface ReleaseDetailLabelHoverProps {
	label: LabelIndex;
}

const ReleaseDetailLabelHover: React.FC<ReleaseDetailLabelHoverProps> = (props: ReleaseDetailLabelHoverProps) => {
	const { label } = props;
	const navigate = useNavigate();
	function goToProfile(): void {
		navigate(`/labels/${label.id}`);
	}

	function handleLabelCLicked(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
		event.stopPropagation();
		if (label.id && label.id !== "") {
			goToProfile();
		}
	}

	return (
		<HoverCard openDelay={1000}>
			<HoverCardTrigger asChild>
				{label.id && label.id !== "" ? (
					<div className="flex flex-row justify-start items-center gap-3 w-full group hover:cursor-pointer" onClick={handleLabelCLicked}>
						<img
							src={getImageUrl("labels", label.profilePicture)}
							alt={label.name}
							className="w-16 rounded-md aspect-square sm:border-4 border-2 border-black border-solid"
						/>
						<p className="font-semibold text-lg group-hover:underline">{label.name}</p>
					</div>
				) : (
					<div className="flex flex-row justify-center items-center gap-3 w-full">
						<img
							src={getImageUrl("labels", label.profilePicture)}
							alt={label.name}
							className="w-24 rounded-md aspect-square sm:border-4 border-2 border-black border-solid"
						/>
						<p className="font-semibold sm:text-lg text-md">{label.name}</p>
					</div>
				)}
			</HoverCardTrigger>
			<HoverCardContent className="w-96">
				<div className="flex flex-row items-center justify-between w-full hover:cursor-default" onClick={ignoreClick}>
					<img src={getImageUrl("labels", label.profilePicture)} alt={label.name} className="w-[45%] aspect-square rounded-[12px] border-4 border-black border-solid object-cover" />
					<div className="flex flex-col items-start justify-center gap-1 p-2 w-full">
						<div className="flex flex-col justify-center items-start gap-1">
							<p className="text-[32px] font-bold leading-7">{label.name}</p>
							<p className="text-[16px]">{label.description}</p>
						</div>
						{label.id && label.id !== "" ? (
							<button className="px-4 py-2 bg-[#1ED760] rounded-[12px] text-white" onClick={handleLabelCLicked}>
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

export default ReleaseDetailLabelHover;
