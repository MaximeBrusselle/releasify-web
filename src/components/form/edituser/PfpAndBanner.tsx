import { FormWrapper } from "@/components/form/FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { ValidationFieldErrorMap } from "@/components/form/useMultiStepForm";

type PfpAndBannerData = {
	bannerPicture: File | string;
	profilePicture: File | string;
};

type PfpAndBannerProps = PfpAndBannerData & {
	updateFields: (newData: Partial<PfpAndBannerData>) => void;
	errors: ValidationFieldErrorMap;
};

export function PfpAndBanner({ bannerPicture, profilePicture, updateFields, errors }: PfpAndBannerProps) {
	const [bannerError, setBannerError] = useState("");
	const bannerUploadRef = useRef<HTMLInputElement>(null);
	const uploadBanner = () => {
		if (bannerUploadRef.current?.files && bannerUploadRef.current.files.length > 0) {
			const file = bannerUploadRef.current.files[0];
			if (file.size <= 32 * 1024 * 1024) {
				updateFields({
					bannerPicture: file,
				});
				setBannerError("");
			} else {
				setBannerError("Image size exceeds the limit.");
			}
		}
	};
	const [pfpError, setpfpError] = useState("");
	const pfpUploadRef = useRef<HTMLInputElement>(null);
	const uploadPfp = () => {
		if (pfpUploadRef.current?.files && pfpUploadRef.current.files.length > 0) {
			const file = pfpUploadRef.current.files[0];
			if (file.size <= 32 * 1024 * 1024) {
				updateFields({
					profilePicture: file,
				});
				setpfpError("");
			} else {
				setpfpError("Image size exceeds the limit.");
			}
		}
	};
	return (
		<FormWrapper title="Banner and Genres" allError={errors["allFields"]}>
			<p className="mb-8">Not uploading an image keeps the same image</p>
			<div className="flex flex-col items-start justify-center w-full h-full gap-8 sm:max-w-[30vw]">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="pfp" className="font-bold text-lg">
							Profile Picture
						</Label>
						<p className=" font-extralight ml-1 text-sm">(max 32MB)</p>
					</div>
					<Input id="pfp" className="border-[1px] border-grey-200 border-solid" type="file" accept="image/*" ref={pfpUploadRef} onChange={uploadPfp} />
					<p className="text-red-500" hidden={pfpError === ""}>
						{pfpError}
					</p>
				</div>
				{profilePicture && (
					<div className="flex flex-col gap-2 w-full justify-center items-center">
						<Label htmlFor="ProfilePicturePreview" className="font-bold text-lg">
							Preview
						</Label>
						<img
							id="ProfilePicturePreview"
							src={typeof profilePicture === "string" ? profilePicture : URL.createObjectURL(profilePicture)}
							alt={"Profile Picture Preview"}
							className="w-36 aspect-square border-[4px] border-solid border-black rounded-lg object-cover"
						/>
					</div>
				)}
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="banner" className="font-bold text-lg">
							Banner
						</Label>
						<p className=" font-extralight ml-1 text-sm">(max 32MB)</p>
					</div>
					<Input id="banner" className="border-[1px] border-grey-200 border-solid" type="file" accept="image/*" ref={bannerUploadRef} onChange={uploadBanner} />
					<p className="text-red-500" hidden={bannerError === ""}>
						{bannerError}
					</p>
				</div>
				{bannerPicture && (
					<div className="flex flex-col gap-2 w-full justify-center items-center">
						<Label htmlFor="bannerPicturePreview" className="font-bold text-lg">
							Preview
						</Label>
						<img
							id="bannerPicturePreview"
							src={typeof bannerPicture === "string" ? bannerPicture : URL.createObjectURL(bannerPicture)}
							alt={"Banner Picture Preview"}
							className="w-[400px] xl:aspect-[1400/400] lg:aspect-[1400/500] md:aspect-[1400/600] aspect-[1400/900] border-[4px] border-solid border-black rounded-lg object-cover"
						/>
					</div>
				)}
			</div>
		</FormWrapper>
	);
}
