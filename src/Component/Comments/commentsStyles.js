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
    minWidth: 1100,
    maxWidth: 1100,
    overflow: "scroll",
    overflowX: "auto",
    overflowY: "auto"
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
