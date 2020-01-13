import {createMuiTheme} from "@material-ui/core/styles";

const bluntLayoutMuiTheme = createMuiTheme({
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

export default bluntLayoutMuiTheme;
