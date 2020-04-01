import {makeStyles} from "@material-ui/core";

const bluntMenuBarStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  menuTextStyle: {
    fontSize: 0.9
  },
  drawerPaper: {
    width: 240,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  directionIcon: {
    marginLeft: 50
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    marginLeft: 67
  },
  selectedListColor: {
    color: "#0194d3!important"
  },

  defaultListColor: {
    color: "#ffffff"
  },

  selectedBackground: {
    backgroundColor: "black!important",
    borderLeft: "8px solid #0194d3!important",
    fontWeight: " 400!important"
  },

  defaultBackground: {
    backgroundColor: "#363545"
  }

}));

export default bluntMenuBarStyles;
