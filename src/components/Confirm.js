import { Grid, Box } from '@material-ui/core'
import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { UserInputData } from "./Content";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        width: 300
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const getItemTable = ({ t }) => {
    return {
        'checkBox': t('checkBoxLabel'),
        'textBox': t('textBoxLabel'),
        'pullDown': t('pullDownLabel'),
        'multilineText': t('multilineTextLabel')
    }
}

function Confirm(props) {
    const { currentState } = useContext(UserInputData);
    const { t } = useTranslation();
    var item = getItemTable({t});
    const notifyError = () => toast.error(t('errorPostData'));
    const onSubmit = () => {
        postData()
        .then(data => {
            console.log(JSON.stringify(data));
            props.handleNext();
        })
        .catch(err => {
            notifyError();
            console.log(err);
        });
    };
    async function postData() {
        const res = await fetch(
            'http://localhost/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentState)
            }
        );
        const data = await res.json();
        return data;
    }
    const inputDataLists = [];
    var id = 0;
    for ( var k in currentState) {
        for ( var v in currentState[k]) {
            var value = ''
            if (currentState[k][v] === true) {
                value = t('boxChecked');
            } else if (currentState[k][v] === false) {
                value = t('boxNotChecked');
            } else if (currentState[k][v] === '') {
                value = t('fieldNoInput');
            } else {
                value = currentState[k][v];
            }
            inputDataLists.push(
                {
                    "id": id,
                    "name": item[v],
                    "value": value
                }
            );
            id++;
        }
    }
    return (
        <Box mt={3}>
            <Grid container spacing={1} justifyContent="flex-end">
                <Toaster position="top-right" duration="4000" />
                <Grid lg={12} md={12} sm={12} xl={12} xs={12} spacing={10}>
                    <Box mb={6}>
                        <TableContainer component={Paper}>
                            <Table aria-label="Customer Input Data">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t('tableHeaderItemColumn')}</TableCell>
                                        <TableCell>{t('tableHeaderInputColumn')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        inputDataLists.map(function(elem) {
                                            return (
                                                <StyledTableRow key={elem.id}>
                                                    <StyledTableCell component="th" scope="row">{elem.name}</StyledTableCell>
                                                { elem.value ? <StyledTableCell>{elem.value}</StyledTableCell> : <StyledTableCell>None</StyledTableCell> }
                                                </StyledTableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={1} justifyContent="space-between">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={props.handleBack}
                                >
                                    {t('backButtonLabel')}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onSubmit}
                                >
                                    {t('submitButtonLabel')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Confirm