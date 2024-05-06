import { FormWrapper } from "@/components/form/FormWrapper";
import { LabelIndex } from "@/data/labels/labelTypes";

type LabelData = {
	label: LabelIndex | null;
};

type LabelProps = LabelData & {
	updateFields: (newData: Partial<LabelData>) => void;
};

export function Label({ label, updateFields }: LabelProps) {
	const updateLabel = (index: number, newLabel: LabelIndex) => {
		updateFields({
			label: newLabel,
		});
	}
	return (
		<FormWrapper title="Label">
			<div className="flex flex-col items-start justify-center w-full h-full gap-8"></div>
		</FormWrapper>
	);
}
