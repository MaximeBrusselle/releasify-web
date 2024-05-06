import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function nextStep() {
        setCurrentStepIndex((index: number) => {
            if(index >= steps.length - 1) return index;
            return index + 1;
        });
    }

    function prevStep() {
        setCurrentStepIndex((index: number) => {
            if(index <= 0) return index;
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
    }
}