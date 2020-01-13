import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from "history";
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./Store/Configure";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import Layout from "./Component/Layout/BluntLayout";
import BluntSnackbar from "./Component/SnackBar/BluntSnackBar";


ReactDOM.render(
    <Provider  store={store}>
      <Layout/>
      <BluntSnackbar/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
