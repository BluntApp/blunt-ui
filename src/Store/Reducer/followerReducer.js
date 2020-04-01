import {updateObject} from "../Utility";
import {
  CLOSE_FOLLOWER_DIALOG,
  LOAD_FOLLOWERS,
  LOAD_FOLLOWINGS,
  LOAD_PENDING_FOLLOWERS, LOAD_VIEWERS,
  NICK_NAME_UNAVAILABLE,
  OPEN_FOLLOWER_DIALOG,
  RESET_VALIDATION_NICK_NAME
} from "../Types";

const initialState = {
  followers: [],
  followings: [],
  pendingFollowers: [],
  pendingFollower: {},
  openFollowerDialog: false,
  nickNameCheckError: "",
  viewersName: []
};

const signInReducer = (state = initialState, action) =>{
  switch (action.type) {
    case LOAD_FOLLOWERS:
      return updateObject(state, {
        followers: action.payload
      });
    case LOAD_FOLLOWINGS:
      return updateObject(state, {
        followings: action.payload
      });
    case LOAD_PENDING_FOLLOWERS:
      return updateObject(state, {
        pendingFollowers: action.payload
      });
    case OPEN_FOLLOWER_DIALOG:
      return updateObject(state, {
        pendingFollower: action.payload,
        openFollowerDialog: action.openFollowerDialog
      })
    case CLOSE_FOLLOWER_DIALOG:
      return updateObject(state, {
        pendingFollower: {},
        openFollowerDialog: action.openFollowerDialog
      })
    case RESET_VALIDATION_NICK_NAME:
      return updateObject(state, {
        nickNameCheckError: ""
      })
    case NICK_NAME_UNAVAILABLE:
      return updateObject(state, {
        nickNameCheckError: action.payload
      })

    default:
      return state;
  }
}

export default signInReducer;
