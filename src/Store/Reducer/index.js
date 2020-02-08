import {combineReducers} from "redux";
import signInReducer from "./signInReducer";
import signUpReducer from "./signUpReducer";
import snackBarReducer from "./snackBarReducer";
import postReducer from "./postReducer";
import menuBarReducer from "./menuBarReducer";
import followerReducer from "./followerReducer";

export default combineReducers({
  signInReducer: signInReducer,
  signUpReducer: signUpReducer,
  snackBarReducer: snackBarReducer,
  postReducer: postReducer,
  menuBarReducer: menuBarReducer,
  followerReducer: followerReducer
});
