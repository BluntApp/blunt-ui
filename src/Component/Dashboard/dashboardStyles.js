import {makeStyles} from "@material-ui/core";

const dashboardStyles = makeStyles(theme => ({
  contentShift: {
    marginLeft: 215
  },
  dashboardMainPapers:{
    minHeight: 625,
    minWidth: 1200,
    maxHeight: 625,
    maxWidth: 1200,
    overflow: "scroll",
    overflowX: "hidden",
    overflowY:"auto"
  },
  root: {
    flexGrow: 1,
  },
  infoPaper:{
    marginTop: 80,
    minHeight: 100,
    marginLeft: 95,
    maxWidth: 250,
    backgroundColor: "#3894eb"
  },
  graphPaper:{
    marginTop: 65,
    marginLeft: 95,
    maxWidth: 459
  },
  textValue:{
    textAlign: "center",
    color:"darkBlue"
  },
  textName:{
    textAlign: "center",
    color:"darkRed"
  }
}));

export default dashboardStyles;
