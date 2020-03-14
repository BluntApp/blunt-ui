import {createMuiTheme} from "@material-ui/core/styles";

const commentsMuiTheme = createMuiTheme({
  overrides: {
    MuiTypography:{
      h5:{
        fontSize:12,
        fontWeight: 700,
        color:"4819cc"
      },
      body1:{
        fontSize:10,
        fontWeight: 700,
        color:"4819cc"
      },
      body2:{
        fontSize:12
      }

    },
    MuiCardContent:{
      root:{
        paddingBottom:5,
        paddingTop:5
      }
    }
  }
});

export default commentsMuiTheme;
