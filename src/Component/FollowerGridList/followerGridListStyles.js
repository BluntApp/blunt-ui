import {makeStyles} from "@material-ui/core";

const followerGridListStyles = makeStyles(theme => ({
  contentShift: {
    marginLeft: 218
  },
  followerMainPaper:{
    minHeight: 585,
    minWidth: 1250,
    maxHeight: 585,
    maxWidth: 1250,
    overflow: "scroll",
    overflowX: "hidden",
    overflowY:"auto"
  },
  followerPaper:{
    marginTop: 8,
    marginLeft: 10,
    minWidth: 175,
    maxWidth: 175,
    backgroundColor: "#3894eb"
  },
  followerGrid:{
    justifyContent: "left"
  },
  buttonAccept:{
    marginLeft: 114,
    marginTop: 70
  },
  alignAvatar:{
    marginBottom: 6,
    marginTop: 6
  },
  avatar: {
    backgroundColor: 'red',
  }
}));

export default followerGridListStyles;
