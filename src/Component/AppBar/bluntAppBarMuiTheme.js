import {createMuiTheme} from "@material-ui/core/styles";

const bluntAppBarMuiTheme = createMuiTheme({
  overrides: {
    MuiTypography:{
      colorTextSecondary:{
        color: "white"
      },
      body2:{
        marginLeft:750
      }
    },
    MuiAppBar:{
      colorPrimary:{
        backgroundColor: "#191818"
      }
    }
  }
});

export default bluntAppBarMuiTheme;
