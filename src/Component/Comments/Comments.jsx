import {connect} from "react-redux";
import {Divider, MuiThemeProvider} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React, {useEffect, useState} from "react";
import commentsMuiTheme from "./commentsMuiTheme";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import cs from "classnames";
import commentsStyles from "./commentsStyles";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import {addComment} from "../../Store/Action/commentsActions";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";

const Comments = props => {
  const classes = commentsStyles();
  const sessionBluntId = sessionStorage.getItem("BLUNT-ID");
  const [commentsReceived, setCommentsReceived] = useState();
  const [commentDto, setCommentDto] = useState({
    comments: "",
    postId: ""
  });

  const changePrivateComment = (event, commentReply) => {
    let cPostList = [...commentsReceived];
    if (commentsReceived[0]) {
      let cPost = cPostList.find(comment => comment.id === commentReply.id)
      cPost.reply = event.target.value;
    }
    setCommentsReceived(cPostList);
  }
  const postPrivateComment = (commentReply, selectedPostId) => {
    props.addComment({"postId": selectedPostId, "replyToCommentId": commentReply.id, "comments": commentReply.reply});
    toggleReplyBox(false, commentReply.id)
  }

  const toggleReplyBox = (value, commentId) => {
    let cPostList = [...commentsReceived];
    if (commentsReceived[0]) {
      let cPost = cPostList.find(comment => comment.id === commentId)
      cPost.showReplyBox = value;
      if(!value){
        cPost.reply="";
      }
    }
    setCommentsReceived(cPostList);
  }


  const postComment = () => {
    props.addComment(commentDto);
    setCommentDto(
        {...commentDto, comments: ""});
  }

  useEffect(() => {
    setCommentsReceived(props.selectedPost.comments);
  }, [props.selectedPost, props.posts])

  const displayName = (comment) => {
    // reveal request to be handled.
    if (comment.commenterId == null) {
      return "Alien";
    } else if (sessionBluntId == comment.commenterId) {
      return "You";
    } else if (comment.commenterId == comment.posterId) {
      return comment.posterName;
    }
  }

  const displayReply = (comment) => {
    if (comment.commenterId == null) {
      if(sessionBluntId == comment.posterId){
        return false;
      }
      return true;
    }
    return false;
  }

  const storeComment = (event, selectedPostId) => {
    setCommentDto(
        {...commentDto, comments: event.target.value, postId: selectedPostId});
  }

  const changeComment = (event) => {
    setCommentDto(
        {...commentDto, comments: event.target.value});
  }



  return (
      <MuiThemeProvider theme={commentsMuiTheme}>
        <Paper elevation={1} className={cs(classes.commentBox)}>
          <card>
            {commentsReceived && commentsReceived.map(
                comment => (<div>
                  <CardHeader
                      title={displayName(comment)}
                      subheader={comment.commentedOn}
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={11}>
                        <Typography variant="body2" color="textSecondary"
                                    component="p">
                          {comment.comments}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <div hidden={displayReply(comment)? true : comment.showReplyBox}>
                          <Button size="small" color="primary"
                                  onClick={event => toggleReplyBox(true,
                                      comment.id)}>
                            Reply
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                    <div hidden={!comment.showReplyBox}>
                      <Grid container spacing={2}>
                        <Grid item xs={11}>
                          <TextareaAutosize
                              rowsMax={4}
                              aria-label="maximum height"
                              placeholder="Comments Added here is Private"
                              className={cs(classes.commentTextAlignment)}
                              id="contentReply"
                              value={comment.reply}
                              onChange={(event) => changePrivateComment(event, comment)}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Button size="small" color="primary" disabled={!comment.reply || comment.reply.length==0}
                                  onClick={event => postPrivateComment(comment,props.selectedPost.id)}>
                            submit
                          </Button>
                          <Button size="small" color="primary"
                                  onClick={event => toggleReplyBox(false,
                                      comment.id)}>
                            Cancel
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>
                  <Divider/>
                </div>)
            )}
            <div>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={11}>
                    <TextareaAutosize
                        rowsMax={4}
                        aria-label="maximum height"
                        placeholder="Comments Added here is visible to all"
                        className={cs(classes.commentTextAlignment)}
                        id="content"
                        value={commentDto.comments}
                        onChange={(event) => changeComment(event)}
                        onBlur={(event) => storeComment(event,
                            props.selectedPost.id)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button size="small" color="primary"
                            onClick={event => postComment()} disabled={commentDto.comments.length==0}>
                      submit
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </div>

          </card>
        </Paper>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  posts: state.postReducer.posts
});
export default connect(mapStateToProps, {addComment})(Comments);
