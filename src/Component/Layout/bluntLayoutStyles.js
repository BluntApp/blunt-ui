import {makeStyles} from "@material-ui/core";

const bluntLayoutStyles = makeStyles(theme => ({

  content: {
    flexGrow: 1,
    marginTop:65,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: -240,
    marginTop:65,
  }
}));
export default bluntLayoutStyles;
