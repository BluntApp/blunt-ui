import {
  DISPLAY_SNACKBAR,
  LOAD_BLUNT_LOGGEDIN,
  LOAD_FOLLOWERS, LOAD_MENU_BAR_LIST,
  LOAD_POSTS, OPEN_CLOSE_MENU_BAR, RESET_SNACKBAR_MESSAGE,
  ROUTE_TO
} from "../Types";
import axios from "axios";
import {
  LOGGED_IN_SUCCESS,
  SNACKBAR_VARIANT_ERROR,
  SNACKBAR_VARIANT_SUCCESS
} from "../../Constant/Constants";
import {AUTHORIZED_USER_MENUBAR} from "../../Constant/MenuBarConstants";

export const toggleMenuBar = (value)  => {
  return {
    type: OPEN_CLOSE_MENU_BAR,
    payload: value
  };
};
