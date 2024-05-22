import { FormWrapper } from "@/components/form/FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationFieldErrorMap } from "@/components/form/useMultiStepForm";
import { Genre } from "@/data/genres/genreTypes";
import { genres } from "@/data/genres/genres";
import { Badge } from "@/components/ui/badge";

type GeneralInfoData = {
	name: string;
	realName: string;
	description: string | undefined;
	genreList: Genre[];
	bookingEmail: string;
};

type GeneralInfoProps = GeneralInfoData & {
	updateFields: (newData: Partial<GeneralInfoData>) => void;
	errors: ValidationFieldErrorMap;
};

export function GeneralInfo({ name, realName, description, genreList, bookingEmail, updateFields, errors }: GeneralInfoProps) {
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
		<FormWrapper title="Profile Picture and Genres" allError={errors["allFields"]}>
			<div className="flex flex-col items-start justify-center w-full h-full gap-8 sm:max-w-[30vw]">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="description" className="font-bold text-lg">
							Name
						</Label>
						<p className="text-red-500">*</p>
						<p className="font-extralight ml-1 text-sm">(max 50 characters)</p>
					</div>
					<Input type="text" id="description" className="border-[1px] border-grey-200 border-solid w-full" autoFocus value={name} onChange={(e) => updateFields({ name: e.target.value })} />
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="description" className="font-bold text-lg">
							Real Name
						</Label>
						{errors.realName && <p className="text-red-500">{errors.realName}</p>}
					</div>
					<Input
						type="text"
						id="description"
						className="border-[1px] border-grey-200 border-solid w-full"
						autoFocus
						value={realName}
						onChange={(e) => updateFields({ realName: e.target.value })}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="description" className="font-bold text-lg">
							Description
						</Label>
						<p className=" font-extralight ml-1 text-sm">(max 100 characters)</p>
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
						<Label htmlFor="bookingEmail" className="font-bold text-lg">
							Bookings Email
						</Label>
						{errors.contactemail && <p className="text-red-500">{errors.contactemail}</p>}
					</div>
					<Input
						type="email"
						id="bookingEmail"
						className="border-[1px] border-grey-200 border-solid w-full"
						autoFocus
						value={bookingEmail}
						onChange={(e) => updateFields({ bookingEmail: e.target.value })}
					/>
				</div>
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
