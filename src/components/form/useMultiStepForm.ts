import { ReactElement, useState } from "react";

type ValidationFieldErrorMap = { [key: string]: string };

interface ValidationReturn {
	isValid: boolean;
	errors?: ValidationFieldErrorMap;
}

export type { ValidationFieldErrorMap, ValidationReturn };

export function useMultiStepForm(steps: ReactElement[]) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	function nextStep() {
		setCurrentStepIndex((index: number) => (index >= steps.length - 1 ? index : index + 1));
	}

	function prevStep() {
		setCurrentStepIndex((index: number) => {
			if (index <= 0) return index;
			return index - 1;
		});
	}

	function goToStep(index: number) {
		setCurrentStepIndex(index);
	}

	return {
		steps,
		goToStep,
		currentStep: steps[currentStepIndex],
		currentStepIndex,
		nextStep,
		prevStep,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
	};
}
