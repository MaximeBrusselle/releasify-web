import { ValidationFieldErrorMap, ValidationReturn, useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { addRelease } from "@/data/api/release/addRelease";
import { Genre } from "@/data/genres/genreTypes";
import { LabelDetail } from "@/data/labels/labelTypes";
import { ReleasePlatform } from "@/data/releases/releaseTypes";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { validateReleaseGeneral, validateReleaseArtists, validateReleaseLabel, validateReleaseUrls, validateReleasePfpAndGenres } from "@/components/form/validations";
import { PfpAndGenres } from "@/components/form/release/PfpAndGenres";
import { ReleaseGeneral } from "@/components/form/release/ReleaseGeneral";
import { ArtistDetail } from "@/data/artists/artistTypes";
import { ChooseArtists } from "@/components/form/release/artist/ChooseArtists";
import { ChooseLabelViewType } from "@/components/form/registration/Artist/ChooseLabel";
import { ChooseLabel } from "@/components/form/release/artist/ChooseLabel";
import { Socials } from "@/components/form/release/Socials";
import toast from "react-hot-toast";
import { getArtists } from "@/data/api/artist/getArtists";
import { getLabels } from "@/data/api/label/getLabels";
import { CreatedArtist } from "@/components/form/registration/Label/ChooseArtists";
import { useNavigate } from "react-router-dom";

type AddReleaseData = {
	name: string;
	description: string;
	releaseArtists: string[];
	newArtists: CreatedArtist[];
	picture: File | null;
	urls: ReleasePlatform[];
	genreList: Genre[];
	releaseDate: Date | undefined;
	announcementDate: Date;
	labelType: ChooseLabelViewType;
	label: string | null;
	newLabel: any;
};

export type { AddReleaseData };

export const ArtistAddRelease = () => {
	let initialized = useRef(false);
	const navigate = useNavigate();
	const [firebaseArtists, setFirebaseArtists] = useState<ArtistDetail[]>([]);
	const [firebaseLabels, setFirebaseLabels] = useState<LabelDetail[]>([]);
	const userType = JSON.parse(localStorage.getItem("userData")!).type;

	useEffect(() => {
		if (initialized.current) return;
		if (userType === "label") {
			initialized.current = true;
			toast.error("You are not an artist, redirected to add release as label.")
			navigate("/profile/releases/addAsLabel");
		}
	}, [userType, navigate]);
	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;
		async function fetchData() {
			const fetchedArtists = await getArtists();
			setFirebaseArtists(fetchedArtists);
			const fetchedLabels = await getLabels();
			setFirebaseLabels(fetchedLabels);
		}
		fetchData();
	}, []);

	const INITIAL_DATA: AddReleaseData = {
		name: "",
		description: "",
		releaseArtists: [],
		newArtists: [],
		picture: null,
		urls: [],
		genreList: [],
		releaseDate: new Date(),
		announcementDate: new Date(),
		labelType: { text: "Release is on a label", viewType: "label" },
		label: null,
		newLabel: null,
	};
	const [data, setData] = useState<AddReleaseData>(INITIAL_DATA);
	const [errors, setErrors] = useState<ValidationFieldErrorMap>({});
	const [done, setDone] = useState(false);
	function updateFields(newData: Partial<AddReleaseData>) {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	}

	const { steps, goToStep, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep } = useMultiStepForm([
		<ReleaseGeneral {...data} updateFields={updateFields} errors={errors} />,
		<PfpAndGenres {...data} updateFields={updateFields} errors={errors} />,
		<ChooseArtists {...data} updateFields={updateFields} errors={errors} firebaseArtists={firebaseArtists} />,
		<ChooseLabel {...data} updateFields={updateFields} errors={errors} firebaseLabels={firebaseLabels} />,
		<Socials {...data} updateFields={updateFields} errors={errors} />,
	]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validate the current step before allowing submission
		const validationFunctions = [validateReleaseGeneral, validateReleasePfpAndGenres, validateReleaseArtists, validateReleaseLabel, validateReleaseUrls];
		const { isValid, errors }: ValidationReturn = validationFunctions[currentStepIndex](data);

		if (isValid) {
			if (!isLastStep) {
				setErrors({});
				return nextStep();
			}
			toast.promise(
				new Promise(async (resolve, reject) => {
					const result = await addRelease(data);
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
