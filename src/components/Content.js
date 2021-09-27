import React, { useState, useEffect, createContext } from "react";
import { Grid } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Basic from "./Basic";
import Optional from "./Optional";
import Confirm from "./Confirm";
import Thanks from "./Thanks";
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'none',
    },
}));

function getSteps({ t }) {
    return [
        t('basicStepLabel'),
        t('optionalStepLabel'),
        t('confirmStepLabel')
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
export const UserInputData = createContext();

function Content() {
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const [currentState, setCurrentState] = useState({});
    const { lang } = useParams();
    useEffect(() => {
        if (lang === 'en') {
            i18n.changeLanguage('en');
        } else {
            i18n.changeLanguage('ja');
        }
    }, [lang, i18n]);
    const value = {
        currentState,
        setCurrentState
    };
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps({t});
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
                <Stepper activeStep={activeStep} alternativeLabel classes={classes}>
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