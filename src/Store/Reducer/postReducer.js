import {
  LOAD_POSTS,
  APPEND_POST,
  APPEND_CONTENT,
  LOAD_COMMENTS,
  APPEND_COMMENTS
} from "../Types";
import {updateObject} from "../Utility";

const initialState = {
  newPost: {},
  posts: []
};

const postReducer = (state = initialState, action) =>{
  switch (action.type) {

    case LOAD_POSTS:
      return updateObject(state, {
        posts: action.payload
      })
    case APPEND_POST:
      let sPosts = [...state.posts];
      sPosts.unshift(action.payload);
      return {...state, posts:sPosts};
    case APPEND_CONTENT:
      let postList = [...state.posts];
      let post = postList.find(post => post.id === action.postWithContent.id)
      post=action.postWithContent;
      return {...state, posts:postList};
    case LOAD_COMMENTS:
      let cPostList = [...state.posts];
      if(action.payload[0]){
        let cPost = cPostList.find(post => post.contentId === action.payload[0].postRefId)
        cPost.comments=action.payload
      }
      return {...state, posts:cPostList};
    case APPEND_COMMENTS:
      let commentsPostList = [...state.posts];
      let commentsPost = commentsPostList.find(post => post.id === action.payload.postId);
      if(!commentsPost.comments){
        commentsPost.comments=[];
      }
      commentsPost.comments.unshift(action.payload);
      return {...state, posts:commentsPostList};
    default:
      return state;
  }
}

export default postReducer;
