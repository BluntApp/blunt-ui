import React, {useEffect} from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import bluntSnackBarStyles from "./bluntSnackBarStyles";
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import signUpMuiTheme from "../SignUp/signUpMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";
import bluntSnackBarMuiTheme from "./bluntSnackBarMuiTheme";
import cs from "classnames";
import {resetSnackBarMessage} from "../../Store/Action/snackBarActions";

const BluntSnackbar = props => {
  const classes = bluntSnackBarStyles();
  const [open, setOpen] = React.useState(false);

  const {className, snackBarMessage, messageVariant} = props;
  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  const Icon = variantIcon[messageVariant];

  useEffect(() => {
    if (!snackBarMessage == "") {
      setOpen(true);
    }
  }, [snackBarMessage])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.resetSnackBarMessage();
    setOpen(false);
  }

  return (
      <MuiThemeProvider theme={bluntSnackBarMuiTheme}>
        <div >
          <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
          >
            <SnackbarContent
                className={cs(classes[messageVariant], className)}
                aria-describedby="client-snackbar"
                action={[
                  <IconButton key="close" aria-label="Close" color="inherit"
                              onClick={handleClose}>
                    <CloseIcon className={classes.icon}/>
                  </IconButton>
                ]}
                message={
                  <span id="client-snackbar" className={classes.message}>
                    <Icon className={cs(classes.icon, classes.iconVariant)} />
                  {snackBarMessage}
                </span>
                }
            />
          </Snackbar>
        </div>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  snackBarMessage: state.snackBarReducer.snackBarMessage,
  messageVariant: state.snackBarReducer.messageVariant
});

export default connect(mapStateToProps, {resetSnackBarMessage} )(
    BluntSnackbar);
