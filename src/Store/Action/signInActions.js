import {DISPLAY_SNACKBAR, LOAD_POSTS, ROUTE_TO} from "../Types";
import axios from "axios";
import {
  SNACKBAR_VARIANT_ERROR,
  SNACKBAR_VARIANT_SUCCESS
} from "../../Constant/Constants";

export const dummyPosts =
    [
      {
        "id": "1",
        "postedBy": "karpoora",
        "postedOn": "20 jan 2019",
        "content": "Hi this is first post"
      },
      {
        "id": "2",
        "postedBy": "sundara",
        "postedOn": "22 jan 2019",
        "content": "Hi this is second post"
      },
      {
        "id": "3",
        "postedBy": "pandian",
        "postedOn": "23 jan 2019",
        "content": "Hi this is third post"
      },
      {
        "id": "4",
        "postedBy": "kajal",
        "postedOn": "24 jan 2019",
        "content": "Hi this is fourth post"
      },
      {
        "id": "5",
        "postedBy": "jaya",
        "postedOn": "25 jan 2019",
        "content": "Hi this is fifth post"
      },
    ]

export const signInBlunt = (mobile, password) => dispatch => {
  axios
  .post("http://localhost:8765/api/v1/onboard/signin",
      {"mobile": mobile, "password": password})
  .then(response => {
        dispatch({
          type: DISPLAY_SNACKBAR,
          message: response.data,
          variant: SNACKBAR_VARIANT_SUCCESS
        });
        dispatch({
          type: ROUTE_TO,
          path: "/blunt/posts"
        });
        dispatch({
          type: LOAD_POSTS,
          payload: dummyPosts,
        })
      }
  )
  .catch(error => {
    dispatch({
      type: DISPLAY_SNACKBAR,
      message: error.response.data.message,
      variant: SNACKBAR_VARIANT_ERROR
    })
  })
}
