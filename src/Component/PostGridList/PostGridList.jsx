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

const PostGridList = props => {
  const classes = postGridListStyles();

  const loadComments = (value) => {
    console.log(value);
  };

  const flipExpansionPanel = () => {
    setExpand(!expand)
  }

  const [postList, setPostList] = useState([])
  const [expand, setExpand] = useState(false)
  const [followerList, setFollowerList] = useState([])
  const [checked, setChecked] = useState([1]);

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



  useEffect(() => {
    let ePostList = [...postList]
    props.posts.forEach(post => {
      ePostList.push(post)
    })
    setPostList([...postList, ...ePostList]);
  }, [props.posts])

  useEffect(()=>{
    props.loadFollowers()
  },[])


  useEffect(() => {
    setFollowerList(props.followers);
  }, [props.followers])

  return (
      <MuiThemeProvider theme={postGridListMuiTheme}>
        <Grid container direction="row" justify="center"  >
          <Card>
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
                              <ListItem key={follower} button>
                                <ListItemAvatar>
                                  <Avatar
                                      alt={`Avatar n°${follower + 1}`}
                                      src={`/static/images/avatar/${follower + 1}.jpg`}
                                  />
                                </ListItemAvatar>
                                <ListItemText id={follower.id} primary={follower.followerNickName} />
                                <ListItemSecondaryAction>
                                  <Checkbox
                                      edge="end"
                                      onChange={handleToggle(follower)}
                                      checked={checked.indexOf(follower) !== -1}
                                      inputProps={{ 'aria-labelledby': follower.id }}
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
                        placeholder="Maximum 4 rows"
                        defaultValue="Going to learn GoLang"
                        className={cs(classes.commentBox)}
                    />
                  </CardContent>
                </Paper>

              </ExpansionPanelDetails>
              <Divider/>
              <ExpansionPanelActions>
                <Button size="small"
                        onClick={flipExpansionPanel}>Cancel</Button>
                <Button size="small" color="primary">
                  Post
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Card>
          {postList.map(post => (
              <Card>
                <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                    title={post.postedBy}
                    subheader={post.postedOn}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary"
                              component="p">
                    {post.content}
                  </Typography>
                </CardContent>

                <ExpansionPanel TransitionProps={{unmountOnExit: true}}>
                  <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon
                          onClick={event => loadComments(post.id)}/>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                  >
                    <Typography variant="body2" color="textSecondary"
                                component="p">
                      Comments
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Paper className={cs(classes.commentWidth)}>
                      <CardContent>
                        <Typography paragraph>
                          Heat 1/2 cup of the broth in a pot until simmering,
                          add saffron and set aside for 10 minutes.
                          Heat 1/2 cup of the broth in a pot until simmering,
                          add saffron and set aside for 10 minutes.
                        </Typography>
                      </CardContent>
                    </Paper>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Card>
          ))}
        </Grid>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  posts: state.signInReducer.posts,
  followers: state.followerReducer.followers
});

export default connect(mapStateToProps, {loadFollowers})(PostGridList);
