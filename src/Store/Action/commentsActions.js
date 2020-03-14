import {LOAD_COMMENTS, APPEND_COMMENTS} from "../Types";
import bluntAxios from "../../Config/AxiosConfiguration";

export const loadComments = (postId) => dispatch => {
  bluntAxios
  .get("/api/v1/comments/fetch/"+postId)
  .then(response => {
    dispatch({
      type: LOAD_COMMENTS,
      payload: response.data
    });
  })
}

export const addComment = (commentsDto) => {
  return dispatch => {
    bluntAxios
    .post("/api/v1/comments/add", commentsDto)
    .then(response => {
      dispatch({
        type: APPEND_COMMENTS,
        payload: response.data,
      });
    })
  };
}

