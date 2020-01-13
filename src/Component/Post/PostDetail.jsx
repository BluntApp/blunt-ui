import {connect} from "react-redux";
import {MuiThemeProvider} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import React from "react";
import postDetailMuiTheme from "./postDetailMuiTheme";

const PostDetail = props => {
  return (
      <MuiThemeProvider theme={postDetailMuiTheme}>
        <Container component="main" maxWidth="xs">
          <Paper elevation={3}>
          </Paper>
        </Container>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {})(PostDetail);
