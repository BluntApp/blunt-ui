import {connect} from "react-redux";
import {MuiThemeProvider} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React, {useEffect, useState} from "react";
import profileMuiTheme from "./profileMuiTheme";
import profileStyles from "./profileStyles";
import Typography from "@material-ui/core/Typography";
import cs from "classnames";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker} from "@material-ui/pickers";
import ImageUploader from 'react-images-upload';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {
  followInvite,
  loadFollowings
} from "../../Store/Action/followerActions";
import Avatar from "@material-ui/core/Avatar";

const Profile = props => {
  const classes = profileStyles();
  const [selectedDate, setSelectedDate] = useState(
      new Date('2014-08-18T21:11:54'));
  const [picture, setPicture] = useState({})
  const [follows, setFollows] = useState([])

  useEffect(() => {
    props.loadFollowings()
  }, [])

  useEffect(() => {
    setFollows(props.followings);
  }, [props.followings])

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const [mobile, setMobile] = useState("");
  const [nickName, setNickName] = useState("");
  const onDrop = (picture) => {
    setPicture(picture);
  }

  const handleMobile = (event) => {
    if (isNaN(event.target.value)) {
      return;
    }
    setMobile(event.target.value)
  }

  const handleNickname = (event) => {
    setNickName(event.target.value)
  }

  const handleInvite = () => {
    props.followInvite(mobile, nickName)
  }

  return (
      <MuiThemeProvider theme={profileMuiTheme}>

        <Grid container direction="row" justify="center">
          <Paper className={cs(classes.profilePaper)} elevation={3}>
            <Typography variant="h6" component="h2">
              Profile
            </Typography>
            <Divider/>
            <form className={cs(classes.form)} noValidate>
              <Grid container spacing={3}>

                <Grid item xs={4} sm={4}>
                  <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      disabled={true}
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value=""
                      autoFocus
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                      autoComplete="lname"
                      name="lastName"
                      variant="outlined"
                      disabled={true}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      value=""
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                      autoComplete="userid"
                      name="userid"
                      variant="outlined"
                      disabled={true}
                      required
                      fullWidth
                      id="userid"
                      label="User Id"
                      value=""
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                      autoComplete="mobile"
                      name="mobile"
                      variant="outlined"
                      disabled={true}
                      required
                      fullWidth
                      id="mobile"
                      label="Mobile"
                      value=""
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value=""
                      autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <KeyboardDatePicker
                      margin="normal"
                      id="dob"
                      name="dob"
                      label="Date of Birth"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                  />
                </Grid>

              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="street"
                      label="Street"
                      name="street"
                      value=""
                      autoComplete="street"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      value=""
                      autoComplete="city"
                  />
                </Grid>

                <Grid item xs={8} sm={4}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="state"
                      label="State"
                      name="state"
                      value=""
                      autoComplete="state"
                  />
                </Grid>
                <Grid item xs={8} sm={4}>

                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="country"
                      label="Country"
                      name="country"
                      value=""
                      autoComplete="country"
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="zipcode"
                      label="Zipcode"
                      name="zipcode"
                      value=""
                      autoComplete="zipcode"
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <ImageUploader
                      withIcon={true}
                      buttonText='Choose images'
                      onChange={onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Button variant="outlined" color="primary"
                          className={cs(classes.buttonUpdate)}>
                    Update
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
          <Paper className={cs(classes.followPaper)} elevation={3}>
            <Typography variant="h6" component="h2">
              Follow
            </Typography>
            <Divider/>

            <form className={cs(classes.form)} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="mobile"
                      label="Mobile"
                      name="mobile"
                      autoComplete="mobile"
                      inputProps={{maxLength: 10}}
                      onChange={event => handleMobile(event)}
                      value={mobile}
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                      variant="outlined"
                      fullWidth
                      id="nickName"
                      label="NickName"
                      name="nickName"
                      autoComplete="nickName"
                      inputProps={{maxLength: 21}}
                      onChange={event => handleNickname(event)}
                      value={nickName.toLowerCase()}
                  />
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={mobile.length != 10}
                    onClick={handleInvite}
                >
                  Invite
                </Button>
                <Paper className={cs(classes.followingsPaper)} elevation={0}>
                  <Grid item xs={12}>
                    <Grid container justify="center" spacing={1}
                          className={cs(classes.follows)}>
                      {follows.map(following => (
                          <Grid item>
                            <Paper elevation={3}
                                   className={cs(classes.followeePaper)}>
                              <Avatar aria-label="recipe" className={classes.avatar}>
                                R
                              </Avatar>
                              <Typography variant="h8" component="h3">
                                {following.bluntNickName} - {following.mobile}
                              </Typography>
                            </Paper>
                          </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Paper>

              </Grid>
            </form>


          </Paper>
        </Grid>
        {/*handle follow of own number, delete , on blur*/}
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  followings: state.followerReducer.followings,
});

export default connect(mapStateToProps, {followInvite, loadFollowings})(
    Profile);
