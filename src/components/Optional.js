import { Grid } from '@material-ui/core'
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import React, { useContext, useEffect } from "react";
import { UserInputData } from "./Content";

function Optional(props) {
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
                                title="自由に記入することができます"
                                placement="top-start"
                                arrow
                            >
                                <TextField
                                    {...field}
                                    label="備考欄"
                                    fullWidth
                                    margin="normal"
                                    rows={4}
                                    multiline
                                    variant="outlined"
                                    placeholder="その他ご要望等あれば、ご記入ください"
                                />
                            </Tooltip>
                        )}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSubmit("back")}
                    >
                        戻る
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        次へ
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}

export default Optional