import axios from "axios";
import {
  DISPLAY_SNACKBAR,
  FILL_USER_ID,
  MOBILE_UNAVAILABLE,
  OTP_MISMATCH,
  RESET_VALIDATION_MESSAGE,
  ROUTE_TO
} from "../Types";
import {
  CONNECTION_ERROR,
  SNACKBAR_VARIANT_ERROR,
  SNACKBAR_VARIANT_SUCCESS
} from "../../Constant/Constants";
import {isNotEmptyObject} from "../Utility";

export const checkMobileAvailability = (mobile) => dispatch => {
  axios.get("http://localhost:8765/api/v1/onboard/check/" + mobile)
  .then(response => {
        dispatch({
          type: DISPLAY_SNACKBAR,
          message: response.data,
          variant: SNACKBAR_VARIANT_SUCCESS
        });
        dispatch({
          type: RESET_VALIDATION_MESSAGE,
        })
      }
  )
  .catch(error => {
    if (error.response.status == '409') {
      dispatch({
        type: MOBILE_UNAVAILABLE,
        payload: error.response.data.message
      })
    }
  })
};

export const resendOtp = (mobile) => dispatch => {
  console.log(mobile);
  axios.get("http://localhost:8765/api/v1/onboard/resend/" + mobile)
  .then(response => {
        dispatch({
          type: DISPLAY_SNACKBAR,
          message: response.data,
          variant: SNACKBAR_VARIANT_SUCCESS
        });
        dispatch({
          type: RESET_VALIDATION_MESSAGE,
        });
      }
  )
  .catch(error => {
    if (error.response.status == '406') {
      dispatch({
        type: DISPLAY_SNACKBAR,
        message: error.response.data.message,
        variant: SNACKBAR_VARIANT_ERROR
      })
    } else {
      dispatch({
        type: DISPLAY_SNACKBAR,
        message: "Service Unavailable",
        variant: SNACKBAR_VARIANT_ERROR
      })
    }
  })
};

export const validateOtpAndgenerateUserId = (mobile, otp) => dispatch => {
  axios
  .post("http://localhost:8765/api/v1/onboard/create",
      {"mobile": mobile, "otp": otp})
  .then(response => {
        dispatch({
          type: FILL_USER_ID,
          payload: response.data
        });
        dispatch({
          type: RESET_VALIDATION_MESSAGE
        })
      }
  ).catch(error => {
    if (error.response.status == '401') {
      dispatch({
        type: OTP_MISMATCH,
        payload: error.response.data.message
      })
    } else if (error.response.status == '509') {
      dispatch({
        type: DISPLAY_SNACKBAR,
        message: error.response.data.message,
        variant: SNACKBAR_VARIANT_ERROR
      })
    }
  })
}

export const signUpBlunt = (registerDetail) => dispatch => {
  axios
  .post("http://localhost:8765/api/v1/onboard/signup", registerDetail)
  .then(response => {
        dispatch({
          type: DISPLAY_SNACKBAR,
          message: "Blunt SignUp Success",
          variant: SNACKBAR_VARIANT_SUCCESS
        });
        dispatch({
          type: ROUTE_TO,
          path: "/blunt/signin"
        });
      }
  )
  .catch(error => {
    dispatch({
      type: DISPLAY_SNACKBAR,
      message: isNotEmptyObject(error.response) ? error.response.data.message
          : CONNECTION_ERROR,
      variant: SNACKBAR_VARIANT_ERROR
    })
  })
}
