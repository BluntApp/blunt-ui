import React, {useState} from "react";
import {connect} from "react-redux";
import bluntLayoutStyles from "./bluntLayoutStyles";
import {MuiThemeProvider} from "@material-ui/core";
import bluntLayoutMuiTheme from "./bluntLayoutMuiTheme";
import cs from "classnames";
import SignUp from "../SignUp/SignUp";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Paper from "@material-ui/core/Paper";
import BluntAppBar from "../AppBar/BluntAppBar";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import SignIn from "../SignIn/SignIn";
import PostGridList from "../PostGridList/PostGridList";
// javascript plugin used to create scrollbars on windows

export const BluntLayout = () => {
  const classes = bluntLayoutStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const hist = createBrowserHistory();
  return (
      <MuiThemeProvider theme={bluntLayoutMuiTheme}>
          <Paper elevation={0}>
            <BluntAppBar/>
            <Router history={hist}>
              <Switch>
                <Route path="/blunt/home"
                       render={props => <SignIn {...props} />}/>
                <Route path="/blunt/signin"
                       render={props => <SignIn {...props} />}/>
                <Route path="/blunt/signup" exact
                       render={props => <SignUp {...props} />}/>
                <Route path="/blunt/signup/:userid" exact
                       render={props => <SignUp {...props} />}/>
                <Route path="/blunt/posts"
                       render={props => <PostGridList {...props} />}/>
                <Redirect to="/blunt/home"/>
              </Switch>
            </Router>
            {/*<div>
              <BottomNavigation >
              </BottomNavigation>
            </div>*/}

          </Paper>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(BluntLayout);
