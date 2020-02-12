import {updateObject} from "../Utility";
import {LOAD_BLUNT_LOGGEDIN, LOAD_POSTS} from "../Types";

const initialState = {
  signedInBlunt:{},
  posts: []
};

const signInReducer = (state = initialState, action) =>{
  switch (action.type) {
    case LOAD_POSTS:
      return updateObject(state, {
        posts: action.payload
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
