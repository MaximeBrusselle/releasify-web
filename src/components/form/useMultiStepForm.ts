import { ReactElement, useState } from "react";
import { ArtistRegistrationData } from "@/pages/registration/ArtistRegistration";
import { LabelRegistrationData } from "@/pages/registration/LabelRegistration";

type ValidationFieldErrorMap = { [key: string]: string };

interface ValidationReturn {
	isValid: boolean;
	errors?: ValidationFieldErrorMap;
}

export type { ValidationFieldErrorMap, ValidationReturn };

export function useMultiStepForm(steps: ReactElement[]) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	function validateAccountData(data: ArtistRegistrationData | LabelRegistrationData): ValidationReturn {
		let isValid = true;
		const errors: ValidationFieldErrorMap = {};

		// Basic validation
		if (!data.email || data.email === "" || !data.password || data.password === "" || !data.confirmPassword || data.confirmPassword === "") {
			isValid = false;
			errors["allFields"] = "Fill in the required fields.";
		}
		if (data.password !== data.confirmPassword) {
			isValid = false;
			errors["confirmPassword"] = "Passwords do not match.";
		}
		if (data.password.length < 6) {
			isValid = false;
			errors["password"] = "Password must be at least 6 characters long.";
		}
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		if (!emailRegex.test(data.email)) {
			isValid = false;
			errors["email"] = "Invalid email format.";
		}

		//TODO: Check if username and email are unique
		let isUsernameUnique = true;
		let isEmailUnique = true;
		function isArtistRegistrationData(data: any): data is ArtistRegistrationData {
			return data.artistname !== undefined;
		}

		function isLabelRegistrationData(data: any): data is LabelRegistrationData {
			return data.labelname !== undefined;
		}

		if (isArtistRegistrationData(data)) {
			data = data as ArtistRegistrationData;
			if (data.artistname === "") {
				isValid = false;
				errors["allFields"] = "Fill in the required fields.";
			}
			if (!isUsernameUnique) {
				isValid = false;
				errors["artistname"] = "Username already exists.";
			}
		} else if (isLabelRegistrationData(data)) {
			data = data as LabelRegistrationData;
			if (data.labelname === "") {
				isValid = false;
				errors["allFields"] = "Fill in the required fields.";
			}
			if (!isUsernameUnique) {
				isValid = false;
				errors["labelname"] = "Username already exists.";
			}
		}

		if (!isEmailUnique) {
			isValid = false;
			errors["email"] = "Email already exists.";
		}

		return { isValid: isValid, errors: errors };
	}

	function validatePfpAndGenres(data: ArtistRegistrationData | LabelRegistrationData): ValidationReturn {
		let isValid = true;
		const errors: ValidationFieldErrorMap = {};
		if (data.genreList.length === 0) {
			isValid = false;
			errors["genres"] = "At least one genre is required.";
		}
		return { isValid: isValid, errors: errors } /* Add validation logic */;
	}

	function validateChooseLabel(data: ArtistRegistrationData): ValidationReturn {
		let isValid = true;
		const errors: ValidationFieldErrorMap = {};
		if (data.labelType.viewType === "label" && data.label === null) {
			isValid = false;
			errors["label"] = "Label is required.";
		}
		if (data.labelType.viewType === "labelNotOnPlatform" && data.label === null) {
			isValid = false;
			errors["labelname"] = "Label name is required.";
		}
		return { isValid: isValid, errors: errors };
	}

	function validateChooseArtists(data: LabelRegistrationData): ValidationReturn {
		let isValid = true;
		const errors: ValidationFieldErrorMap = {};
		data.newArtists.forEach((artist, index) => {
			if (artist.artistName === "") {
				isValid = false;
				errors[`newArtists${index}`] = "Artist name is required.";
			}
		});
		return { isValid: isValid, errors: errors };
	}

	function validateSocials(_: ArtistRegistrationData | LabelRegistrationData): ValidationReturn {
		return { isValid: true };
	}

	function nextStep() {
		setCurrentStepIndex((index: number) => (index >= steps.length - 1 ? index : index + 1));
	}

	function prevStep() {
		setCurrentStepIndex((index: number) => {
			if (index <= 0) return index;
			return index - 1;
		});
	}

	return {
		steps,
		currentStep: steps[currentStepIndex],
		currentStepIndex,
		nextStep,
		prevStep,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
		validateAccountData,
		validatePfpAndGenres,
		validateChooseLabel,
		validateChooseArtists,
		validateSocials,
	};
}
