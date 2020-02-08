import {updateObject} from "../Utility";
import {
  LOAD_POSTS,
  ROUTE_TO,
  LOAD_FOLLOWERS,
  LOAD_BLUNT_LOGGEDIN
} from "../Types";

const initialState = {
  routeTo:"",
  signedInBlunt:{},
  posts: []
};

const signInReducer = (state = initialState, action) =>{
  switch (action.type) {
    case LOAD_POSTS:
      return updateObject(state, {
        posts: action.payload
      })
    case ROUTE_TO:
      return updateObject(state, {
        routeTo: action.path
      })
    case LOAD_BLUNT_LOGGEDIN:
      return updateObject(state, {
        signedInBlunt: action.payload
      })
    default:
      return state;
  }
}

export default signInReducer;
