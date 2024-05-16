import { FormWrapper } from "@/components/form/FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationFieldErrorMap } from "@/components/form/useMultiStepForm";
import { DatePickerWithPresets } from "@/components/ui/datepicker";

type ReleaseGeneral = {
	name: string;
	description: string;
    releaseDate: Date | undefined;
};

type ReleaseGeneralProps = ReleaseGeneral & {
	updateFields: (newData: Partial<ReleaseGeneral>) => void;
	errors: ValidationFieldErrorMap;
};

export function ReleaseGeneral({ name, releaseDate, description, updateFields, errors }: ReleaseGeneralProps) {
	return (
		<FormWrapper title="General" allError={errors["allFields"]}>
			<div className="flex flex-col items-start justify-center w-full h-full gap-8 sm:max-w-[30vw]">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="username" className="font-bold text-lg">Release Name</Label>
						<p className="text-red-500">*</p>
                        <p className=" font-extralight ml-1 text-sm">(max 50 characters)</p>
					</div>
					<Input
						type="text"
						id="username"
						className="border-[1px] border-grey-200 border-solid w-full"
						autoFocus
						value={name}
						onChange={(e) => updateFields({ name: e.target.value })}
					/>
					{errors.releasename && <p className="text-red-500">{errors.releasename}</p>}
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="description" className="font-bold text-lg">Description</Label>
					</div>
					<Input
						type="text"
						id="description"
						className="border-[1px] border-grey-200 border-solid w-full"
						autoFocus
						value={description}
						onChange={(e) => updateFields({ description: e.target.value })}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="date" className="font-bold text-lg">ReleaseDate</Label>
						<p className="text-red-500">*</p>
					</div>
					<DatePickerWithPresets initialDate={releaseDate} onDateChange={(date: Date | undefined) => {
                        updateFields({ releaseDate: date });
                    }}/>
					{errors.releasedate && <p className="text-red-500">{errors.releasedate}</p>}
				</div>
			</div>
		</FormWrapper>
	);
}
