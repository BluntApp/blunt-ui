import {makeStyles} from "@material-ui/core";

const profileStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  autoAlign: {
    maxHeight: 300,
    maxWidth: 235,
    minWidth: 230
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  profilePaper: {
    minWidth: 850,
    minHeight: 590,
    maxHeight: 590
  },
  followPaper: {
    minWidth: 350,
    minHeight: 590,
    maxHeight: 590
  },
  followeePaper:{
    maxWidth: 325,
    minWidth: 325,
    maxHeight: 75,
    minHeight: 50,
    marginBottom: 5,
    backgroundColor: "#3894eb"
  },
  followingsPaper:{
    minHeight: 420,
    minWidth: 350,
    maxWidth: 350,
    maxHeight: 420,
    marginLeft: 5,
    marginTop: 5,
    overflow: "scroll",
    overflowX: "hidden",
    overflowY: "auto"
  },
  buttonUpdate: {
    marginLeft: 165,
    marginTop: 140
  },
  inviteButtonAlign:{
    marginLeft: 145,
    marginTop: 15
  },
  avatar: {
    backgroundColor: 'red',
  }
}));

export default profileStyles;
