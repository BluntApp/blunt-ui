import {
  DISPLAY_SNACKBAR,
  LOAD_BLUNT_LOGGEDIN,
  LOAD_MENU_BAR_LIST,
  LOAD_POSTS,
  ROUTE_TO
} from "../Types";
import {
  CONNECTION_ERROR,
  LOGGED_IN_SUCCESS,
  SNACKBAR_VARIANT_ERROR,
  SNACKBAR_VARIANT_SUCCESS
} from "../../Constant/Constants";
import {AUTHORIZED_USER_MENUBAR} from "../../Constant/MenuBarConstants";
import {isNotEmptyObject} from "../Utility";
import bluntAxios from "../../Config/AxiosConfiguration";


export const signInBlunt = (mobile, password) => dispatch => {
  bluntAxios
  .post("/api/v1/onboard/signin",
      {"mobile": mobile, "password": password})
  .then(response => {
        sessionStorage.setItem("BLUNT-ID", response.data.id);
        dispatch({
          type: DISPLAY_SNACKBAR,
          message: LOGGED_IN_SUCCESS,
          variant: SNACKBAR_VARIANT_SUCCESS
        });
        dispatch({
          type: LOAD_BLUNT_LOGGEDIN,
          payload: response.data
        });
        dispatch({
          type: LOAD_MENU_BAR_LIST,
          payload: AUTHORIZED_USER_MENUBAR
        });
        dispatch({
          type: ROUTE_TO,
          path: "/blunt/dashboard"
        });
      }
  )
  .catch(error => {
    dispatch({
      type: DISPLAY_SNACKBAR,
      message: isNotEmptyObject(error.response) ? error.response.data.message : CONNECTION_ERROR,
      variant: SNACKBAR_VARIANT_ERROR
    })
  })
}
