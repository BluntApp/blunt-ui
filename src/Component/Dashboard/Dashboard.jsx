import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import dashboardStyles from "./dashboardStyles";
import dashboardMuiTheme from "./dashboardMuiTheme";
import Grid from "@material-ui/core/Grid";
import cs from "classnames";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {MuiThemeProvider} from "@material-ui/core";
import {loadDashboard} from "../../Store/Action/dashboardActions";
import Chart from "react-google-charts";
import {isNotBlank} from "../../Store/Utility";
import LoadingOverlay from 'react-loading-overlay';

const Dashboard = props => {
  const classes = dashboardStyles();
  const [publishData, setPublishData] = useState([])
  const [followersData, setFollwersData] = useState([])
  useEffect(() => {
    props.loadDashboard();
  }, [])

  useEffect(() => {
    if (isNotBlank(props.metrics) && isNotBlank(props.metrics.monthlyPost)) {
      const publishPostMap = [...props.metrics.monthlyPost];
      publishPostMap.unshift(['Month', 'Posts']);
      setPublishData([...publishPostMap]);
    }
    if (isNotBlank(props.metrics) && isNotBlank(
        props.metrics.monthlyFollowers)) {
      const followerMap = [...props.metrics.monthlyFollowers];
      followerMap.unshift(['Month', 'Followers']);
      setFollwersData([...followerMap]);
    }

  }, [props.metrics])

  return (
      <MuiThemeProvider theme={dashboardMuiTheme}>

        <Grid container direction="row" justify="center"
              className={cs(classes.contentShift)}>
          <LoadingOverlay
              active={props.spin}
              spinner
              text='Loading Dashboard...'
          >
            <Paper className={cs(classes.dashboardMainPapers)} elevation={3}>
              <Typography variant="h6" component="h2">
                Dashboard
              </Typography>
              <Divider/>
              <Grid container spacing={3}>

                <Grid item xs>
                  <Paper className={classes.infoPaper}>
                    <Typography variant="h2" component="h2"
                                className={classes.textValue}>
                      {props.metrics.totalPost}
                    </Typography>
                    <Typography variant="h6" component="h2"
                                className={classes.textName}>
                      Posts
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <Paper className={classes.infoPaper}>
                    <Typography variant="h2" component="h2"
                                className={classes.textValue}>
                      {props.metrics.totalFollowers}
                    </Typography>
                    <Typography variant="h6" component="h2"
                                className={classes.textName}>
                      Followers
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <Paper className={classes.infoPaper}>
                    <Typography variant="h2" component="h2"
                                className={classes.textValue}>
                      {props.metrics.totalFollowings}
                    </Typography>
                    <Typography variant="h6" component="h2"
                                className={classes.textName}>
                      Followings
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper className={classes.graphPaper}>
                    <Chart
                        width={'450px'}
                        height={'300px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={publishData}
                        options={{
                          chart: {
                            title: 'Blunt Posts',
                            subtitle: 'Number of Posts',
                          },
                          colors: ['#3894eb']
                        }}
                        rootProps={{'data-testid': '2'}}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.graphPaper}>
                    <Chart
                        width={'450px'}
                        height={'300px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={followersData}
                        options={{
                          colors: ['#3894eb'],
                          chart: {
                            title: 'Blunt Followers',
                            subtitle: 'Number of Followers',
                          },
                        }}
                        // For tests
                        rootProps={{'data-testid': '2'}}
                    /></Paper>
                </Grid>
              </Grid>
            </Paper>
          </LoadingOverlay>
        </Grid>

      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  metrics: state.dashboardReducer.metrics,
  spin: state.dashboardReducer.spin,
});

export default connect(mapStateToProps, {loadDashboard})(
    Dashboard);
