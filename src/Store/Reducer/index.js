import {combineReducers} from "redux";
import signInReducer from "./signInReducer";
import signUpReducer from "./signUpReducer";
import snackBarReducer from "./snackBarReducer";
import postReducer from "./postReducer";
import menuBarReducer from "./menuBarReducer";
import followerReducer from "./followerReducer";
import signOutReducer from "./signOutReducer";
import dashboardReducer from "./dashboardReducer";

export default combineReducers({
  signInReducer: signInReducer,
  signUpReducer: signUpReducer,
  snackBarReducer: snackBarReducer,
  postReducer: postReducer,
  menuBarReducer: menuBarReducer,
  followerReducer: followerReducer,
  signOutReducer: signOutReducer,
  dashboardReducer:dashboardReducer
});
