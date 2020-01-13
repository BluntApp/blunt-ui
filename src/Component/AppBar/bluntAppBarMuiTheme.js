import {createMuiTheme} from "@material-ui/core/styles";

const bluntAppBarMuiTheme = createMuiTheme({
  overrides: {
    MuiAppBar:{
      colorPrimary:{
        backgroundColor: "#191818"
      }
    }
  }
});

export default bluntAppBarMuiTheme;
