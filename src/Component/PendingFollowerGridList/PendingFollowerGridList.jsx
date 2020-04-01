import {connect} from "react-redux";
import {MuiThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import pendingFollowerGridListMuiTheme from "./pendingFollowerGridListMuiTheme";
import pendingFollowerGridListStyles from "./pendingFollowerGridListStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import cs from "classnames";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {
  loadPendingFollowers,
  openPendingFollowerDialog
} from "../../Store/Action/followerActions";
import AcceptFollowerDialog from "./AcceptFollowerDialog";

const PendingFollowerGridList = props => {
  const classes = pendingFollowerGridListStyles();

  const [pendingFollowerList, setPendingFollowerList] = useState([])

  useEffect(() => {
    props.loadPendingFollowers()
  }, [])

  useEffect(() => {
    setPendingFollowerList(props.pendingFollowers);
  }, [props.pendingFollowers])

  const openFollowerDialog = (pendingFollower) => {
    props.openPendingFollowerDialog(pendingFollower);
  }

  return (
      <MuiThemeProvider theme={pendingFollowerGridListMuiTheme}>
        <Grid container direction="row" justify="center"
              className={cs(classes.contentShift)}>
          <Paper className={cs(classes.followerMainPaper)} elevation={3}>
            <Typography variant="h6" component="h2">
              Pending Followers
            </Typography>
            <Divider/>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}
                    className={cs(classes.followerGrid)}>
                {pendingFollowerList.map(pendingFollower => (
                    <Grid key={pendingFollower} item>
                      <Paper elevation={3}
                             className={cs(classes.followerPaper)}>
                        <Grid container direction="row" justify="center">
                          <Avatar aria-label="recipe" className={cs(classes.avatar,classes.alignAvatar)}>
                            R
                          </Avatar>
                        </Grid>
                        <Typography variant="h5" component="h3">
                          {pendingFollower.followerNickName}
                        </Typography>
                        <Typography component="p">
                          {pendingFollower.followerName}
                        </Typography>
                        {pendingFollower.status != "ACCEPTED" ?
                            <Button variant="outlined" color="primary"
                                    className={cs(classes.buttonAccept)}
                                    onClick={() => openFollowerDialog(pendingFollower)}> Accept
                            </Button> : ""}
                      </Paper>
                    </Grid>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <AcceptFollowerDialog/>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  pendingFollowers: state.followerReducer.pendingFollowers,
});

export default connect(mapStateToProps, {loadPendingFollowers, openPendingFollowerDialog})(
    PendingFollowerGridList);
