import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ValidationFieldErrorMap } from "../form/useMultiStepForm";
import { CreatedArtist } from "../form/registration/Label/ChooseArtists";

interface CreateArtistProps {
	artist: CreatedArtist;
	index: number;
	fieldChange: (artist: CreatedArtist, index: number) => void;
	artistDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => void;
	errors: ValidationFieldErrorMap;
}

const CreateArtist = (props: CreateArtistProps) => {
	const { artist, index, fieldChange, artistDelete, errors } = props;
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imageError, setImageError] = useState("");
	function handleImageUploaded() {
		if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
			const file = fileInputRef.current.files[0];
			if (file.size <= 32 * 1024 * 1024) {
				fieldChange({ ...artist, profilePicture: file }, index);
				setImageError("");
			} else {
				setImageError("Image size exceeds the limit.");
			}
		}
	}

	function handleNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
		fieldChange({ ...artist, artistName: event.target.value }, index);
	}

	return (
		<div className="w-full h-fit rounded-2xl p-4 shadow-input bg-white dark:bg-black flex md:flex-row flex-col items-center justify-start gap-2 relative">
			<img
				id="profilePicturePreview"
				src={artist.profilePicture instanceof File ? URL.createObjectURL(artist.profilePicture) : artist.profilePicture}
				alt={"Profile Picture Preview"}
				className="w-[148px] aspect-square border-[4px] border-solid border-black rounded-lg object-cover"
			/>
			<div className="flex flex-col gap-2 w-full">
				<div className="flex flex-row justify-start items-center m-0 p-0">
					<Label htmlFor="profilepicture" className="font-bold text-md">
						Profile Picture (Max 32MB)
					</Label>
				</div>
				<Input id="profilepicture" className="border-[1px] border-grey-200 border-solid" type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUploaded} />
				{imageError !== "" && <p className="text-red-500">{imageError}</p>}
			</div>
			<div className="flex flex-col gap-2 w-full">
				<div className="flex flex-row justify-start items-center m-0 p-0">
					<Label htmlFor="artistname" className="font-bold text-md">
						Artist Name
					</Label>
				</div>
				<Input id="artistname" className="border-[1px] border-grey-200 border-solid" type="text" onChange={handleNameChanged} placeholder="Artist name..." value={artist.artistName} />
				{errors[`newArtists${index}`] !== "" && <p className="text-red-500">{errors[`newArtists${index}`]}</p>}
			</div>
			<Button onClick={(event) => artistDelete(event, index)} className="w-fit absolute top-1 right-1 rounded-full" variant="destructive" type="button">
				<TrashIcon className="h-6 w-6" />
			</Button>
		</div>
	);
};

export default CreateArtist;
