import { ValidationFieldErrorMap, ValidationReturn, useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { Genre } from "@/data/genres/genreTypes";
import { ReleasePlatform } from "@/data/releases/releaseTypes";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateReleaseGeneral, validateLabelReleaseArtists, validateReleaseUrls, validateReleasePfpAndGenres } from "@/components/form/validations";
import { PfpAndGenres } from "@/components/form/release/PfpAndGenres";
import { ReleaseGeneral } from "@/components/form/release/ReleaseGeneral";
import { ArtistDetail } from "@/data/artists/artistTypes";
import { Socials } from "@/components/form/release/Socials";
import toast from "react-hot-toast";
import { getArtists } from "@/data/api/artist/getArtists";
import { CreatedArtist } from "@/components/form/registration/Label/ChooseArtists";
import { addReleaseAsLabel } from "@/data/api/release/addReleaseAsLabel";
import { ChooseArtistsAsLabel } from "@/components/form/release/label/ChooseArtists";
import { getLoginLabelArtists } from "@/data/api/label/getLoginLabelArtists";

type LabelAddReleaseData = {
	name: string;
	description: string;
	myArtists: ArtistDetail[];
	otherArtists: string[];
	newArtists: CreatedArtist[];
	picture: File | null;
	urls: ReleasePlatform[];
	genreList: Genre[];
	releaseDate: Date | undefined;
	announcementDate: Date;
};

export type { LabelAddReleaseData };

export const LabelAddRelease = () => {
	let initialized = useRef(false);
	const navigate = useNavigate();
	const [firebaseArtists, setFirebaseArtists] = useState<ArtistDetail[]>([]);
	const [myArtists, setMyArtists] = useState<ArtistDetail[]>([]);
	const userType = JSON.parse(localStorage.getItem("userData")!).type;

	useEffect(() => {
		if(initialized.current) return;
		if (userType === "artist") {
			initialized.current = true;
			toast.error("You are not a label, redirected to add release as an artist.")
			navigate("/profile/releases/addAsArtist");
		}
	}, [userType, navigate]);
	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;
		async function fetchData() {
			const fetchedArtists = await getArtists();
			const fetchedMyArtists = await getLoginLabelArtists(userType);
			setMyArtists(fetchedMyArtists);
			setFirebaseArtists(fetchedArtists.filter((artist) => !fetchedMyArtists.find((myArtist: ArtistDetail) => myArtist.id === artist.id)));
		}
		fetchData();
	}, []);

	const INITIAL_DATA: LabelAddReleaseData = {
		name: "",
		description: "",
		myArtists: [],
		otherArtists: [],
		newArtists: [],
		picture: null,
		urls: [],
		genreList: [],
		releaseDate: new Date(),
		announcementDate: new Date(),
	};
	const [data, setData] = useState<LabelAddReleaseData>(INITIAL_DATA);
	const [errors, setErrors] = useState<ValidationFieldErrorMap>({});
	const [done, setDone] = useState(false);

	function updateFields(newData: Partial<LabelAddReleaseData>) {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	}

	const { steps, goToStep, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep } = useMultiStepForm([
		<ReleaseGeneral {...data} updateFields={updateFields} errors={errors} />,
		<PfpAndGenres {...data} updateFields={updateFields} errors={errors} />,
		<ChooseArtistsAsLabel {...data} updateFields={updateFields} errors={errors} firebaseArtists={firebaseArtists} firebaseMyArtists={myArtists} />,
		<Socials {...data} updateFields={updateFields} errors={errors} />,
	]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validate the current step before allowing submission
		const validationFunctions = [validateReleaseGeneral, validateReleasePfpAndGenres, validateLabelReleaseArtists, validateReleaseUrls];
		const { isValid, errors }: ValidationReturn = validationFunctions[currentStepIndex](data);

		if (isValid) {
			if (!isLastStep) {
				setErrors({});
				return nextStep();
			}
			toast.promise(
				new Promise(async (resolve, reject) => {
					const result = await addReleaseAsLabel(data);
					if (result?.code !== "success") {
						setErrors({ all: result.message });
						reject(result.message);
						return;
					}
					setDone(true);
					resolve(result);
				}),
				{
					loading: "Adding release...",
					success: "Release added successfully!",
					error: "Failed to add release.",
				}
			);
		} else {
			setErrors(errors!);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center">
			{done ? (
				<div className="rounded-2xl p-4 shadow-input bg-white dark:bg-black font-sans w-[95%] flex flex-col items-center justify-start gap-5 m-4">
					<p className="text-semibold text-2xl text-center">Release added successfully!</p>
					<button
						onClick={() => {
							setData(INITIAL_DATA);
							goToStep(0);
							setDone(false);
						}}
						className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
					>
						Add Another Release
					</button>
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
								{isLastStep ? "Add Release" : "Next"}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
