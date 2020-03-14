import {makeStyles} from "@material-ui/core";

const signUpStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkHandler: {
    cursor: 'pointer'
  },
  forwardWidth: {
    paddingLeft:25,
    paddingTop:19
  },
  mobileWidth:{
    width: "125%"
  }
}));

export default signUpStyles;
