import { FormWrapper } from "@/components/form/FormWrapper";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Genre } from "@/data/genres/genreTypes";
import React, { useRef, useState } from "react";
import { genres } from "@/data/genres/genres";
import { ValidationFieldErrorMap } from "@/components/form/useMultiStepForm";

type PictureAndGenresData = {
	picture: File | string;
	genreList: Genre[];
};

type PictureAndGenresProps = PictureAndGenresData & {
	updateFields: (newData: Partial<PictureAndGenresData>) => void;
	errors: ValidationFieldErrorMap;
};

export function PictureAndGenres({ picture, genreList, updateFields, errors }: PictureAndGenresProps) {
	const [pfpError, setpfpError] = useState("");
	const pfpUploadRef = useRef<HTMLInputElement>(null);
	const uploadPfp = () => {
		if (pfpUploadRef.current?.files && pfpUploadRef.current.files.length > 0) {
			const file = pfpUploadRef.current.files[0];
			if (file.size <= 32 * 1024 * 1024) {
				updateFields({
					picture: file,
				});
				setpfpError("");
			} else {
				setpfpError("Image size exceeds the limit.");
			}
		}
	};

	const sortedGenres = genres.sort((a, b) => a.name.localeCompare(b.name));
	const handleGenreClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, newGenre: Genre) => {
		event.preventDefault();
		if (isBadgeSelected(newGenre)) {
			updateFields({ genreList: genreList.filter((genre) => genre.id !== newGenre.id) });
		} else {
			updateFields({ genreList: [...genreList, newGenre] });
		}
	};
	const isBadgeSelected = (genre: Genre) => genreList.some((el) => el.id === genre.id);
	return (
		<FormWrapper title="Cover Art and Genres" allError={errors["allFields"]}>
			<p className="mb-4">Not uploading a picture keeps the current one.</p>
			<div className="flex flex-col items-start justify-center w-full h-full gap-8 sm:max-w-[30vw]">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="pfp" className="font-bold text-lg">
							Cover Art
						</Label>
						<p className=" font-extralight ml-1 text-sm">(max 32MB)</p>
					</div>
					<Input id="pfp" className="border-[1px] border-grey-200 border-solid" type="file" accept="image/*" ref={pfpUploadRef} onChange={uploadPfp} />
					<p className="text-red-500" hidden={pfpError === ""}>
						{pfpError}
					</p>
				</div>
				{picture && (
					<div className="flex flex-col gap-2 w-full justify-center items-center">
						<Label htmlFor="CoverPicturePreview" className="font-bold text-lg">
							Preview
						</Label>
						<img
							id="CoverPicturePreview"
							src={typeof picture === "string" ? picture : URL.createObjectURL(picture)}
							alt={"Cover Picture Preview"}
							className="w-36 aspect-square border-[4px] border-solid border-black rounded-lg object-cover"
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
							<Badge variant={isBadgeSelected(genre) ? "default" : "outline"} onClick={(event) => handleGenreClicked(event, genre)} key={genre.id} className="hover:cursor-pointer">
								{genre.name}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</FormWrapper>
	);
}
