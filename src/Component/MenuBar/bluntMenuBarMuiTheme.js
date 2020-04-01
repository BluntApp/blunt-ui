import {createMuiTheme} from "@material-ui/core/styles";

const bluntMenuBarMuiTheme = createMuiTheme({
  overrides: {
    MuiPaper:{
      root:{
        backgroundColor: "#3c3838",
        color: "white"
      }
    },
    MuiIconButton:{
      root: {
        color: "white"
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 35,
        color: "#3894eb"
      }
    },
    MuiButtonBase:{
      root: {
        color: "white"
      }
    },
    MuiTypography:{
      body1:{
        fontSize: ".85rem"
      }
    }
  }
});

export default bluntMenuBarMuiTheme;
