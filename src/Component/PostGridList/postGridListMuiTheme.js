import {createMuiTheme} from "@material-ui/core/styles";

const postGridListMuiTheme = createMuiTheme({
  overrides: {
    MuiContainer:{
      root:{
        width: "50%"
      }
    },
    MuiCard:{
      root:{
        borderRadius: 5,
        marginBottom: 5
      }
    },
    MuiGridList :{
      root: {
        margin:0
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: 0
      },
      root:{
        marginBottom:5
      }
    }
  }
});

export default postGridListMuiTheme;
