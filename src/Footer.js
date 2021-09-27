import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    customFooter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

function Footer() {
    const classes = useStyles();
    return (
        <footer>
            <div className={classes.customFooter}>
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        @ Classmethod, Inc.
                    </Typography>
                </Toolbar>
            </div>
        </footer>
    )
};

export default Footer;