import {updateObject} from "../Utility";
import {OPEN_CLOSE_MENU_BAR, LOAD_MENU_BAR_LIST} from "../Types";
import {ALL_USER_MENUBAR} from "../../Constant/MenuBarConstants";

const initialState = {
  menuBarList: ALL_USER_MENUBAR,
  isMenuBarOpen: false
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CLOSE_MENU_BAR:
      return updateObject(state, {
        isMenuBarOpen: action.payload,
      })
    case LOAD_MENU_BAR_LIST:
      return updateObject(state, {
        menuBarList: action.payload,
      })
    default:
      return state;
  }
};

export default signUpReducer;
