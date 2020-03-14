import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import bluntLayoutStyles from "./bluntLayoutStyles";
import {MuiThemeProvider} from "@material-ui/core";
import bluntLayoutMuiTheme from "./bluntLayoutMuiTheme";
import cs from "classnames";
import SignUp from "../SignUp/SignUp";
import Paper from "@material-ui/core/Paper";
// javascript plugin used to create scrollbars on windows
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import PostGridList from "../PostGridList/PostGridList";
import CssBaseline from "@material-ui/core/CssBaseline";
import FollowerGridList from "../FollowerGridList/FollowerGridList";
import Profile from "../Profile/Profile";
import PendingFollowerGridList
  from "../PendingFollowerGridList/PendingFollowerGridList";
import {isNotBlank} from "../../Store/Utility";
import {loadMenubarList} from "../../Store/Action/menuBarActions";
import Dashboard from "../Dashboard/Dashboard";

export const BluntLayout = (props) => {
  const classes = bluntLayoutStyles();
  const [open, setOpen] = useState(props.isMenuBarOpen);
  let history = useHistory();
  useEffect(() => {
    setOpen(props.isMenuBarOpen)
  }, [props.isMenuBarOpen])

  useEffect(() => {
    if (!props.routeTo == "") {
      history.push(props.routeTo)
    }
  }, [props.routeTo])

  useEffect(() => {
    let sessionBluntId = sessionStorage.getItem("BLUNT-ID");
    isNotBlank(sessionBluntId) && props.loadMenubarList()
  }, [])

  const PrivateRoute = ({component: Component, ...rest}) => {
    const sessionBluntId = sessionStorage.getItem("BLUNT-ID");
    return (
        <Route {...rest} render={(props) => (
            isNotBlank(sessionBluntId)
                ? <Component {...props} />
                : <Redirect to={{
                  pathname: '/blunt/home',
                  state: {from: props.location}
                }}/>
        )}/>
    )
  }


return (
    <MuiThemeProvider theme={bluntLayoutMuiTheme}>
      <Paper elevation={0}
             className={cs(classes.content, {[classes.contentShift]: open,})}>
        <CssBaseline/>
        <Switch>
          <Route path="/blunt/home" render={props => <SignIn {...props} />}/>
          <Route path="/blunt/signin" exact render={props => <SignIn {...props} />}/>
          <Route path="/blunt/signup" exact render={props => <SignUp {...props} />}/>
          <PrivateRoute path="/blunt/posts" component={PostGridList}/>
          <PrivateRoute path="/blunt/followers" component={FollowerGridList}/>
          <PrivateRoute path="/blunt/pending" component={PendingFollowerGridList}/>
          <PrivateRoute path="/blunt/profile" component={Profile}/>
          <PrivateRoute path="/blunt/dashboard" component={Dashboard}/>
          <Redirect to="/blunt/home"/>
        </Switch>
      </Paper>
    </MuiThemeProvider>
);
}

const mapStateToProps = state => ({
  isMenuBarOpen: state.menuBarReducer.isMenuBarOpen,
  routeTo: state.menuBarReducer.routeTo
});

export default connect(mapStateToProps, {loadMenubarList})(BluntLayout);
