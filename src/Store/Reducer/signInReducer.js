import {updateObject} from "../Utility";
import {LOAD_BLUNT_LOGGEDIN, LOAD_POSTS} from "../Types";

const initialState = {
  signedInBlunt:{}
};

const signInReducer = (state = initialState, action) =>{
  switch (action.type) {

    case LOAD_BLUNT_LOGGEDIN:
      return updateObject(state, {
        signedInBlunt: action.payload
      })
    default:
      return state;
  }
}

export default signInReducer;
