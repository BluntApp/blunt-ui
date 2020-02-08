import {createMuiTheme} from "@material-ui/core/styles";

const postGridListMuiTheme = createMuiTheme({
  overrides: {
    MuiContainer:{
      root:{
        width: "75%"
      }
    },
    MuiChip: {
      root:{
        width: 140
      }
    },
    MuiCard:{
      root:{
        borderRadius: 5,
        marginBottom: 5,
        overflow: null
      }
    },
    MuiCardContent:{
      root:{
        minWidth:900
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
      }
    }
  }
});

export default postGridListMuiTheme;
