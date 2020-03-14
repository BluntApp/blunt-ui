import {LOAD_DASHBOARD,START_SPINNER} from "../Types";
import bluntAxios from "../../Config/AxiosConfiguration";
import {useEffect} from "react";


export const loadDashboard = () => dispatch => {
  dispatch({
    type: START_SPINNER,
    payload: true,
  });
  bluntAxios
  .get("/api/v1/metrics/blunt")
  .then(response => {
    dispatch({
      type: LOAD_DASHBOARD,
      payload: response.data,
    });
  })
}




