import { Grid } from '@material-ui/core'
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button, Box } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import React, { useContext, useEffect } from "react";
import { UserInputData } from "./Content";
import { useTranslation } from 'react-i18next';

function Optional(props) {
    const { t } = useTranslation();
    const { control, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            multilineText: "",
        },
    });
    const { currentState, setCurrentState } = useContext(UserInputData);
    const optional = currentState["Optional"];
    useEffect(() => {
        if (optional) {
            setValue("multilineText", currentState["Optional"]["multilineText"]);
        }
    }, [optional]);
    const onSubmit = (action) => {
        if(action === 'back') {
            props.handleBack();
        } else {
            props.handleNext();
        }
        const data = getValues();
        setCurrentState({...currentState, "Optional": data });
    };
    return (
        <Grid container>
            <Grid sm={2}/>
            <Grid lg={8} sm={8} spacing={10}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="multilineText"
                        render={({ field }) => (
                            <Tooltip
                                title={t('multilineTextTooltipTitle')}
                                placement="top-start"
                                arrow
                            >
                                <TextField
                                    {...field}
                                    label={t('multilineTextLabel')}
                                    fullWidth
                                    margin="normal"
                                    rows={4}
                                    multiline
                                    variant="outlined"
                                    placeholder={t('multilineTextPlaceHolder')}
                                />
                            </Tooltip>
                        )}
                    />
                    <Box mt={3}>
                        <Grid container spacing={1} justifyContent="space-between">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onSubmit("back")}
                                >
                                    {t('backButtonLabel')}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    {t('nextButtonLabel')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Grid>
        </Grid>
    )
}

export default Optional