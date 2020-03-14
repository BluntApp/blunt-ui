import axios from 'axios'
import store from "../Store/Configure";
import {DISPLAY_SNACKBAR, STOP_SPINNER} from "../Store/Types";
import {SNACKBAR_VARIANT_ERROR} from "../Constant/Constants";

const bluntAxios = axios.create({
  baseURL:"http://localhost:8765"
})

bluntAxios.interceptors.request.use(
    request => {
      request.headers['BLUNT-ID'] = sessionStorage.getItem('BLUNT-ID');
      request.headers['token'] ="access_token";
      request.timeout = 40000;
      return request;
    }
)

bluntAxios.interceptors.response.use(
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
      } else {
        store.dispatch({
          type: STOP_SPINNER
        })
      }
      return Promise.reject(error);
    }
)

export default bluntAxios;
