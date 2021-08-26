import { Grid } from '@material-ui/core'
import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { UserInputData } from "./Content";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import toast, { Toaster } from 'react-hot-toast';

var item = {
    'checkBox': 'チェックボックス',
    'textBox': 'テキストボックス',
    'pullDown': 'プルダウン',
    'multilineText': 'マルチラインテキスト'
}

function Confirm(props) {
    const { currentState } = useContext(UserInputData);
    const notifyError = () => toast.error('データの送信に失敗しました。少し待ってからリトライしてください');
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
                value = 'チェックしました';
            } else if (currentState[k][v] === false) {
                value = 'チェックしていません';
            } else if (currentState[k][v] === '') {
                value = '未入力';
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
        <Grid container>
            <Toaster position="top-right" duration="4000" />
            <TableContainer component={Paper}>
                <Table aria-label="Customer Input Data">
                    <TableHead>
                        <TableRow>
                            <TableCell>項目</TableCell>
                            <TableCell>入力内容</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            inputDataLists.map(function(elem) {
                                return (
                                    <TableRow key={elem.id}>
                                    <TableCell>{elem.name}</TableCell>
                                    { elem.value ? <TableCell>{elem.value}</TableCell> : <TableCell>None</TableCell> }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={props.handleBack}>
                戻る
            </Button>
            <Button variant="contained" color="primary" onClick={onSubmit}>
                送信
            </Button>
        </Grid>
    )
}

export default Confirm