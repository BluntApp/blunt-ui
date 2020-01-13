import React, {useEffect, useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {MuiThemeProvider} from "@material-ui/core";
import signInMuiTheme from "./signInMuiTheme";
import signInStyles from "./signInStyles";
import {connect} from "react-redux";
import cs from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {Link, Route} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {signInBlunt} from "../../Store/Action/signInActions";

const SignIn = props => {
  const classes = signInStyles();

  useEffect(() => {
    if(!props.routeTo==""){
      props.history.push(props.routeTo)
    }
  }, [props.routeTo])

  const [credential, setCredential] = useState({
    mobile: "",
    password: "",
    rememberMe: false,
    validMobile: false,
    validPassword: false,
    validForm: false,
    formErrors: {mobile: "", password: ""}
  })

  const inputHandler = (event) => {
    if(event.target.name==='mobile' && isNaN(event.target.value)){
      setCredential({...credential,[event.target.name]:credential.mobile})
      return;
    }
    setCredential({...credential, [event.target.name]: event.target.value.trim()});
  }

  const rememberMeHandler = (value) => {
    setCredential({...credential, rememberMe: value})
  }

  const validateField = (event) => {
    let dCredential = {...credential};
    if (event.target.value.length === 0) {
      return
    }
    switch (event.target.name) {
      case 'mobile':
        let mobileValid = event.target.value.length===10;
        dCredential.formErrors.mobile = mobileValid ? "" : "Invalid mobile format";
        dCredential.validMobile = mobileValid;
        break;
      case 'password':
        let passwordValid = (event.target.value).length >= 6;
        dCredential.formErrors.password = passwordValid ? ""
            : "Password Less than 6 characters";
        dCredential.validPassword = passwordValid;
        break;
      default:
        break;
    }
    dCredential.validForm = dCredential.validMobile && dCredential.validPassword;
    setCredential({...credential, ...dCredential});
  }

  const doSignInBlunt = () => {
    props.signInBlunt(credential.mobile, credential.password);
  }


  return (
      <MuiThemeProvider theme={signInMuiTheme}>
        <Container component="main" maxWidth="xs">
          <Paper elevation={3}>
            <Grid container direction="row" justify="center">
              <Avatar className={cs(classes.avatar)}>
                <LockOutlinedIcon/>
              </Avatar>
            </Grid>
            <form className={cs(classes.form)} noValidate>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  name="mobile"
                  autoComplete="mobile"
                  inputProps={{ maxLength: 10}}
                  helperText={credential.formErrors.mobile}
                  onChange={event => inputHandler(event)}
                  onBlur={event => validateField(event)}
                  value={credential.mobile}
                  autoFocus
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText={credential.formErrors.password}
                  onChange={event => inputHandler(event)}
                  onBlur={event => validateField(event)}
                  value={credential.password}
                  autoComplete="current-password"
              />
              <FormControlLabel
                  control={<Checkbox
                      onChange={() => rememberMeHandler(!credential.rememberMe)}
                      value={credential.rememberMe}
                      color="primary"/>}
                  label="Remember me"
              />
              <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!(credential.validForm)}
                  className={cs(classes.submit)}
                  onClick={doSignInBlunt}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" to="" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Route>
                    <Link to="/blunt/signup">
                      <span className={cs(
                          classes.linkHandler)}>{"Don't have an account? Sign Up"}</span>
                    </Link>
                  </Route>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </MuiThemeProvider>
  );
}
const mapStateToProps = state => ({
  routeTo: state.signInReducer.routeTo
});


export default connect(mapStateToProps, {signInBlunt})(SignIn);
