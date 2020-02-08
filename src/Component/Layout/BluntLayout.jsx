import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import bluntLayoutStyles from "./bluntLayoutStyles";
import {MuiThemeProvider} from "@material-ui/core";
import bluntLayoutMuiTheme from "./bluntLayoutMuiTheme";
import cs from "classnames";
import SignUp from "../SignUp/SignUp";
import Paper from "@material-ui/core/Paper";
import {Redirect, Route, Switch} from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import PostGridList from "../PostGridList/PostGridList";
import CssBaseline from "@material-ui/core/CssBaseline";
import FollowerGridList from "../FollowerGridList/FollowerGridList";
import Profile from "../Profile/Profile";
import PendingFollowerGridList
  from "../PendingFollowerGridList/PendingFollowerGridList";
import axios from "axios";
import store from "../../Store/Configure";
import {DISPLAY_SNACKBAR} from "../../Store/Types";
import {SNACKBAR_VARIANT_ERROR} from "../../Constant/Constants";
// javascript plugin used to create scrollbars on windows

export const BluntLayout = (props) => {

  axios.interceptors.request.use(
      request => {
        console.log("request"+ request)
        request.headers['BLUNT_ID'] =props.signedInBlunt.id;
        request.timeout = 40000;
        return request;
      }
  )

  axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status == 504) {
          store.dispatch({
            type: DISPLAY_SNACKBAR,
            message: error.response.data.error,
            variant: SNACKBAR_VARIANT_ERROR
          })
        } else if (error.response.status == 500) {
          store.dispatch({
            type: DISPLAY_SNACKBAR,
            message: error.response.data.error,
            variant: SNACKBAR_VARIANT_ERROR
          })
        }
        return Promise.reject(error);
      }
  )

  const classes = bluntLayoutStyles();
  const [open, setOpen] = useState(props.isMenuBarOpen);

  useEffect(() => {
    setOpen(props.isMenuBarOpen)
  }, [props.isMenuBarOpen])

  return (
      <MuiThemeProvider theme={bluntLayoutMuiTheme}>
        <Paper elevation={0}
               className={cs(classes.content, {[classes.contentShift]: open,})}>
          <CssBaseline/>
          <Switch>
            <Route path="/blunt/home"
                   render={props => <SignIn {...props} />}/>
            <Route path="/blunt/signin" exact
                   render={props => <SignIn {...props} />}/>
            <Route path="/blunt/signup" exact
                   render={props => <SignUp {...props} />}/>
            <Route path="/blunt/signup/:userid" exact
                   render={props => <SignUp {...props} />}/>
            <Route path="/blunt/posts"
                   render={props => <PostGridList {...props} />}/>
            <Route path="/blunt/followers"
                   render={props => <FollowerGridList {...props} />}/>
            <Route path="/blunt/pending"
                   render={props => <PendingFollowerGridList {...props} />}/>
            <Route path="/blunt/profile"
                   render={props => <Profile {...props} />}/>
            <Redirect to="/blunt/home"/>
          </Switch>
        </Paper>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  isMenuBarOpen: state.menuBarReducer.isMenuBarOpen,
  signedInBlunt: state.signInReducer.signedInBlunt
});

export default connect(mapStateToProps, null)(BluntLayout);
