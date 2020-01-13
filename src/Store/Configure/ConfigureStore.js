import {applyMiddleware, compose, createStore} from "redux";

import rootReducer from "../Reducer";
import thunk from "redux-thunk";

export default function configureStore(preloadedState) {
  const initialState = {};

  const composeEnhancer =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middleware = [thunk];

  const enhancer = composeEnhancer(applyMiddleware(...middleware));

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
