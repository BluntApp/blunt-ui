import {connect} from "react-redux";
import {Divider, MuiThemeProvider} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React, {useState} from "react";
import commentsMuiTheme from "./commentsMuiTheme";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import cs from "classnames";
import commentsStyles from "./commentsStyles";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import {addComment} from "../../Store/Action/commentsActions";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";

const Comments = props => {
  const classes = commentsStyles();

  const sessionBluntId = sessionStorage.getItem("BLUNT-ID");
  const [commentDto, setCommentDto] = useState({
    replyToId: null,
    replyToCommentId: null,
    comments: "",
    postId: "",
  });

  const postComment = () => {
    props.addComment(commentDto);
    setCommentDto(
        {...commentDto, comments: ""});
  }

  const displayName = (comment) => {
    // reveal request to be handled.
    if (comment.commenterId == null) {
      return "Alien";
    } else if(sessionBluntId == comment.commenterId){
        return "You";
    } else if (comment.commenterId == comment.posterId) {
        return comment.posterName;
    }
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
            {props.selectedPost.comments && props.selectedPost.comments.map(
                comment =>  (<div>
                    <CardHeader
                        title={displayName(comment)}
                        subheader={comment.commentedOn}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary"
                                  component="p">
                        {comment.comments}
                      </Typography>
                    </CardContent>
                    <Divider/>
                  </div>)
                )}
            <div>
              <CardContent>
                <TextareaAutosize
                    rowsMax={4}
                    aria-label="maximum height"
                    placeholder="Add your Comments"
                    className={cs(classes.commentTextAlignment)}
                    id="content"
                    value={commentDto.comments}
                    onChange={(event) => changeComment(event)}
                    onBlur={(event) => storeComment(event,
                        props.selectedPost.id)}
                />
                <Button size="small" color="primary"
                        onClick={event => postComment()}>
                  submit
                </Button>
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
