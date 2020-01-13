import {combineReducers} from "redux";
import signInReducer from "./signInReducer";
import signUpReducer from "./signUpReducer";
import snackBarReducer from "./snackBarReducer";

export default combineReducers({
  signInReducer: signInReducer,
  signUpReducer: signUpReducer,
  snackBarReducer: snackBarReducer
});
