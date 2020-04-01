import {LOAD_COMMENTS, APPEND_COMMENTS, DISPLAY_SNACKBAR, LOAD_REPLY_COMMENTS} from "../Types";
import bluntAxios from "../../Config/AxiosConfiguration";
import {isNotEmptyObject} from "../Utility";
import {
  CONNECTION_ERROR,
  SNACKBAR_VARIANT_ERROR
} from "../../Constant/Constants";

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

export const getReplyToComment = (commentsDto, postId) => dispatch => {
  commentsDto.postId = postId;
  bluntAxios
  .post("/api/v1/comments/replies", commentsDto)
  .then(response => {
    dispatch({
      type: LOAD_REPLY_COMMENTS,
      payload: response.data,
      commentsDto: commentsDto
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
    .catch(error => {
      dispatch({
        type: DISPLAY_SNACKBAR,
        message: isNotEmptyObject(error.response) ? error.response.data.message : CONNECTION_ERROR,
        variant: SNACKBAR_VARIANT_ERROR
      })
    })
  };
}

