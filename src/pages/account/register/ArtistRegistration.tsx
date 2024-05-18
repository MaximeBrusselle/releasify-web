import { useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { ChooseLabel, ChooseLabelViewType } from "@/components/form/registration/Artist/ChooseLabel";
import { GeneralInfo } from "@/components/form/registration/Artist/GeneralInfo";
import { Socials } from "@/components/form/registration/Artist/Socials";
import { AccountData } from "@/components/form/registration/Artist/AccountData";
import { Genre } from "@/data/genres/genreTypes";
import { SocialInfo } from "@/data/other/socialTypes";
import { LabelDetail, LabelIndex } from "@/data/labels/labelTypes";
import { useContext, useEffect, useRef, useState } from "react";
import { ValidationFieldErrorMap, ValidationReturn } from "@/components/form/useMultiStepForm";
import { useNavigate } from "react-router-dom";
import { registerArtist } from "@/data/api/registerArtist";
import { AuthContext } from "@/auth/AuthProvider";
import { doSignOut } from "@/auth/auth";
import { validateAccountData, validateBannerAndGenres, validateChooseLabel, validateGeneralInfo, validateSocials } from "@/components/form/validations";
import toast from "react-hot-toast";
import { getLabels } from "@/data/api/getLabels";
import { BannerAndGenres } from "@/components/form/registration/Artist/BannerAndGenres";

interface ArtistRegistrationData {
	artistname: string;
	realname: string;
	email: string;
	password: string;
	confirmPassword: string;
	description: string;
	bookingEmail: string;
	profilePicture: File | null;
	bannerPicture: File | null;
	genreList: Genre[];
	artistSocials: SocialInfo[];
	labelType: ChooseLabelViewType;
	label: LabelIndex | null;
}

function ArtistRegistration() {
	let initialized = useRef(false);
	const [firebaseLabels, setFirebaseLabels] = useState<LabelDetail[]>([]);
	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;
			async function fetchData() {
				const fetchedLabels = await getLabels();
				setFirebaseLabels(fetchedLabels);
			}
			toast.promise(fetchData(), {
				loading: "Fetching labels...",
				success: "Labels fetched",
				error: "Error fetching labels",
			});
		}
	}, []);
	const { isLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const INITIAL_DATA: ArtistRegistrationData = {
		artistname: "",
		realname: "",
		email: "",
		password: "",
		confirmPassword: "",
		description: "",
		bookingEmail: "",
		labelType: { text: "I'm Signed To A Label", viewType: "label" },
		profilePicture: null,
		bannerPicture: null,
		genreList: [],
		artistSocials: [],
		label: null,
	};
	const [data, setData] = useState<ArtistRegistrationData>(INITIAL_DATA);
	const [errors, setErrors] = useState<ValidationFieldErrorMap>({});

	function updateFields(newData: Partial<ArtistRegistrationData>) {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	}

	const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep } = useMultiStepForm([
		<AccountData {...data} updateFields={updateFields} errors={errors} />,
		<GeneralInfo {...data} updateFields={updateFields} errors={errors} />,
		<BannerAndGenres {...data} updateFields={updateFields} errors={errors} />,
		<ChooseLabel {...data} updateFields={updateFields} errors={errors} labels={firebaseLabels} />,
		<Socials {...data} updateFields={updateFields} errors={errors} />,
	]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validate the current step before allowing submission
		const validationFunctions = [validateAccountData, validateGeneralInfo, validateBannerAndGenres, validateChooseLabel, validateSocials];
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
				const result = await registerArtist(data);
				if (result?.message) {
					toast.error(result.message);
					setErrors({ all: result.message });
					return;
				}
			} catch (error: any) {
				console.error(`Failed to register artist: ${error}`);
				toast.error("Failed to register artist");
				setErrors({ all: "Failed to register artist" });
				return;
			}
			toast.success("Account created successfully");
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

export default ArtistRegistration;
export type { ArtistRegistrationData };
