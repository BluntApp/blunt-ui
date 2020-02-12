import {LOAD_MENU_BAR_LIST, OPEN_CLOSE_MENU_BAR} from "../Types";
import {AUTHORIZED_USER_MENUBAR} from "../../Constant/MenuBarConstants";

export const toggleMenuBar = (value)  => {
  return {
    type: OPEN_CLOSE_MENU_BAR,
    payload: value
  };
};

export const loadMenubarList = () => {
  return {
    type: LOAD_MENU_BAR_LIST,
    payload: AUTHORIZED_USER_MENUBAR
  };
}
