import { useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { ChooseArtists, CreatedArtist } from "@/components/form/registration/Label/ChooseArtists";
import { BannerAndGenres } from "@/components/form/registration/Label/BannerAndGenres";
import { Socials } from "@/components/form/registration/Label/Socials";
import { AccountData } from "@/components/form/registration/Label/AccountData";
import { Genre } from "@/data/genres/genreTypes";
import { SocialInfo } from "@/data/other/socialTypes";
import { useContext, useEffect, useRef, useState } from "react";
import { ValidationFieldErrorMap, ValidationReturn } from "@/components/form/useMultiStepForm";
import { useNavigate } from "react-router-dom";
import { ArtistDetail, ArtistIndex } from "@/data/artists/artistTypes";
import { registerLabel } from "@/data/api/registerLabel";
import { AuthContext } from "@/auth/AuthProvider";
import { doSignOut } from "@/auth/auth";
import { validateAccountData, validateBannerAndGenres, validateChooseArtists, validateGeneralInfo, validateSocials } from "@/components/form/validations";
import toast from "react-hot-toast";
import { getArtists } from "@/data/api/getArtists";
import { GeneralInfo } from "@/components/form/registration/Label/GeneralInfo";

interface LabelRegistrationData {
	labelname: string;
	email: string;
	password: string;
	confirmPassword: string;
	description: string;
	contactEmail: string;
	profilePicture: File | null;
	bannerPicture: File | null;
	genreList: Genre[];
	labelSocials: SocialInfo[];
	artists: ArtistDetail[];
	newArtists: CreatedArtist[];
}

function LabelRegistration() {
	let initialized = useRef(false);
	const [firebaseArtists, setFirebaseArtists] = useState<ArtistDetail[]>([]);
	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;
			async function fetchData() {
				const fetchedArtists = await getArtists();
				setFirebaseArtists(fetchedArtists);
			}
			toast.promise(fetchData(), {
				loading: "Fetching artists...",
				success: "Artists fetched",
				error: "Error fetching artists",
			});
		}
	}, []);
	const { isLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const INITIAL_DATA: LabelRegistrationData = {
		labelname: "",
		email: "",
		password: "",
		confirmPassword: "",
		description: "",
		contactEmail: "",
		profilePicture: null,
		bannerPicture: null,
		genreList: [],
		labelSocials: [],
		artists: [],
		newArtists: [],
	};
	const [data, setData] = useState<LabelRegistrationData>(INITIAL_DATA);
	const [errors, setErrors] = useState<ValidationFieldErrorMap>({});

	function updateFields(newData: Partial<LabelRegistrationData>) {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	}

	const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep } = useMultiStepForm([
		<AccountData {...data} updateFields={updateFields} errors={errors} />,
		<GeneralInfo {...data} updateFields={updateFields} errors={errors} />,
		<BannerAndGenres {...data} updateFields={updateFields} errors={errors} />,
		<ChooseArtists {...data} updateFields={updateFields} errors={errors} existingArtists={firebaseArtists} />,
		<Socials {...data} updateFields={updateFields} errors={errors} />,
	]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validate the current step before allowing submission
		const validationFunctions = [validateAccountData, validateGeneralInfo, validateBannerAndGenres, validateChooseArtists, validateSocials];
		const { isValid, errors }: ValidationReturn = validationFunctions[currentStepIndex](data);

		if (isValid) {
			if (!isLastStep) {
				setErrors({});
				return nextStep();
			}
			if (isLoggedIn) {
				await doSignOut();
			}
			try {
				const result = await registerLabel(data);
				if (result?.message) {
					toast.error(result.message);
					setErrors({ all: result.message });
					return;
				}
			} catch (error: any) {
				console.error(error.message);
				setErrors({ all: error.message });
				return;
			}
			navigate("/");
		} else {
			setErrors(errors!);
		}
	};

	return (
		<div className="rounded-2xl p-4 shadow-input bg-white dark:bg-black font-sans w-full flex flex-col items-center justify-start gap-5">
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
						{isLastStep ? "Create Account" : "Next"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default LabelRegistration;
export type { LabelRegistrationData };
