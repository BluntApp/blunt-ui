import {createMuiTheme} from "@material-ui/core/styles";

const signUpMuiTheme = createMuiTheme({
  overrides: {
    MuiContainer:{
      maxWidthXs: {
        maxWidth: 600
      }
    },
    MuiFormHelperText:{
      root: {
        color: "red"
      }
    },
    MuiIconButton:{
      root:{
        color:"#f50a57"
      }
    },
    /*,
    MuiButton:{
      containedPrimary:{
        backgroundColor: "#f50a57"
      }
    },*/
    MuiPaper: {
      rounded: {
        borderRadius: 6
      },
      root:{
        marginBottom: 25,
        width: 425,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop :4,
        justifyContent: "center"
      }
    }
  }
});


export default signUpMuiTheme;
