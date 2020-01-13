import {updateObject} from "../Utility";
import {DISPLAY_SNACKBAR, RESET_SNACKBAR_MESSAGE} from "../Types";

const initialState = {
  snackBarMessage: "",
  messageVariant: ""
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_SNACKBAR:
      return updateObject(state, {
        snackBarMessage: action.message,
        messageVariant: action.variant
      });
    case RESET_SNACKBAR_MESSAGE:
      return updateObject(state, {
        snackBarMessage: "",
      })
    default:
      return state;
  }
};

export default signUpReducer;
