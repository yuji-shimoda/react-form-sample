import { Grid } from '@material-ui/core'
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button, MenuItem, Box } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useContext, useEffect } from "react";
import { UserInputData } from "./Content";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from "@material-ui/core/FormHelperText";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';


const getBasicSchema = ({ t }) => {
    return Yup.object().shape({
        checkBox: Yup.boolean().oneOf([true], t('checkRequired')),
        textBox: Yup.string().required(t('errorRequired')).max(10, t('limitCharacter')).matches(/^[a-zA-Z0-9!-/:-@¥[-`{-~ ]*$/, t('errorMatchTextBox')),
        pullDown: Yup.string().oneOf(['one', 'two', 'three'], t('selectRequired')),
    });  
}

function Basic(props) {
    const { t } = useTranslation();
    const basicSchema = getBasicSchema({t});
    const { control, handleSubmit, setValue, formState:{ errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            checkBox: false,
            textBox: "",
            pullDown: "",
        },
        resolver: yupResolver(basicSchema)
    });
    const { currentState, setCurrentState } = useContext(UserInputData);
    const basic = currentState["Basic"];
    useEffect(() => {
        if (basic) {
            setValue("checkBox", currentState["Basic"]["checkBox"]);
            setValue('textBox', currentState["Basic"]["textBox"]);
            setValue("pullDown", currentState["Basic"]["pullDown"]);
        }
    }, [basic]);
    const onSubmit = (data) => {
        props.handleNext();
        setCurrentState({...currentState, "Basic": data });
    };
    return (
        <Grid container>
            <Grid sm={2}/>
            <Grid lg={8} sm={8} spacing={10}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="checkBox"
                        render={({ field: { value, onChange } }) => (
                            <FormControl error>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={value}
                                            onChange={onChange}
                                            color='primary'
                                        />
                                    }
                                    label={t('checkBoxLabel')}
                                />
                                <FormHelperText>
                                    { errors.checkBox?.message }
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Controller
                        control={control}
                        name="textBox"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t('textBoxLabel')}
                                error={errors.textBox ? true : false}
                                helperText={errors.textBox?.message}
                                fullWidth
                                margin="normal"
                                placeholder={t('textBoxPlaceholder')}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="pullDown"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t('pullDownLabel')}
                                error={errors.pullDown ? true : false}
                                helperText={errors.pullDown?.message}
                                fullWidth
                                margin="normal"
                                id="select"
                                select
                            >
                                <MenuItem value="one">{t('selectOne')}</MenuItem>
                                <MenuItem value="two">{t('selectTwo')}</MenuItem>
                                <MenuItem value="three">{t('selectThree')}</MenuItem>
                            </TextField>
                        )}
                    />
                    <Box mt={3}>
                        <Grid container spacing={1} justifyContent="flex-end">
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

export default Basic