import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import signUpStyles from "./signUpStyles";
import {connect} from "react-redux";
import cs from "classnames";
import signUpMuiTheme from "./signUpMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";
import {Link, Route} from "react-router-dom";
import {
  checkMobileAvailability, resendOtp,
  signUpBlunt,
  validateOtpAndgenerateUserId
} from "../../Store/Action/signUpActions";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { RefreshOutlined} from "@material-ui/icons";


const SignUp = props => {

  const classes = signUpStyles();
  const [register, setRegister] = useState({
    detail: {
      firstName: "",
      lastName: "",
      mobile: "",
      otp: "",
      userId: "",
      email: "",
      password: "",
      confirmPassword: "",
      invitedBy:""
    },
    validator: {
      validFName: false,
      validLName: false,
      validMobile: false,
      validOtp: false,
      validEmail: false,
      validPassword: false,
      validConfirmPassword: false,
      validForm: false
    },
    formErrors: {
      mobile: "",
      otp: "",
      email: "",
      password: "",
      confirmPassword: "",
      fName: "",
      lName: ""
    }
  })

  useEffect(() => {
      let eRegister = {...register}
      eRegister.formErrors.mobile = props.mobileCheckMessage;
      setRegister({...register, ...eRegister});
  }, [props.mobileCheckMessage])

  useEffect(() => {
      let eRegister = {...register}
      eRegister.formErrors.otp = props.otpMismatchMessage;
      setRegister({...register, ...eRegister});
  }, [props.otpMismatchMessage])

  useEffect(() => {
    let eRegister = {...register}
    eRegister.detail.userId = props.generatedUserId;
    eRegister.detail.invitedBy = props.match.params.userid ? props.match.params.userid : "";
    setRegister({...register, ...eRegister});
  }, [props.generatedUserId])

  useEffect(() => {
    if(!props.routeTo==""){
      props.history.push(props.routeTo)
    }
  }, [props.routeTo])

  const inputHandler = (event) => {
    let eRegister = {...register}
    if (event.target.name === 'mobile' && isNaN(event.target.value)) {
      eRegister.detail[event.target.name] = register.detail.mobile.trim();
      setRegister({...register, ...eRegister})
      return;
    }
    eRegister.detail[event.target.name] = event.target.value.trim();
    setRegister({...register, ...eRegister})
  }

  const validateField = (event) => {
    let dRegister = {...register};
    if (event.target.value.length === 0) {
      return
    }
    const invalidMobileFormat = () => {
      dRegister.formErrors.mobile = "Invalid Mobile Format";
    }
    const invalidOtp = () => {
      dRegister.formErrors.otp = "Invalid OTP";
    }
    const resetOtp=() =>{
      dRegister.detail.otp="";
      dRegister.validator.validOtp= false;
    }
    switch (event.target.name) {
      case 'firstName':
        let fNameValid = (event.target.value).length >= 4;
        dRegister.formErrors.fName = fNameValid ? ""
            : "FirstName Less than 4 characters";
        dRegister.validator.validFName = fNameValid;
        break;
      case 'lastName':
        let lNameValid = (event.target.value).length >= 1;
        dRegister.formErrors.lName = lNameValid ? ""
            : "LastName Less than 1 character";
        dRegister.validator.validLName = lNameValid;
        break;
      case 'mobile':
        dRegister.formErrors.mobile=""
        resetOtp();
        let mobileValid = event.target.value.length === 10;
        mobileValid ? props.checkMobileAvailability(event.target.value) : invalidMobileFormat();
        dRegister.validator.validMobile = mobileValid;
        break;
      case 'otp':
        dRegister.formErrors.otp=""
        let otpValid = event.target.value.length === 4;
        otpValid ? props.validateOtpAndgenerateUserId(register.detail.mobile, event.target.value) : invalidOtp();
        dRegister.validator.validOtp = otpValid;
        break;
      case 'email':
        let emailValid = /^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/.test(
            event.target.value);
        dRegister.formErrors.email = emailValid ? "" : "Invalid Email id";
        dRegister.validator.validEmail = emailValid;
        break;
      case 'password':
        let passwordValid = (event.target.value).length >= 6;
        dRegister.formErrors.password = passwordValid ? ""
            : "Password Less than 6 characters";
        dRegister.validator.validPassword = passwordValid;
        break;
      case 'confirmPassword':
        let confirmPasswordValid = (event.target.value)
            === dRegister.detail.password;
        dRegister.formErrors.confirmPassword = confirmPasswordValid ? ""
            : "Password doesn't Match with Existing";
        dRegister.validator.validConfirmPassword = confirmPasswordValid;
        break;
      default:
        break;
    }

    dRegister.validator.validForm = dRegister.validator.validPassword
        && dRegister.validator.validConfirmPassword
        && dRegister.validator.validEmail
        && dRegister.validator.validFName && dRegister.validator.validLName
        && dRegister.validator.validMobile && dRegister.validator.validOtp
        && register.formErrors.mobile ==="" && register.formErrors.otp ==="";

    setRegister({...register, ...dRegister});
  }

  const doSignUpBlunt = () => {
    props.signUpBlunt(register.detail)
  }

  const doResendOtp = () => {
    props.resendOtp(register.detail.mobile)
  }

  return (
      <MuiThemeProvider theme={signUpMuiTheme}>
        <Container component="main" maxWidth="xs">
          <Paper elevation={3}>
            <Grid container direction="row" justify="center">
              <Avatar className={cs(classes.avatar)}>
                <LockOutlinedIcon/>
              </Avatar>
            </Grid>
            <form className={cs(classes.form)} noValidate>
              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      onChange={event => inputHandler(event)}
                      helperText={register.formErrors.fName}
                      onBlur={event => validateField(event)}
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={register.detail.firstName}
                      autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      onChange={event => inputHandler(event)}
                      helperText={register.formErrors.lName}
                      onBlur={event => validateField(event)}
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={register.detail.lastName}
                      autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="mobile"
                      label="Mobile"
                      name="mobile"
                      autoComplete="mobile"
                      inputProps={{maxLength: 10}}
                      helperText={register.formErrors.mobile}
                      onChange={event => inputHandler(event)}
                      onBlur={event => validateField(event)}
                      value={register.detail.mobile}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="otp"
                      label="OTP"
                      name="otp"
                      autoComplete="otp"
                      disabled ={!(register.validator.validMobile && register.formErrors.mobile==="")}
                      inputProps={{maxLength: 4}}
                      helperText={register.formErrors.otp}
                      onChange={event => inputHandler(event)}
                      onBlur={event => validateField(event)}
                      value={register.detail.otp}
                  />
                </Grid>
                <Grid item xs={12} sm={1} onClick={(register.validator.validMobile && register.formErrors.mobile==="") ? doResendOtp:""}>
                  <IconButton disabled={!(register.validator.validMobile && register.formErrors.mobile==="")}>
                    <RefreshOutlined />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      disabled={true}
                      fullWidth
                      id="userId"
                      label="UserId"
                      name="userId"
                      value={register.detail.userId}
                      autoComplete="userId"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      onChange={event => inputHandler(event)}
                      helperText={register.formErrors.email}
                      onBlur={event => validateField(event)}
                      id="email"
                      label="Email Address"
                      name="email"
                      value={register.detail.email}
                      autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      onChange={event => inputHandler(event)}
                      helperText={register.formErrors.password}
                      onBlur={event => validateField(event)}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={register.detail.password}
                      autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      onChange={event => inputHandler(event)}
                      helperText={register.formErrors.confirmPassword}
                      onBlur={event => validateField(event)}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      value={register.detail.confirmPassword}
                      autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!(register.validator.validForm)}
                  className={cs(classes.submit)}
                  onClick={doSignUpBlunt}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Route>
                    <Link to="/admin/signin">
                      <span className={cs(classes.linkHandler)}>Already have an account? Sign in</span>
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
  mobileCheckMessage: state.signUpReducer.mobileCheckMessage,
  generatedUserId: state.signUpReducer.generatedUserId,
  otpMismatchMessage: state.signUpReducer.otpMismatchMessage,
  routeTo: state.signUpReducer.routeTo
});

export default connect(mapStateToProps,
    {checkMobileAvailability, validateOtpAndgenerateUserId, signUpBlunt, resendOtp})(
    SignUp);




