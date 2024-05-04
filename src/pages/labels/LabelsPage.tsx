"use client";
import { labels } from "@/data/labels/labels";
import LabelComponent from "@/pages/labels/LabelComponent";

const LabelsPage: React.FC = () => {
	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
				{labels.map((label) => (
					<LabelComponent key={label.id} label={label} />
				))}
			</div>
		</div>
	);
};

export default LabelsPage;
