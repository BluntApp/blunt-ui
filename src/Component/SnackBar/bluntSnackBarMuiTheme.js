import {createMuiTheme} from "@material-ui/core/styles";

const bluntSnackBarMuiTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: 0
      },
      root: {
        backgroundColor: "transparent"
      }
    }
  }
});

export default bluntSnackBarMuiTheme;
