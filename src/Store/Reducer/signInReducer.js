import {updateObject} from "../Utility";
import {LOAD_POSTS, ROUTE_TO} from "../Types";

const initialState = {
  routeTo:"",
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
    default:
      return state;
  }
}

export default signInReducer;
