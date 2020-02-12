import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./Store/Configure";
import BluntLayout from "./Component/Layout/BluntLayout";
import BluntSnackbar from "./Component/SnackBar/BluntSnackBar";
import BluntAppBar from "./Component/AppBar/BluntAppBar";
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import axios from "axios";
import {DISPLAY_SNACKBAR} from "./Store/Types";
import {SNACKBAR_VARIANT_ERROR} from "./Constant/Constants";

const hist = createBrowserHistory();
ReactDOM.render(
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router history={hist}>
          <BluntAppBar/>
          <BluntLayout/>
        </Router>
        <BluntSnackbar/>
      </MuiPickersUtilsProvider>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

axios.interceptors.request.use(
    request => {
      console.log("request"+ request)
      request.headers['BLUNT-ID'] = sessionStorage.getItem('BLUNT-ID');
      request.headers['token'] ="access_token";
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
