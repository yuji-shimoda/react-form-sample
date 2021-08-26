import { Grid } from '@material-ui/core'
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button, MenuItem } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useContext, useEffect } from "react";
import { UserInputData } from "./Content";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from "@material-ui/core/FormHelperText";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Basic(props) {
    const basicSchema = Yup.object().shape({
        checkBox: Yup.boolean()
            .oneOf([true], 'チェックが必要です'),
        textBox: Yup.string()
            .required('必須項目です')
            .max(10, '10文字以内で入力してください')
            .matches(/^[a-zA-Z0-9!-/:-@¥[-`{-~ ]*$/, "半角英数字記号以外は使用できません"),
        pullDown: Yup.string()
            .oneOf(['one', 'two', 'three'], 'いずれかを選択してください'),
    });  
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
                                    label="チェックボックス"
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
                                label="テキストフィールド"
                                error={errors.textBox ? true : false}
                                helperText={errors.textBox?.message}
                                fullWidth
                                margin="normal"
                                placeholder="プレースホルダー"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="pullDown"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="プルダウンリスト"
                                error={errors.pullDown ? true : false}
                                helperText={errors.pullDown?.message}
                                fullWidth
                                margin="normal"
                                id="select"
                                select
                            >
                                <MenuItem value="one">選択肢1</MenuItem>
                                <MenuItem value="two">選択肢2</MenuItem>
                                <MenuItem value="three">選択肢3</MenuItem>
                            </TextField>
                        )}
                    />
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

export default Basic