import {updateObject} from "../Utility";
import {LOAD_MENU_BAR_LIST, OPEN_CLOSE_MENU_BAR, ROUTE_TO} from "../Types";
import {ALL_USER_MENUBAR} from "../../Constant/MenuBarConstants";

const initialState = {
  menuBarList: ALL_USER_MENUBAR,
  isMenuBarOpen: false,
  routeTo:"",
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
    case ROUTE_TO:
      return updateObject(state, {
        routeTo: action.path
      })
    default:
      return state;
  }
};

export default signUpReducer;
