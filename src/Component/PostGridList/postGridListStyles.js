import {makeStyles} from "@material-ui/core";

const postGridListStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  commentWidth:{
    maxHeight: 300,
    maxWidth: 1000,
    minHeight: 150,
    marginLeft: 15,
    overflow: "scroll",
    overflowX: "hidden"
  },
  newPostPanel:{
    paddingBottom:0
  },
  followerSearchWidth:{
    maxWidth: 350,
    minWidth: 250,
    marginLeft: 15
  },
  followerFilteredList:{
    overflow: "scroll",
    overflowX: "hidden",
    maxHeight: 300,
    minHeight: 150
  },
  followerSearchText:{
    marginLeft:15
  },
  newPostWidth:{
    maxHeight: 600,
    maxWidth: 900,
    marginLeft: 15,
    overflow: "scroll",
    overflowX: "hidden"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'red',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  commentBox:{
    minWidth: 825,
    maxWidth: 825,
    maxHeight: 500,
    minHeight: 250

  }
}));

export default postGridListStyles;
