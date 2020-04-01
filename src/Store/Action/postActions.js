import {APPEND_POST,APPEND_CONTENT, DISPLAY_SNACKBAR, LOAD_POSTS} from "../Types";
import {
  POSTED_SUCCESSFULLY,
  SNACKBAR_VARIANT_SUCCESS
} from "../../Constant/Constants";
import bluntAxios from "../../Config/AxiosConfiguration";

export const loadPosts =()=> dispatch =>{
  bluntAxios
  .get("/api/v1/publish/posts")
  .then(response => {
    dispatch({
      type: LOAD_POSTS,
      payload: response.data,
    });
    response.data.map(post => {
      bluntAxios
      .get("/api/v1/publish/content/"+post.contentId)
      .then(response=>{
        post.contentDto = response.data;
        dispatch({
          type: APPEND_CONTENT,
          postWithContent: post
        });
      })
    })
  });
}


export const postContent = (followers,content,selectedFile,allRead) => dispatch => {

  let contentDto = {"content": content}
  let postDto = {"viewerList": followers, "commentPublic": allRead, contentDto}
  const formData = new FormData();
  formData.append('file', selectedFile[0]);
  formData.append('postDto', JSON.stringify(postDto));
  bluntAxios
  .post("/api/v1/publish/post", formData)
  .then(response => {
    response.data.contentDto=contentDto;
    dispatch({
      type: DISPLAY_SNACKBAR,
      message: POSTED_SUCCESSFULLY,
      variant: SNACKBAR_VARIANT_SUCCESS
    });
    dispatch({
      type: APPEND_POST,
      payload: response.data
    });
  })
};



