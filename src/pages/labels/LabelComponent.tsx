import { Badge } from "@/components/ui/badge";
import { LabelIndex } from "../../data/labels/labelTypes";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/utils";

interface LabelComponentProps {
	label: LabelIndex;
}

const LabelComponent: React.FC<LabelComponentProps> = (props: LabelComponentProps) => {
	const { label } = props;
	return (
		<div key={label.id} className="flex flex-col items-center">
			<div className="relative w-48 h-48">
				<img src={getImageUrl("labels", label.profilePicture)} alt={label.name} className="object-cover w-full h-full rounded-lg" />
			</div>
			<Link to={`/labels/${label.id}`}>
				<h2 className="mt-2 text-center font-bold">{label.name}</h2>
			</Link>
			<div className="flex flex-wrap justify-center mt-1">
				{label.genres.map((genre) => (
					<Badge key={genre.id} color={genre.group.color} className="mr-1 mb-1">
						{genre.name}
					</Badge>
				))}
			</div>
		</div>
	);
};

export default LabelComponent;
