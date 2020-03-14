import {LOAD_DASHBOARD, START_SPINNER, STOP_SPINNER} from "../Types";
import {updateObject} from "../Utility";

const initialState = {
  metrics: {},
  spin: true
};

const dashBoardReducer = (state = initialState, action) =>{
  switch (action.type) {
    case START_SPINNER:
      return updateObject(state, {
        spin: true
      })
    case STOP_SPINNER:
      return updateObject(state, {
        spin: false
      })
    case LOAD_DASHBOARD:
      return updateObject(state, {
        metrics: action.payload,
        spin: false
      })
    default:
      return state;
  }
}

export default dashBoardReducer;
