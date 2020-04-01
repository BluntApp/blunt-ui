import {createMuiTheme} from "@material-ui/core/styles";

const profileMuiTheme = createMuiTheme({
  overrides: {
    MuiChip:{
      root:{
        marginRight:4
      }
    },
    MuiButton:{
      fullWidth:{
        width:"97%",
        marginLeft: 6
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: 6
      },
      root:{
        marginBottom: 25,
        width: 380,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop :4,
        justifyContent: "center",
        marginRight: 10
      }
    },
    MuiTypography:{
      root:{
        margin:6
      },
      body1:{
        fontSize:"0.9rem"
      }
    },
    MuiGrid:{
      container:{
        padding: 8
      },
      "spacing-xs-1":{
        margin: 0
      }
    },
    MuiFormControl:{
      marginNormal:{
        marginTop: 10,
        marginBottom: 0
      }
    }
  }
});

export default profileMuiTheme;
