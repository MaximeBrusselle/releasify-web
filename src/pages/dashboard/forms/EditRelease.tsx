import { ValidationFieldErrorMap, ValidationReturn, useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { Genre } from "@/data/genres/genreTypes";
import { ReleasePlatform } from "@/data/releases/releaseTypes";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArtistDetail } from "@/data/artists/artistTypes";
import { Socials } from "@/components/form/release/edit/Socials";
import { GeneralInfo } from "@/components/form/release/edit/GeneralInfo";
import { PictureAndGenres } from "@/components/form/release/edit/PictureAndGenres";
import { getArtists } from "@/data/api/artist/getArtists";
import { getLoginLabelArtists } from "@/data/api/label/getLoginLabelArtists";
import { CreatedArtist } from "@/components/form/registration/Label/ChooseArtists";
import { ArtistsLabel } from "@/components/form/release/edit/ArtistsLabel";
import {
	validateEditReleaseArtistsArtist,
	validateEditReleaseArtistsLabel,
	validateEditReleaseGeneralInfo,
	validateEditReleasePictureAndGenres,
	validateEditReleaseSocials,
} from "@/components/form/validations";
import { ArtistsArtist } from "@/components/form/release/edit/ArtistsArtist";
import { editRelease } from "@/data/api/release/editRelease";

type EditReleaseDetails = {
	id: string;
	name: string;
	description: string;
	releaseDate: Date | undefined;
	urls: ReleasePlatform[];
	genreList: Genre[];
	picture: File | string;
	artists: ArtistDetail[];
	newArtists: CreatedArtist[];
};

export type { EditReleaseDetails };

export const EditRelease = () => {
	let initialized = useRef(false);
	const navigate = useNavigate();
	const [firebaseArtists, setFirebaseArtists] = useState<ArtistDetail[]>([]);
	const [myArtists, setMyArtists] = useState<ArtistDetail[]>([]);
	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;
		if (userType === "user") {
			toast.error("You do not have releases");
			navigate("/profile");
			return;
		}
		const releaseData = JSON.parse(localStorage.getItem("releaseData")!);
		if (!releaseData) throw new Error("Could not find release to edit");
		const newArtists = releaseData.artists.filter((artist: ArtistDetail) => !artist.id).map((artist: ArtistDetail) => ({ artistName: artist.artistName, profilePicture: artist.profilePicture }));
		const artists = releaseData.artists.filter((artist: ArtistDetail) => artist.id);
		const dataToSet: EditReleaseDetails = {
			id: releaseData.id,
			name: releaseData.name,
			description: releaseData.description,
			releaseDate: releaseData.releaseDate,
			urls: releaseData.urls,
			genreList: releaseData.genres,
			picture: releaseData.picture,
			artists: artists,
			newArtists: newArtists,
		};
		async function fetchData() {
			return new Promise<ArtistDetail[]>(async (resolve) => {
				const fetchedArtists = await getArtists();
				if (userType === "artist") {
					setFirebaseArtists(fetchedArtists);
				} else if (userType === "label") {
					const fetchedMyArtists = await getLoginLabelArtists(userType);
					setMyArtists(fetchedMyArtists);
					setFirebaseArtists(fetchedArtists.filter((artist) => !fetchedMyArtists.find((myArtist: ArtistDetail) => myArtist.id === artist.id)));
					resolve(fetchedMyArtists);
				}
				resolve([]);
			});
		}
		try {
			async function y() {
				const fbmArtists = await fetchData();
				const x = fbmArtists.filter((artist: ArtistDetail) => newArtists.some((myArtist: CreatedArtist) => myArtist.artistName === artist.artistName));
				dataToSet.artists = dataToSet.artists.concat(x);
				setData(dataToSet);
				setOriginalData(dataToSet);
				toast.success("Ready to edit release");
			}

			y();
		} catch (error: any) {
			toast.error(error.message);
			navigate("/profile/releases");
		}
	}, []);

	const userType = JSON.parse(localStorage.getItem("userData")!).type;
	const INITIAL_DATA: EditReleaseDetails = {
		id: "",
		name: "",
		description: "",
		releaseDate: undefined,
		urls: [],
		genreList: [],
		picture: "",
		artists: [],
		newArtists: [],
	};
	const [data, setData] = useState<EditReleaseDetails>(INITIAL_DATA);
	const [originalData, setOriginalData] = useState<EditReleaseDetails>(INITIAL_DATA);
	const [errors, setErrors] = useState<ValidationFieldErrorMap>({});
	const [done, setDone] = useState(false);
	function updateFields(newData: Partial<EditReleaseDetails>) {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	}
	const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep } = useMultiStepForm(
		userType === "label"
			? [
					<GeneralInfo {...data} updateFields={updateFields} errors={errors} />,
					<PictureAndGenres {...data} updateFields={updateFields} errors={errors} />,
					<ArtistsLabel {...data} updateFields={updateFields} errors={errors} firebaseArtists={firebaseArtists} firebaseMyArtists={myArtists} />,
					<Socials {...data} updateFields={updateFields} errors={errors} />,
			  ]
			: [
					<GeneralInfo {...data} updateFields={updateFields} errors={errors} />,
					<PictureAndGenres {...data} updateFields={updateFields} errors={errors} />,
					<ArtistsArtist {...data} updateFields={updateFields} errors={errors} firebaseArtists={firebaseArtists} />,
					//TODO: Edit Label Release
					<Socials {...data} updateFields={updateFields} errors={errors} />,
			  ]
	);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validate the current step before allowing submission
		const validationFunctions =
			userType === "label"
				? [validateEditReleaseGeneralInfo, validateEditReleasePictureAndGenres, validateEditReleaseArtistsLabel, validateEditReleaseSocials]
				: [validateEditReleaseGeneralInfo, validateEditReleasePictureAndGenres, validateEditReleaseArtistsArtist, validateEditReleaseSocials];
		const { isValid, errors }: ValidationReturn = validationFunctions[currentStepIndex](data);

		if (isValid) {
			if (!isLastStep) {
				setErrors({});
				return nextStep();
			}
			try {
				const result = await editRelease(data, originalData, userType);
				if (result.code !== "success") throw new Error(result.message);
				localStorage.removeItem("releaseData");
				localStorage.removeItem("releaseDate");
				setDone(true);
				toast.success("Release edited successfully");
			} catch (error: any) {
				toast.error(error.message);
			}
		} else {
			setErrors(errors!);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center">
			{done ? (
				<div className="rounded-2xl p-4 shadow-input bg-white dark:bg-black font-sans w-[95%] flex flex-col items-center justify-start gap-5 m-4">
					<p className="text-semibold text-2xl text-center">Release edited successfully!</p>
					<Link to={"/profile/releases"}>
						<button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
							Go To Releases
						</button>
					</Link>
				</div>
			) : (
				<div className="rounded-2xl p-4 shadow-input bg-white dark:bg-black font-sans w-[95%] flex flex-col items-center justify-start gap-5 m-4">
					<Progress value={(100 * (currentStepIndex + 1)) / steps.length} />
					<form onSubmit={handleSubmit} className="w-full">
						{currentStep}
						<div className="flex flex-row justify-center items-center gap-4">
							{!isFirstStep && (
								<button
									type="button"
									onClick={prevStep}
									className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
								>
									Back
								</button>
							)}
							<button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
								{isLastStep ? "Edit Release" : "Next"}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
