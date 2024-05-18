import { FormWrapper } from "@/components/form/FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { ValidationFieldErrorMap } from "@/components/form/useMultiStepForm";

type GeneralInfoData = {
	profilePicture: File | null;
	description: string;
	contactEmail: string;
};

type GeneralInfoProps = GeneralInfoData & {
	updateFields: (newData: Partial<GeneralInfoData>) => void;
	errors: ValidationFieldErrorMap;
};

export function GeneralInfo({ profilePicture, description, contactEmail, updateFields, errors }: GeneralInfoProps) {
	const [imageError, setImageError] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleImageUploaded = () => {
		if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
			const file = fileInputRef.current.files[0];
			if (file.size <= 32 * 1024 * 1024) {
				updateFields({
					profilePicture: file,
				});
				setImageError("");
			} else {
				setImageError("Image size exceeds the limit.");
			}
		}
	};
	return (
		<FormWrapper title="Profile Picture and Genres" allError={errors["allFields"]}>
			<div className="flex flex-col items-start justify-center w-full h-full gap-8 sm:max-w-[30vw]">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="confirmpassword" className="font-bold text-lg">Profile Picture</Label>
						<p className=" font-extralight ml-1 text-sm">(max 32MB)</p>
					</div>
					<Input id="confirmpassword" className="border-[1px] border-grey-200 border-solid" type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUploaded} />
					<p className="text-red-500" hidden={imageError === ""}>
						{imageError}
					</p>
				</div>
				{profilePicture && (
					<div className="flex flex-col gap-2 w-full justify-center items-center">
						<Label htmlFor="profilePicturePreview" className="font-bold text-lg">Preview</Label>
						<img
							id="profilePicturePreview"
							src={URL.createObjectURL(profilePicture)}
							alt={"Profile Picture Preview"}
							className="w-[148px] aspect-square border-[4px] border-solid border-black rounded-lg object-cover"
						/>
					</div>
				)}
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="description" className="font-bold text-lg">
							Description
						</Label>
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
						<Label htmlFor="contactEmail" className="font-bold text-lg">
							Bookings Email
						</Label>
					</div>
					<Input
						type="email"
						id="contactEmail"
						className="border-[1px] border-grey-200 border-solid w-full"
						autoFocus
						value={contactEmail}
						onChange={(e) => updateFields({ contactEmail: e.target.value })}
					/>
				</div>
			</div>
		</FormWrapper>
	);
}