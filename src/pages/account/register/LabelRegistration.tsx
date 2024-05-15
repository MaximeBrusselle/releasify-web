import { useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { ChooseArtists } from "@/components/form/registration/Label/ChooseArtists";
import { PfpAndGenres } from "@/components/form/registration/Label/PfpAndGenres";
import { Socials } from "@/components/form/registration/Label/Socials";
import { AccountData } from "@/components/form/registration/Label/AccountData";
import { Genre } from "@/data/genres/genreTypes";
import { SocialInfo } from "@/data/other/socialTypes";
import { useState } from "react";
import { ValidationFieldErrorMap, ValidationReturn } from "@/components/form/useMultiStepForm";
import { useNavigate } from "react-router-dom";
import { ArtistIndex } from "@/data/artists/artistTypes";
import { registerLabel } from "@/data/api/registerLabel";

interface LabelRegistrationData {
	labelname: string;
	email: string;
	password: string;
	confirmPassword: string;
	profilePicture: File | null;
	genreList: Genre[];
	labelSocials: SocialInfo[];
	artists: ArtistIndex[];
	newArtists: ArtistIndex[];
}


function LabelRegistration() {
	const navigate = useNavigate();
	const INITIAL_DATA: LabelRegistrationData = {
		labelname: "",
		email: "",
		password: "",
		confirmPassword: "",
		profilePicture: null,
		genreList: [],
		labelSocials: [],
		artists: [],
		newArtists: []
	};
	const [data, setData] = useState<LabelRegistrationData>(INITIAL_DATA);
	const [errors, setErrors] = useState<ValidationFieldErrorMap>({});

	function updateFields(newData: Partial<LabelRegistrationData>) {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	}

	const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep, validateAccountData, validateChooseArtists, validatePfpAndGenres, validateSocials } = useMultiStepForm([
		<AccountData {...data} updateFields={updateFields} errors={errors} />,
		<PfpAndGenres {...data} updateFields={updateFields} errors={errors} />,
		<ChooseArtists {...data} updateFields={updateFields} errors={errors} />,
		<Socials {...data} updateFields={updateFields} errors={errors} />,
	]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validate the current step before allowing submission
		const validationFunctions = [validateAccountData, validatePfpAndGenres, validateChooseArtists, validateSocials];
		const { isValid, errors }: ValidationReturn = validationFunctions[currentStepIndex](data);

		if (isValid) {
			if (!isLastStep) {
				setErrors({});
				return nextStep();
			}
			const result = await registerLabel(data);
			if(result?.message) {
				setErrors({ all: result.message });
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
