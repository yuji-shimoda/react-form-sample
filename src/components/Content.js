import React from 'react';
import { Grid } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Basic from "./Basic";
import Optional from "./Optional";
import Confirm from "./Confirm";
import Thanks from "./Thanks";

function getSteps() {
    return [
        '基本項目',
        '任意項目',
        '入力確認'
    ];
}

function getStepContent(stepIndex, handleNext, handleBack) {
    switch (stepIndex) {
        case 0:
            return <Basic handleNext={handleNext} />;
        case 1:
            return <Optional handleNext={handleNext} handleBack={handleBack} />;
        case 2:
            return <Confirm handleNext={handleNext} handleBack={handleBack} />;            
        default:
            return 'Unknown stepIndex';
    }
}
export const UserInputData = React.createContext();

function Content() {
    const [currentState, setCurrentState] = React.useState({});
    const value = {
        currentState,
        setCurrentState
    };
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    return (
        <Grid container>
            <Grid sm={2}/>
            <Grid lg={8} sm={8} spacing={10}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? (
                    <Thanks />
                ) : (
                    <UserInputData.Provider value={value}>
                        { getStepContent(activeStep, handleNext, handleBack)}
                    </UserInputData.Provider>
                )}
            </Grid>
        </Grid>
    )
}

export default Content