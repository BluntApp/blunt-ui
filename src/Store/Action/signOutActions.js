import {LOAD_MENU_BAR_LIST, ROUTE_TO} from "../Types";
import {ALL_USER_MENUBAR} from "../../Constant/MenuBarConstants";

export const signOutBlunt = () => dispatch => {
  sessionStorage.clear();
  dispatch({
    type: ROUTE_TO,
    path: "/blunt/signout"
  });
  dispatch({
    type: LOAD_MENU_BAR_LIST,
    payload: ALL_USER_MENUBAR
  });
};


