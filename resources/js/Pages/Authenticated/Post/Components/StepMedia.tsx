import React, { useEffect, useMemo } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { STEP } from "../Create";

type Props = {
    currentStep: string;
};
export default function StepMedia({ currentStep }: Props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const listStep = useMemo(
        () => [
            {
                id: 0,
                label: STEP.upload,
                icon: <IoCloudUploadOutline className="h-5 w-5" />,
            },
            {
                id: 1,
                label: STEP.preivew,
                icon: <FaRegImage className="h-5 w-5" />,
            },
            {
                id: 2,
                label: STEP.caption,
                icon: <TfiWrite className="h-5 w-5" />,
            },
        ],
        [],
    );
    // const [isLastStep, setIsLastStep] = React.useState(false);
    // const [isFirstStep, setIsFirstStep] = React.useState(false);
    useEffect(() => {
        const stepId = listStep.find((step) => step.label == currentStep)?.id!;
        setActiveStep(stepId);
    }, [currentStep]);

    return (
        <div className="w-full px-24 py-4">
            <Stepper
                activeStep={activeStep}
                // isLastStep={(value) => setIsLastStep(value)}
                // isFirstStep={(value) => setIsFirstStep(value)}
            >
                {listStep.map((step) => (
                    <Step
                    // onClick={() => setActiveStep(step.id)}
                    >
                        {step.icon}
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
