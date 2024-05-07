import { useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { LabelForm, LabelFormViewType } from "@/components/form/registration/Artist/LabelForm";
import { PfpAndGenres } from "@/components/form/registration/Artist/PfpAndGenres";
import { Socials } from "@/components/form/registration/Artist/Socials";
import { AccountData } from "@/components/form/registration/Artist/AccountData";
import { Genre } from "@/data/genres/genreTypes";
import { SocialInfo } from "@/data/other/socialTypes";
import { LabelIndex } from "@/data/labels/labelTypes";
import { useState } from "react";
import { ValidationFieldErrorMap, ValidationReturn } from "@/components/form/useMultiStepForm";
import { useNavigate } from "react-router-dom";

interface ArtistRegistrationData {
	artistname: string;
	realname: string;
	email: string;
	password: string;
	confirmPassword: string;
	profilePicture: File | null;
	artistGenres: Genre[];
	artistSocials: SocialInfo[];
	labelType: LabelFormViewType;
	label: LabelIndex | null;
}

interface ArtistRegistrationProps {
	handleLogin: () => void;
}

function ArtistRegistration(props: ArtistRegistrationProps) {
	const {handleLogin} = props;
	const navigate = useNavigate();
	const INITIAL_DATA: ArtistRegistrationData = {
		artistname: "",
		realname: "",
		email: "",
		password: "",
		confirmPassword: "",
		labelType: { text: "I'm Signed To A Label", viewType: "label" },
		profilePicture: null,
		artistGenres: [],
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

	const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep, validateAccountData, validateLabelForm, validatePfpAndGenres, validateSocials } = useMultiStepForm([
		<AccountData {...data} updateFields={updateFields} errors={errors}/>,
		<PfpAndGenres {...data} updateFields={updateFields} errors={errors}/>,
		<LabelForm {...data} updateFields={updateFields} errors={errors}/>,
		<Socials {...data} updateFields={updateFields} errors={errors}/>,
	]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		// Validate the current step before allowing submission
		const validationFunctions = [validateAccountData, validatePfpAndGenres, validateLabelForm, validateSocials];
		const {isValid, errors}: ValidationReturn = validationFunctions[currentStepIndex](data);
	
		if (isValid) {
			if (!isLastStep){
				setErrors({});
				return nextStep();
			}
			handleLogin();
			alert("Account created!");
			console.log(data);
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
