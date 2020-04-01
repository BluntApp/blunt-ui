import {makeStyles} from "@material-ui/core";

const commentsStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  commentTextAlignment:{
    minHeight: 75,
    maxHeight: 350,
    minWidth: 1050,
    maxWidth: 1050,
    marginTop: 6,
    overflow: "scroll",
    overflowX: "auto",
    overflowY: "auto"
  },
  replyToolTip:{
    maxWidth: 1000
  },
  commentBox:{
    minHeight: 75,
    maxHeight: 350,
    overflow: "scroll",
    overflowX: "auto",
    overflowY: "auto",
    minWidth: 1190,
    maxWidth: 1190
  },
  commentHeader:{
    fontSize: "1rem"
  }
}));

export default commentsStyles;
