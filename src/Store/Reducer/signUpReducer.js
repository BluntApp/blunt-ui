import {updateObject} from "../Utility";
import {
  FILL_USER_ID,
  MOBILE_UNAVAILABLE,
  OTP_MISMATCH,
  RESET_VALIDATION_MESSAGE
} from "../Types";

const initialState = {
  mobileCheckMessage: "",
  otpMismatchMessage:"",
  generatedUserId:"",
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOBILE_UNAVAILABLE:
      return updateObject(state, {
        mobileCheckMessage: action.payload
      });
    case FILL_USER_ID:
      return updateObject(state, {
        generatedUserId: action.payload,
      })
    case OTP_MISMATCH:
      return updateObject(state, {
        otpMismatchMessage: action.payload
      })
    case RESET_VALIDATION_MESSAGE:
      return updateObject(state, {
        otpMismatchMessage: "",
        mobileCheckMessage: ""
      })
    default:
      return state;
  }
};

export default signUpReducer;
