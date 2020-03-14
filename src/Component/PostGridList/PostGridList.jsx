import {connect} from "react-redux";
import {MuiThemeProvider} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React, {useEffect, useState} from "react";
import postGridListMuiTheme from "./postGridListMuiTheme";
import postGridListStyles from "./postGridListStyles";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import cs from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {loadFollowers} from "../../Store/Action/followerActions";
import {loadPosts, postContent} from "../../Store/Action/postActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Comments from "../Comments/Comments";
import {loadComments} from "../../Store/Action/commentsActions";

const PostGridList = props => {
  const classes = postGridListStyles();

  const loadComments = (event, expanded,  postId) => {
    if(!expanded){
      return;
    }
    props.loadComments(postId)
  };

  const flipExpansionPanel = () => {
    setExpand(!expand)
  }

  const [expand, setExpand] = useState(false)
  const [followerList, setFollowerList] = useState([])
  const [checked, setChecked] = useState([]);
  const [content, setContent] = useState();
  const [allRead, setAllRead] = useState(false);

  const toggleAllRead = (value) => {
    setAllRead(value);
  }
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const filterFollowers = (event) => {
    let eFollowerList = [...props.followers]
    eFollowerList = eFollowerList.filter(follower => {
      return follower.followerNickName.toLowerCase().search(
          event.target.value.toLowerCase()
      ) !== -1;
    });
    setFollowerList(eFollowerList)
  }

  const storeContent = (event) => {
    setContent(event.target.value);
  }

  const postContent = () => {
    let selectedFollowerId = [];
    checked.map(selectedFollower => {
      selectedFollowerId.push(selectedFollower.followerId)
    })
    props.postContent(selectedFollowerId, content, allRead);
  }

  useEffect(() => {
    props.loadPosts();
    props.loadFollowers()
  }, [])

  useEffect(() => {
    setFollowerList(props.followers);
  }, [props.followers])

  return (
      <MuiThemeProvider theme={postGridListMuiTheme}>
        <Grid container direction="row" justify="center">
          <Card className={cs(classes.postCardPanel)}>
            <ExpansionPanel expanded={expand}>
              <ExpansionPanelSummary
                  expandIcon={<AddCircleIcon/>}
                  aria-controls="panel1c-content"
                  id="panel1c-header"
                  onClick={flipExpansionPanel}
              >
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>Add New
                    Post</Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.newPostPanel}>
                <Paper className={cs(classes.followerSearchWidth)}>
                  <Paper className={cs(classes.followerSearchText)}
                         elevation={0}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <SearchIcon/>
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid"
                                   label="Search Followers"
                                   onChange={event => filterFollowers(event)}/>
                      </Grid>
                    </Grid>
                  </Paper>

                  <Paper className={cs(classes.followerFilteredList)}
                         elevation={0}>

                    <List>
                      {followerList.map(follower => {
                        return (
                            <ListItem key={follower.id} button>
                              <ListItemAvatar>
                                <Avatar aria-label="recipe"
                                        className={classes.avatar}>
                                  R
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText id={follower.id}
                                            primary={follower.followerNickName}/>
                              <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(follower)}
                                    checked={checked.indexOf(follower) !== -1}
                                    inputProps={{'aria-labelledby': follower.id}}
                                />
                              </ListItemSecondaryAction>
                            </ListItem>
                        );
                      })}
                    </List>
                  </Paper>
                </Paper>

                <Paper className={cs(classes.newPostWidth)}>
                  <CardContent>
                    <TextareaAutosize
                        rowsMax={4}
                        aria-label="maximum height"
                        placeholder="Post your ideas here"
                        className={cs(classes.contentBox)}
                        id="content"
                        onBlur={(event) => storeContent(event)}
                    />
                  </CardContent>
                  <FormControlLabel
                      control={
                        <Tooltip
                            title="Allow all Followers to read others comments"
                            interactive>
                          <Checkbox
                              checked={allRead}
                              onChange={() => toggleAllRead(!allRead)}
                              value="isCommentsPublic"
                              color="secondary"
                          />
                        </Tooltip>
                      }
                      label="Comments Read By All"
                      className={cs(classes.isCommentsPublicAlign)}
                  />
                </Paper>

              </ExpansionPanelDetails>
              <Divider/>
              <ExpansionPanelActions>
                <Button size="small"
                        onClick={flipExpansionPanel}>Cancel</Button>
                <Button size="small" color="primary" onClick={postContent}>
                  Post
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Card>
          {props.posts.map(post => (
              <Card className={cs(classes.postCardPanel)}>
                <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }

                    title={post.posterId === post.viewerId ? "You"
                        : post.posterName}
                    subheader={post.postedOn}

                />
                <CardContent className={cs(classes.contentAlignment)}>
                  <Typography variant="body2" color="textSecondary"
                              component="p">
                    {post.contentDto && post.contentDto.content}
                  </Typography>
                </CardContent>

                <ExpansionPanel TransitionProps={{unmountOnExit: true}} onChange={(event,expanded) => loadComments(event, expanded, post.id)}>
                  <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon/>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                  >
                    <Typography variant="body2" color="textSecondary"
                                component="p">
                      Comments
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Comments selectedPost={post}/>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Card>
          ))}
        </Grid>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  posts: state.postReducer.posts,
  followers: state.followerReducer.followers
});

export default connect(mapStateToProps,
    {loadFollowers, loadPosts, postContent, loadComments})(PostGridList);
