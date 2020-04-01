import {connect} from "react-redux";
import {MuiThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import followerGridListMuiTheme from "./followerGridListMuiTheme";
import followerGridListStyles from "./followerGridListStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import cs from "classnames";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import {loadFollowers} from "../../Store/Action/followerActions";

const FollowerGridList = props => {
  const classes = followerGridListStyles();

  const [followerList, setFollowerList] = useState([])

  useEffect(()=>{
    props.loadFollowers()
  },[])

  useEffect(() => {
    setFollowerList(props.followers)
  }, [props.followers])

  return (
      <MuiThemeProvider theme={followerGridListMuiTheme}>
        <Grid container direction="row" justify="center"
              className={cs(classes.contentShift)}>
          <Paper className={cs(classes.followerMainPaper)} elevation={3}>
            <Typography variant="h6" component="h2">
              Followers
            </Typography>
          <Divider/>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1} className={cs(classes.followerGrid)}>
                {followerList.map(follower => (
                    <Grid key={follower} item>
                      <Paper elevation={3} className={cs(classes.followerPaper)}>
                        <Grid container direction="row" justify="center">
                          <Avatar aria-label="recipe" className={cs(classes.avatar,classes.alignAvatar)}>
                            R
                          </Avatar>
                        </Grid>
                        <Divider/>
                        <Typography variant="h5" component="h3">
                          {follower.followerNickName}
                        </Typography>
                        <Typography component="p">
                          {follower.followerName}
                        </Typography>
                      </Paper>
                    </Grid>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  followers: state.followerReducer.followers,
});

export default connect(mapStateToProps, {loadFollowers})(FollowerGridList);
