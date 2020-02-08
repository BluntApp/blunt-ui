import {
  DISPLAY_SNACKBAR,
  LOAD_BLUNT_LOGGEDIN,
  LOAD_FOLLOWERS,
  LOAD_MENU_BAR_LIST,
  LOAD_POSTS,
  ROUTE_TO
} from "../Types";
import axios from "axios";
import {
  LOGGED_IN_SUCCESS,
  SNACKBAR_VARIANT_ERROR,
  SNACKBAR_VARIANT_SUCCESS
} from "../../Constant/Constants";
import {AUTHORIZED_USER_MENUBAR} from "../../Constant/MenuBarConstants";

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

export const dummyFollowers =
    [
      {
        "id": "1",
        "bluntId": "bluntId1",
        "followerId": "followerId1",
        "followerName": "followerName1",
        "followerNickName": "followerNickName1",
        "status": "ACCEPTED"
      },
      {
        "id": "2",
        "bluntId": "bluntId2",
        "followerId": "followerId2",
        "followerName": "followerName2",
        "followerNickName": "followerNickName2",
        "status": "ACCEPTED"
      },
      {
        "id": "3",
        "bluntId": "bluntId3",
        "followerId": "followerId3",
        "followerName": "followerName3",
        "followerNickName": "followerNickName3",
        "status": "ACCEPTED"
      },
      {
        "id": "4",
        "bluntId": "bluntId4",
        "followerId": "followerId4",
        "followerName": "followerName4",
        "followerNickName": "followerNickName4",
        "status": "ACCEPTED"
      },
      {
        "id": "5",
        "bluntId": "bluntId5",
        "followerId": "followerId5",
        "followerName": "followerName5",
        "followerNickName": "followerNickName5",
        "status": "ACCEPTED"
      },
      {
        "id": "1",
        "bluntId": "bluntId1",
        "followerId": "followerId1",
        "followerName": "followerName1",
        "followerNickName": "followerNickName1",
        "status": "ACCEPTED"
      },
      {
        "id": "2",
        "bluntId": "bluntId2",
        "followerId": "followerId2",
        "followerName": "followerName2",
        "followerNickName": "followerNickName2",
        "status": "ACCEPTED"
      },
      {
        "id": "3",
        "bluntId": "bluntId3",
        "followerId": "followerId3",
        "followerName": "followerName3",
        "followerNickName": "followerNickName3",
        "status": "ACCEPTED"
      },
      {
        "id": "4",
        "bluntId": "bluntId4",
        "followerId": "followerId4",
        "followerName": "followerName4",
        "followerNickName": "followerNickName4",
        "status": "ACCEPTED"
      },
      {
        "id": "5",
        "bluntId": "bluntId5",
        "followerId": "followerId5",
        "followerName": "followerName5",
        "followerNickName": "followerNickName5",
        "status": "ACCEPTED"
      },
      {
        "id": "6",
        "bluntId": "bluntId6",
        "followerId": "followerId6",
        "followerName": "followerName6",
        "followerNickName": "followerNickName6",
        "status": "ACCEPTED"
      }
    ]

export const signInBlunt = (mobile, password) => dispatch => {
  /*axios.interceptors.request.use(
      async request => {
        request.headers['USER_ID'] = 'useridFromInterceptor'
        return request;
      }
  )*/

  axios
  .post("http://localhost:8765/api/v1/onboard/signin",
      {"mobile": mobile, "password": password})
  .then(response => {
        dispatch({
          type: DISPLAY_SNACKBAR,
          message: LOGGED_IN_SUCCESS,
          variant: SNACKBAR_VARIANT_SUCCESS
        });
        dispatch({
          type: LOAD_BLUNT_LOGGEDIN,
          payload: response.data
        });
        dispatch({
          type: LOAD_MENU_BAR_LIST,
          payload: AUTHORIZED_USER_MENUBAR
        });
        dispatch({
          type: ROUTE_TO,
          path: "/blunt/posts"
        });

        axios
        .get("http://localhost:8765/api/v1/publish/posts", {
          headers: {"BLUNT-ID": response.data.id}
        })
        .then(response => {
          dispatch({
            type: LOAD_POSTS,
            payload: dummyPosts,
          });
        });
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
