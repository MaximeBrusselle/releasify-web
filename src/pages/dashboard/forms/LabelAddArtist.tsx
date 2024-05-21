import { ValidationFieldErrorMap, ValidationReturn, useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateAddArtistToLabel } from "@/components/form/validations";
import { ArtistDetail } from "@/data/artists/artistTypes";
import toast from "react-hot-toast";
import { getArtists } from "@/data/api/artist/getArtists";
import { CreatedArtist } from "@/components/form/registration/Label/ChooseArtists";
import { getLoginLabelArtists } from "@/data/api/label/getLoginLabelArtists";
import { DocumentReference } from "firebase/firestore";
import { AddArtistAsLabel } from "@/components/form/label/AddArtists";
import { addArtistToLabel } from "@/data/api/label/addArtistToLabel";

type LabelAddArtistData = {
	otherArtists: string[];
	newArtists: CreatedArtist[];
};

export type { LabelAddArtistData };

export const LabelAddArtist = () => {
	let initialized = useRef(false);
	const navigate = useNavigate();
	const [firebaseArtists, setFirebaseArtists] = useState<ArtistDetail[]>([]);
	const userType = JSON.parse(localStorage.getItem("userData")!).type;

	useEffect(() => {
		if (initialized.current) return;
		if (userType === "artist") {
			initialized.current = true;
			toast.error("You are not a label, redirected back to profile.");
			navigate("/profile");
		}
	}, [userType, navigate]);
	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;
		async function fetchData() {
			const fetchedArtists = await getArtists();
			const fetchedMyArtists = await getLoginLabelArtists(userType);
			setFirebaseArtists(fetchedArtists.filter((artist) => !fetchedMyArtists.some((myArtist: ArtistDetail) => myArtist.id === artist.id)));
		}
		toast.promise(fetchData(), {
			loading: "Loading artists...",
			success: "Artists loaded successfully!",
			error: "Failed to load artists.",
		});
	}, []);

	const INITIAL_DATA: LabelAddArtistData = {
		otherArtists: [],
		newArtists: [],
	};
	const [data, setData] = useState<LabelAddArtistData>(INITIAL_DATA);
	const [errors, setErrors] = useState<ValidationFieldErrorMap>({});
	const [done, setDone] = useState(false);

	function updateFields(newData: Partial<LabelAddArtistData>) {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	}

	const { steps, goToStep, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep } = useMultiStepForm([
		<AddArtistAsLabel {...data} updateFields={updateFields} errors={errors} firebaseArtists={firebaseArtists} />,
	]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validate the current step before allowing submission
		const validationFunctions = [validateAddArtistToLabel];
		const { isValid, errors }: ValidationReturn = validationFunctions[currentStepIndex](data);

		if (isValid) {
			if (!isLastStep) {
				setErrors({});
				return nextStep();
			}
			toast.promise(
				new Promise(async (resolve, reject) => {
					const result = await addArtistToLabel(userType, data);
					if (result?.code !== "success") {
						setErrors({ all: result.message });
						reject(result.message);
						return;
					}
					setDone(true);
					resolve(result);
				}),
				{
					loading: "Adding artists...",
					success: "Artists added successfully!",
					error: "Failed to add artists.",
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
					<p className="text-semibold text-2xl text-center">Artists added succesfully!</p>
					<button
						onClick={() => {
							setData(INITIAL_DATA);
							goToStep(0);
							setDone(false);
						}}
						className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
					>
						Add More Artists
					</button>
					<Link to={"/profile/artists"}>
						<button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
							Go To Artists
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
								{isLastStep ? "Add Artists" : "Next"}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
