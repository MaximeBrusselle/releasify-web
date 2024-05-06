import { ReactElement, useState } from "react";
import { ArtistRegistrationData } from "./registration/Artist/ArtistRegistration";

type ValidationFieldErrorMap = { [key: string]: string };

interface ValidationReturn {
	isValid: boolean;
	errors?: ValidationFieldErrorMap;
}

export type { ValidationFieldErrorMap, ValidationReturn };

export function useMultiStepForm(steps: ReactElement[]) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	function validateAccountData(data: ArtistRegistrationData): ValidationReturn {
        let isValid = true;
        const errors: ValidationFieldErrorMap = {};
		if (data.artistname === "" || data.email === "" || data.password === "" || data.confirmPassword === ""){
            isValid = false;
            errors["allFields"] = "Fill in the required fields.";
        } 
		if (data.password !== data.confirmPassword){
            isValid = false;
            errors["confirmPassword"] = "Passwords do not match.";
        } 
		if (data.password.length < 6){
            isValid = false;
            errors["password"] = "Password must be at least 6 characters long.";
        } 
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		if (!emailRegex.test(data.email)){
            isValid = false;
            errors["email"] = "Invalid email format.";
        } 
		//TODO: Add some unique username, email validation
		return { isValid: isValid, errors: errors };
	}

	function validatePfpAndGenres(data: ArtistRegistrationData): ValidationReturn {
        let isValid = true;
        const errors: ValidationFieldErrorMap = {};
		if (data.artistGenres.length === 0){
            isValid = false;
            errors["genres"] = "At least one genre is required.";
        };
		return { isValid: isValid, errors: errors } /* Add validation logic */;
	}

	function validateLabelForm(data: ArtistRegistrationData): ValidationReturn {
        let isValid = true;
        const errors: ValidationFieldErrorMap = {};
		if (data.labelType.viewType === "label" && data.label === null) {
            isValid = false;
            errors["label"] = "Label is required.";
        };
		if (data.labelType.viewType === "labelNotOnPlatform" && data.label === null) {
            isValid = false;
            errors["labelname"] = "Label name is required.";
        };
		return { isValid: isValid, errors: errors};
	}

	function validateSocials(data: ArtistRegistrationData): ValidationReturn {
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

	function goToStep(stepIndex: number) {
		setCurrentStepIndex(stepIndex);
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
		validateLabelForm,
		validateSocials,
	};
}
