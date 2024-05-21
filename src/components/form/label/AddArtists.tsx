import { FormWrapper } from "@/components/form/FormWrapper";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ValidationFieldErrorMap } from "@/components/form/useMultiStepForm";
import { ArtistDetail } from "@/data/artists/artistTypes";
import ArtistSelectCard from "@/components/artists/ArtistSelectCard";
import CreateArtist from "@/components/artists/CreateArtist";
import { CreatedArtist } from "../registration/Label/ChooseArtists";

type AddArtistAsLabelView = "otherArtists" | "newArtists";
type AddArtistAsLabelViewType = {
	text: string;
	type: AddArtistAsLabelView;
};

type ChooseArtistData = {
	otherArtists: string[];
	newArtists: CreatedArtist[];
};

type AddArtistAsLabelProps = ChooseArtistData & {
	updateFields: (newData: Partial<ChooseArtistData>) => void;
	errors: ValidationFieldErrorMap;
	firebaseArtists: ArtistDetail[];
};

export function AddArtistAsLabel({ otherArtists, newArtists, updateFields, errors, firebaseArtists }: AddArtistAsLabelProps) {
	function updateArtists(newArtists: string[]) {
		updateFields({
			otherArtists: newArtists,
		});
	}
	function handleArtistSelect(artist: ArtistDetail) {
		if (otherArtists.includes(artist.id!)) {
			updateArtists(otherArtists.filter((el) => el !== artist.id!));
		} else {
			updateArtists(otherArtists.concat(artist.id!));
		}
	}

	const [createdArtists, setCreatedArtists] = useState<CreatedArtist[]>([]);
	function handleCreatedArtistChange(artist: CreatedArtist, index: number) {
		const newCreatedArtists = createdArtists;
		newCreatedArtists[index] = artist;
		setCreatedArtists(newCreatedArtists);
		updateFields({ newArtists: newCreatedArtists });
	}
	function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) {
		event.preventDefault();
		const newCreatedArtists = createdArtists;
		newCreatedArtists.splice(index, 1);
		setCreatedArtists(newCreatedArtists);
		updateFields({ newArtists: newCreatedArtists });
	}
	function addCreateArtist(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();
		setCreatedArtists((prev) => {
			return [...prev, { artistName: "", profilePicture: "https://i.ibb.co/nPh6PCt/default-pfp.jpg" }];
		});
		updateFields({ newArtists: [...createdArtists, { artistName: "", profilePicture: "https://i.ibb.co/nPh6PCt/default-pfp.jpg" }] });
	}

	const viewTypes: AddArtistAsLabelViewType[] = [
		{
			text: "Existing Artists",
			type: "otherArtists",
		},
		{
			text: "Add New Artists",
			type: "newArtists",
		},
	];
	const [view, setView] = useState<AddArtistAsLabelViewType>(viewTypes[0]);

	function updateViewType(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) {
		event.preventDefault();
		if (view.type === viewTypes[index].type) return;
		setView(viewTypes[index]);
	}

	const [filteredOtherArtists, setFilteredOtherArtists] = useState<ArtistDetail[]>(firebaseArtists);
	useEffect(() => {
		setFilteredOtherArtists(firebaseArtists);
	}, [firebaseArtists]);

	const [search, setSearch] = useState<string>("");
	function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newValue = event.target.value;
		setSearch(newValue);
		setFilteredOtherArtists(firebaseArtists.filter((artist) => artist.artistName.toLowerCase().includes(newValue.toLowerCase())));
	}

	return (
		<FormWrapper title="Collab with..." allError={errors["allFields"]}>
			<div className="flex flex-col items-start justify-center w-full h-full gap-8 sm:max-w-[70vw]">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-center items-center m-0 p-0">
						<Label htmlFor="option" className="font-bold text-lg text-center">
							Select An Option
						</Label>
					</div>
					<div className="flex flex-row justify-center items-center flex-wrap gap-4">
						{viewTypes.map((element, index) => (
							<Button key={element.type} onClick={(event) => updateViewType(event, index)} variant={view.type === element.type ? "default" : "outline"}>
								{element.text}
							</Button>
						))}
					</div>
				</div>
				{view.type === "otherArtists" && (
					<div className="flex flex-col gap-2 w-full">
						<div className="flex flex-col gap-2 w-full">
							<div className="flex flex-row justify-start items-center m-0 p-0">
								<Label htmlFor="existingartists" className="font-bold text-lg">
									Select Other Artists
								</Label>
							</div>
						</div>
						<Input className="w-full" value={search} onChange={handleSearchChange} placeholder="Search for an artist..."></Input>
						<div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-x-4 max-h-[50vh] h-fit overflow-y-scroll p-2 w-full gap-y-4 place-items-center">
							{filteredOtherArtists.length === 0 && <p>No artists found</p>}
							{filteredOtherArtists.length > 0 &&
								filteredOtherArtists.map((el) => <ArtistSelectCard key={el.id} artist={el} handleSelect={handleArtistSelect} selectedIds={otherArtists} />)}
						</div>
					</div>
				)}
				{view.type === "newArtists" && (
					<div className="flex flex-col gap-2 w-full">
						<div className="flex flex-col gap-2 w-full">
							<div className="flex flex-row justify-start items-center m-0 p-0">
								<Label htmlFor="newArtists" className="font-bold text-lg">
									Add Artists Not On The Platform
								</Label>
							</div>
							<Button onClick={addCreateArtist} className="w-fit">
								Add Artist
							</Button>
						</div>
						{newArtists.map((artist, index) => (
							<CreateArtist key={index} index={index} artist={artist} fieldChange={handleCreatedArtistChange} artistDelete={handleDelete} errors={errors} />
						))}
					</div>
				)}
			</div>
		</FormWrapper>
	);
}
