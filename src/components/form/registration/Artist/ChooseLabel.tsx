import { FormWrapper } from "@/components/form/FormWrapper";
import { LabelDetail, LabelIndex } from "@/data/labels/labelTypes";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LabelSelectCard from "@/components/labels/LabelSelectCard";
import { ValidationFieldErrorMap } from "@/components/form/useMultiStepForm";

type LabelView = "independant" | "label" | "labelNotOnPlatform";
type ChooseLabelViewType = {
	text: string;
	viewType: LabelView;
};

export type { ChooseLabelViewType };

type LabelData = {
	labelType: ChooseLabelViewType;
	label: LabelIndex | null;
};

type LabelProps = LabelData & {
	updateFields: (newData: Partial<LabelData>) => void;
	errors: ValidationFieldErrorMap;
	labels: LabelDetail[];
};

export function ChooseLabel({ label, labelType, updateFields, errors, labels }: LabelProps) {
	function updateLabel(newLabel: LabelIndex) {
		updateFields({
			label: newLabel,
		});
	}

	const [createdLabel, setCreatedLabel] = useState<LabelIndex>({
		name: "",
		profilePicture: "https://i.ibb.co/8m050zG/default.png",
		genres: [],
	});
	const [imageError, setImageError] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleImageUploaded = () => {
		if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
			const file = fileInputRef.current.files[0];
			if (file.size <= 32 * 1024 * 1024) {
				setCreatedLabel({ ...createdLabel, profilePicture: URL.createObjectURL(file) });
				updateFields({ label: { ...createdLabel, profilePicture: URL.createObjectURL(file) } });
				setImageError("");
			} else {
				setImageError("Image size exceeds the limit.");
			}
		}
	};

	const viewTypes: ChooseLabelViewType[] = [
		{
			text: "I'm An Independant Artist",
			viewType: "independant",
		},
		{
			text: "I'm Signed To A Label",
			viewType: "label",
		},
		{
			text: "My Label Is Not On The Platform",
			viewType: "labelNotOnPlatform",
		},
	];

	function updateViewType(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) {
		event.preventDefault();
		if (labelType.viewType === viewTypes[index].viewType) return;
		if (labelType.viewType === "labelNotOnPlatform" && viewTypes[index].viewType !== "labelNotOnPlatform") {
			setCreatedLabel({ name: "", profilePicture: "https://i.ibb.co/8m050zG/default.png", genres: [] });
		}
		updateFields({ labelType: viewTypes[index] });
		if (viewTypes[index].viewType !== "label") {
			updateFields({ label: null });
		}
	}

	const [filteredLabels, setFilteredLabels] = useState<LabelIndex[]>(labels);

	const [search, setSearch] = useState<string>("");
	function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newValue = event.target.value;
		setSearch(newValue);
		setFilteredLabels(labels.filter((label) => label.name.toLowerCase().includes(newValue.toLowerCase())));
	}

	return (
		<FormWrapper title="Label" allError={errors["allFields"]}>
			<div className="flex flex-col items-start justify-center w-full h-full gap-8 sm:max-w-[30vw]">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-center items-center m-0 p-0">
						<Label htmlFor="option" className="font-bold text-lg text-center">
							Select An Option
						</Label>
					</div>
					<div className="flex flex-row justify-center items-center flex-wrap gap-4">
						{viewTypes.map((element, index) => (
							<Button key={element.viewType} onClick={(event) => updateViewType(event, index)} variant={labelType.viewType === element.viewType ? "default" : "outline"}>
								{element.text}
							</Button>
						))}
					</div>
				</div>
				{labelType.viewType === "independant" && (
					<div className="flex flex-row justify-center items-center w-full">
						<p className="text-semibold text-2xl text-center">Nothing to do anymore on this step!</p>
					</div>
				)}
				{labelType.viewType === "label" && (
					<div className="flex flex-col gap-2 w-full">
						<div className="flex flex-col gap-2 w-full">
							<div className="flex flex-row justify-start items-center m-0 p-0">
								<Label htmlFor="label" className="font-bold text-lg">
									Select A Label
								</Label>
								<p className="text-red-500">*</p>
							</div>
							{errors.label && <p className="text-red-500">{errors.label}</p>}
						</div>
						<Input className="w-full" value={search} onChange={handleSearchChange} placeholder="Search for a label..."></Input>
						<div className="flex flex-row justify-center items-start flex-wrap gap-x-4 max-h-[50vh] h-fit overflow-y-scroll p-2 w-full gap-y-4">
							{filteredLabels.map((el) => (
								<LabelSelectCard key={el.id} label={el} handleSelect={updateLabel} selectedId={label?.id || null} />
							))}
						</div>
					</div>
				)}
				{labelType.viewType === "labelNotOnPlatform" && (
					<div className="flex flex-col gap-2 w-full">
						<div className="flex flex-row justify-start items-center m-0 p-0">
							<Label htmlFor="label" className="font-bold text-lg">
								Fill in the details of your label
							</Label>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<div className="flex flex-row justify-start items-center m-0 p-0">
								<Label htmlFor="artistname" className="font-bold text-lg">
									Label Name
								</Label>
								<p className="text-red-500">*</p>
							</div>
							<Input
								type="text"
								id="artistname"
								className="border-[1px] border-grey-200 border-solid"
								// required
								autoFocus
								value={createdLabel.name}
								onChange={(e) => {
									setCreatedLabel({ ...createdLabel, name: e.target.value });
									updateFields({ label: { ...createdLabel, name: e.target.value } });
								}}
							/>
							{errors.labelname && <p className="text-red-500">{errors.labelname}</p>}
						</div>
						<div className="flex flex-col gap-2 w-full">
							<div className="flex flex-row justify-start items-center m-0 p-0">
								<Label htmlFor="image" className="font-bold text-lg">
									Profile Picture (Max 32MB)
								</Label>
							</div>
							<Input id="image" className="border-[1px] border-grey-200 border-solid" type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUploaded} />
							<p className="text-red-500" hidden={imageError === ""}>
								{imageError}
							</p>
						</div>
						{createdLabel.profilePicture && (
							<div className="flex flex-col gap-2 w-full justify-center items-center">
								<Label htmlFor="profilePicturePreview" className="font-bold text-lg">
									Preview
								</Label>
								<img
									id="profilePicturePreview"
									src={createdLabel.profilePicture}
									alt={"Profile Picture Preview"}
									className="w-[148px] aspect-square border-[4px] border-solid border-black rounded-lg object-cover"
								/>
							</div>
						)}
					</div>
				)}
			</div>
		</FormWrapper>
	);
}
