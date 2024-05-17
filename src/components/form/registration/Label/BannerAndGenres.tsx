import { FormWrapper } from "@/components/form/FormWrapper";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Genre } from "@/data/genres/genreTypes";
import React, { useRef, useState } from "react";
import { genres } from "@/data/genres/genres";
import { ValidationFieldErrorMap } from "@/components/form/useMultiStepForm";

type BannerAndGenresData = {
	bannerPicture: File | null;
	genreList: Genre[];
};

type BannerAndGenresProps = BannerAndGenresData & {
	updateFields: (newData: Partial<BannerAndGenresData>) => void;
	errors: ValidationFieldErrorMap;
};

export function BannerAndGenres({ bannerPicture, genreList, updateFields, errors }: BannerAndGenresProps) {
	const [imageError, setImageError] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleImageUploaded = () => {
		if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
			const file = fileInputRef.current.files[0];
			if (file.size <= 32 * 1024 * 1024) {
				updateFields({
					bannerPicture: file,
				});
				setImageError("");
			} else {
				setImageError("Image size exceeds the limit.");
			}
		}
	};

	const sortedGenres = genres.sort((a, b) => a.name.localeCompare(b.name));
	const handleGenreClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, newGenre: Genre) => {
		event.preventDefault();
		if(genreList.includes(newGenre)){
			updateFields({genreList: genreList.filter(genre => genre !== newGenre)});
		} else {
			updateFields({genreList: [...genreList, newGenre]});
		}
	};
	return (
		<FormWrapper title="Banner and Genres" allError={errors["allFields"]}>
			<div className="flex flex-col items-start justify-center w-full h-full gap-8 sm:max-w-[30vw]">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="bannerpicture" className="font-bold text-lg">Banner Picture</Label>
						<p className=" font-extralight ml-1 text-sm">(max 32MB)</p>
					</div>
					<Input id="bannerpicture" className="border-[1px] border-grey-200 border-solid" type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUploaded} />
					<p className="text-red-500" hidden={imageError === ""}>
						{imageError}
					</p>
				</div>
				{bannerPicture && (
					<div className="flex flex-col gap-2 w-full justify-center items-center">
						<Label htmlFor="bannerPicturePreview" className="font-bold text-lg">Preview</Label>
						<img
							id="bannerPicturePreview"
							src={URL.createObjectURL(bannerPicture)}
							alt={"Banner Picture Preview"}
							className="w-[400px] xl:aspect-[1400/400] lg:aspect-[1400/500] md:aspect-[1400/600] aspect-[1400/900] border-[4px] border-solid border-black rounded-lg object-cover"
						/>
					</div>
				)}
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-col gap-2 w-full">
						<div className="flex flex-row justify-start items-center m-0 p-0">
							<Label className="font-bold text-lg">Choose Your Genre(s)</Label>
							<p className="text-red-500">*</p>
							<p className=" font-extralight ml-1 text-sm">(min 1)</p>
						</div>
						{errors.genres && <p className="text-red-500">{errors.genres}</p>}
					</div>
					<div className="flex flex-row gap-2 flex-wrap">
						{sortedGenres.map((genre) => (
							<Badge variant={genreList.includes(genre) ? "default" : "outline"} onClick={(event) => handleGenreClicked(event, genre)} key={genre.id} className="hover:cursor-pointer">{genre.name}</Badge>
						))}
					</div>
				</div>
			</div>
		</FormWrapper>
	);
}
