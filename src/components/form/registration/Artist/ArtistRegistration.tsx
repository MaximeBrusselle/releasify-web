import { useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/form/registration/Artist/Label";
import { PfpAndGenres } from "@/components/form/registration/Artist/PfpAndGenres";
import { Socials } from "@/components/form/registration/Artist/Socials";
import { AccountData } from "@/components/form/registration/Artist/AccountData";
import { Genre } from "@/data/genres/genreTypes";
import { SocialInfo } from "@/data/other/socialTypes";
import { LabelIndex } from "@/data/labels/labelTypes";
import { useState } from "react";

interface ArtistRegistrationData {
	artistname: string;
	realname: string;
	email: string;
	password: string;
	confirmPassword: string;
	profilePicture: File | null;
	genres: Genre[];
	socials: SocialInfo[];
	label: LabelIndex | null;
}

function ArtistRegistration() {
	const INITIAL_DATA: ArtistRegistrationData = {
		artistname: "",
		realname: "",
		email: "",
		password: "",
		confirmPassword: "",
		profilePicture: null,
		genres: [],
		socials: [],
		label: null,
	};
	const [data, setData] = useState<ArtistRegistrationData>(INITIAL_DATA);

	function updateFields(newData: Partial<ArtistRegistrationData>) {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	}

	const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep } = useMultiStepForm([
		<AccountData {...data} updateFields={updateFields} />,
		<PfpAndGenres {...data} updateFields={updateFields} />,
		<Label {...data} updateFields={updateFields} />,
		<Socials {...data} updateFields={updateFields} />,
	]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!isLastStep) return nextStep();
		alert("Account created!");
		console.log(data);
	};

	return (
		<div className="rounded-2xl p-4 shadow-input bg-white dark:bg-black font-sans w-full flex flex-col items-center justify-start gap-5">
			<Progress value={(100 * (currentStepIndex + 1)) / steps.length} />
			<form onSubmit={handleSubmit}>
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
