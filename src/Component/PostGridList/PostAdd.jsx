import {connect} from "react-redux";
import {MuiThemeProvider} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React, {useEffect, useState} from "react";
import postGridListMuiTheme from "./postGridListMuiTheme";
import postGridListStyles from "./postGridListStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const PostAdd = props => {
  const classes = postGridListStyles();

  const postIt = (value) => {
    console.log( value);
  };

  const [post, setPost] = useState()

  useEffect(() => {
    let ePost = {...post}
    setPost({...post, ...ePost});
  }, [props.newPost])

  return (
      <MuiThemeProvider theme={postGridListMuiTheme}>
        <Container component="main">
                <Card>
                  <CardHeader
                      jlsjdfk
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      saasdfasdf
                    </Typography>
                  </CardContent>
                </Card>
        </Container>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  newPost: state.postReducer.newPost
});


export default connect(mapStateToProps, {})(PostAdd);
