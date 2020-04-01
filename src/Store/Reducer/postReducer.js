import {
  APPEND_COMMENTS,
  APPEND_CONTENT,
  APPEND_POST, CLOSE_TIP_VIEWERS,
  LOAD_COMMENTS,
  LOAD_POSTS, LOAD_REPLY_COMMENTS,
  LOAD_VIEWERS
} from "../Types";
import {updateObject} from "../Utility";

const initialState = {
  newPost: {},
  posts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_POSTS:
      return updateObject(state, {
        posts: action.payload
      })
    case APPEND_POST:
      let sPosts = [...state.posts];
      sPosts.unshift(action.payload);
      return {...state, posts: sPosts};
    case APPEND_CONTENT:
      let postList = [...state.posts];
      let post = postList.find(post => post.id === action.postWithContent.id)
      post = action.postWithContent;
      return {...state, posts: postList};
    case LOAD_COMMENTS:
      let cPostList = [...state.posts];
      if (action.payload[0]) {
        let cPost = cPostList.find(
            post => post.contentId === action.payload[0].postRefId)
        cPost.comments = action.payload
      }
      return {...state, posts: cPostList};
    case APPEND_COMMENTS:
      let commentsPostList = [...state.posts];
      let commentsPost = commentsPostList.find(
          post => post.id === action.payload.postId);
      if (!commentsPost.comments) {
        commentsPost.comments = [];
      }
      commentsPost.comments.unshift(action.payload);
      return {...state, posts: commentsPostList};
    case CLOSE_TIP_VIEWERS:
      let clPostList = [...state.posts];
      let clPost = clPostList.find(post => post.id === action.postId)
      clPost.openViewerTip = action.payload;
      return {...state, posts: clPostList};
    case LOAD_VIEWERS:
      let vPostList = [...state.posts];
      let cPost = vPostList.find(post => post.id === action.postId)
      cPost.viewersName = action.payload;
      cPost.openViewerTip = true;
      return {...state, posts: vPostList};
    case LOAD_REPLY_COMMENTS:
      let replyPostList = [...state.posts];
      let replyPost = replyPostList.find(post => post.id === action.commentsDto.postId);
      if (!replyPost.comments) {
        replyPost.comments = [];
      }
      let replyCommentPost = replyPost.comments.find(comment => comment.id === action.commentsDto.id);
      replyCommentPost.replyToComments = action.payload;
      return {...state, posts: replyPostList};
    default:
      return state;
  }
}

export default postReducer;
