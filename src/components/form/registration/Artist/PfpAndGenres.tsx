import { FormWrapper } from "@/components/form/FormWrapper";
import { Genre } from "@/data/genres/genreTypes";
import React, { useRef } from "react";

type PfpAndGenresData = {
	profilePicture: File | null;
	genres: Genre[];
};

type PfpAndGenresProps = PfpAndGenresData & {
	profilePicture: File | null;
	genres: Genre[];
	updateFields: (newData: Partial<PfpAndGenresData>) => void;
};

export function PfpAndGenres({ profilePicture, genres, updateFields }: PfpAndGenresProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleImageUploaded = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
			const file = fileInputRef.current.files[0];
			if (file.size <= 32 * 1024 * 1024) {
				// 32MB limit
				updateFields({
					profilePicture: file,
				});
			} else {
				console.log("Image size exceeds the limit.");
			}
		}
	};
	const addGenre = (index: number, newGenre: Genre) => {
		updateFields({
			genres: genres.map((genre, i) => (i === index ? newGenre : genre)),
		});
	};
	return (
		<FormWrapper title="Profile Picture and Genres">
			<div className="flex flex-col items-start justify-center w-full h-full gap-8"></div>
		</FormWrapper>
	);
}
