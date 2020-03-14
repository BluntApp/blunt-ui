import {makeStyles} from "@material-ui/core";

const postGridListStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  contentAlignment:{
    maxHeight: 475,
    minHeight: 0,
    overflow: "scroll",
    overflowX: "hidden",
    overflowY: "auto"
  },
  commentWidth:{
    maxHeight: 300,
    maxWidth: 1175,
    minWidth:1175,
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
    overflowY: "auto",
    maxHeight: 282,
    minHeight: 282
  },
  followerSearchText:{
    marginLeft:15
  },
  newPostWidth:{
    maxHeight: 600,
    maxWidth: 900,
    marginLeft: 15,
    overflow: "scroll",
    overflowX: "hidden",
    overflowY: "auto"
  },
  postCardPanel:{
    minWidth: 1250,
    maxWidth: 1250
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
  contentBox:{
    minWidth: 870,
    maxWidth: 870,
    maxHeight: 475,
    minHeight: 250
  },
  postBox:{
    minWidth: 1110,
    maxWidth: 1110,
    maxHeight: 125,
    minHeight: 125
  },
  isCommentsPublicAlign:{
    fontSize:10,
  }
}));

export default postGridListStyles;
