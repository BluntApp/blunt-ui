import {createMuiTheme} from "@material-ui/core/styles";

const pendingFollowerGridListMuiTheme = createMuiTheme({
  overrides: {
    MuiPaper:{
      root: {
        maxWidth:220,
        minHeight:220,
        padding: 4
      }
    },
    MuiGrid:{
      container:{
        width: "75%"
      }
    }
  }
});

export default pendingFollowerGridListMuiTheme;
