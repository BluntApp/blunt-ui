import {connect} from "react-redux";
import {MuiThemeProvider} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import postGridListMuiTheme from "./postGridListMuiTheme";
import postGridListStyles from "./postGridListStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Collapse from "@material-ui/core/Collapse";
import cs from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const PostGridList = props => {
  const classes = postGridListStyles();

  const loadComments = (value) => {
    console.log( value);
  };

  const [postList, setPostList] = useState([])

  useEffect(() => {
    let ePostList = [...postList]
    props.posts.forEach( post => {
      ePostList.push(post)
    })
    setPostList([...postList, ...ePostList]);
  }, [props.posts])

  return (
      <MuiThemeProvider theme={postGridListMuiTheme}>
        <Container component="main">
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
                    <Typography variant="body2" color="textSecondary" component="p">
                      {post.content}
                    </Typography>
                  </CardContent>

                  <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon onClick={event => loadComments(post.id)} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                      <Typography variant="body2" color="textSecondary" component="p">
                        Comments
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Paper className={cs(classes.commentWidth)}>
                        <CardContent>
                          <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
                          </Typography>
                        </CardContent>
                      </Paper>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Card>
            ))}
        </Container>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  posts: state.signInReducer.posts
});


export default connect(mapStateToProps, {})(PostGridList);
