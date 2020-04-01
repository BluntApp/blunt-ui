import {
  CLOSE_FOLLOWER_DIALOG,
  DISPLAY_SNACKBAR,
  LOAD_FOLLOWERS,
  LOAD_FOLLOWINGS,
  LOAD_PENDING_FOLLOWERS,
  NICK_NAME_UNAVAILABLE,
  OPEN_FOLLOWER_DIALOG,
  RESET_VALIDATION_NICK_NAME,
  LOAD_VIEWERS,
  CLOSE_TIP_VIEWERS
} from "../Types";
import {
  CONNECTION_ERROR,
  SNACKBAR_VARIANT_ERROR,
  SNACKBAR_VARIANT_SUCCESS
} from "../../Constant/Constants";
import {isNotEmptyObject} from "../Utility";
import bluntAxios from "../../Config/AxiosConfiguration";


export const loadFollowers = () => dispatch => {
  bluntAxios
  .get("/api/v1/follow/followers")
  .then(response => {
    dispatch({
      type: LOAD_FOLLOWERS,
      payload: response.data,
    });
  })
}

export const loadFollowings = () => dispatch => {
  bluntAxios
  .get("/api/v1/follow/following")
  .then(response => {
    dispatch({
      type: LOAD_FOLLOWINGS,
      payload: response.data
    });
  })
}

export const loadPendingFollowers = () => dispatch => {
  bluntAxios
  .get("/api/v1/follow/pending")
  .then(response => {
    dispatch({
      type: LOAD_PENDING_FOLLOWERS,
      payload: response.data,
    });
  })
}

export const openPendingFollowerDialog = (pendingFollower)  => {
  return {
    type: OPEN_FOLLOWER_DIALOG,
    payload: pendingFollower,
    openFollowerDialog: true
  };
};

export const closePendingFollowerDialog = ()  => {
  return {
    type: CLOSE_FOLLOWER_DIALOG,
    openFollowerDialog: false
  };
};

export const viewersNameList = (postId) => dispatch => {
  bluntAxios
  .get("/api/v1/follow/viewers/"+postId)
  .then(response => {
    dispatch({
      type: LOAD_VIEWERS,
      payload: response.data,
      postId: postId
    });
  }).catch(error => {
    dispatch({
      type: DISPLAY_SNACKBAR,
      message: isNotEmptyObject(error.response) ? error.response.data.message : CONNECTION_ERROR,
      variant: SNACKBAR_VARIANT_ERROR
    })
  })
}

export const closeViewersTip = (postId)  => {
  return {
    type: CLOSE_TIP_VIEWERS,
    postId: postId,
    payload: false,
  };
};

export const checkNickNameAvailability = (nickName)  => {
  return (dispatch) => {
    bluntAxios.get("/api/v1/follow/check/" + nickName).then(response => {
          dispatch({
            type: RESET_VALIDATION_NICK_NAME,
          })
        }
    ).catch(error => {
      if (error.response.status == '409') {
        dispatch({
          type: NICK_NAME_UNAVAILABLE,
          payload: error.response.data.message
        })
      }
    })
  }
};

export const acceptPendingFollower = (nickName) => {
  return (dispatch, getState) => {
    const {pendingFollower} = getState().followerReducer;

    let ePendingFollower = {... pendingFollower};
    ePendingFollower.followerNickName = nickName;

    bluntAxios
    .post("/api/v1/follow/respond", ePendingFollower)
    .then(response => {
      dispatch(loadPendingFollowers());
      dispatch({
        type: CLOSE_FOLLOWER_DIALOG,
        openFollowerDialog: false
      });
      dispatch({
        type: DISPLAY_SNACKBAR,
        message: "Follower Request Accepted",
        variant: SNACKBAR_VARIANT_SUCCESS
      });
    })
    .catch(error => {
      dispatch({
        type: DISPLAY_SNACKBAR,
        message: isNotEmptyObject(error.response) ? error.response.data.message : CONNECTION_ERROR,
        variant: SNACKBAR_VARIANT_ERROR
      })
    })
  }
}

//handle array passing TODO
export const followInvite = (mobile, nickName) => dispatch => {
  bluntAxios
  .post("/api/v1/onboard/invite", {mobile,nickName})
  .then(response => {
    dispatch({
      type: DISPLAY_SNACKBAR,
      message: response.data,
      variant: SNACKBAR_VARIANT_SUCCESS
    });
  })
  .catch(error => {
    dispatch({
      type: DISPLAY_SNACKBAR,
      message: isNotEmptyObject(error.response) ? error.response.data.message : CONNECTION_ERROR,
      variant: SNACKBAR_VARIANT_ERROR
    })
  })
}




