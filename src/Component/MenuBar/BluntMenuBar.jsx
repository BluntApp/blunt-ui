import React, {useEffect, useState} from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import bluntMenuBarStyles from "./bluntMenuBarStyles";
import bluntMenuBarMuiTheme from "./bluntMenuBarMuiTheme";
import cs from "classnames";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {connect} from "react-redux";
import {toggleMenuBar} from "../../Store/Action/menuBarActions";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {signOutBlunt} from "../../Store/Action/signOutActions";
import {PostAdd} from "@material-ui/icons";
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import PostAddSharpIcon from '@material-ui/icons/PostAddSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import FingerprintSharpIcon from '@material-ui/icons/FingerprintSharp';
import LockSharpIcon from '@material-ui/icons/LockSharp';
import PlusOneSharpIcon from '@material-ui/icons/PlusOneSharp';
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
import NotificationsNoneSharpIcon from '@material-ui/icons/NotificationsNoneSharp';
const BluntMenuBar = props => {
  const classes = bluntMenuBarStyles();
  const [open, setOpen] = useState(props.isMenuBarOpen);

  useEffect(() => {
    setOpen(props.isMenuBarOpen)
  }, [props.isMenuBarOpen])

  const handleClickMenu = () => {
    props.toggleMenuBar(false);
  }

  const handleClick = (path) =>{
    path=="/blunt/home" && props.signOutBlunt()
  }

  const iconDecision = (icon)=>{
    switch (icon) {
      case 'PostIcon':
        return (<PostAddSharpIcon/>)
      case 'FollowIcon':
        return (<PeopleAltSharpIcon/>)
      case 'PendingFollowIcon':
        return (<PersonAddSharpIcon/>)
      case 'ProfileIcon':
        return (<PersonSharpIcon/>)
      case 'SignOutIcon':
        return (<LockSharpIcon/>)
      case 'SignInIcon':
        return (<FingerprintSharpIcon/>)
      case 'SignUpIcon':
        return (<PlusOneSharpIcon/>)
      case 'DashboardIcon':
        return (<DashboardSharpIcon/>)
      case 'NotifyIcon':
        return (<NotificationsNoneSharpIcon/>)
      case 'SettingIcon':
        return (<SettingsSharpIcon/>)
    }
    return (<InboxIcon/>);
  }

  return (
      <MuiThemeProvider theme={bluntMenuBarMuiTheme}>
        <Drawer
            className={cs(classes.drawer)}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
        >
          <div className={cs(classes.drawerHeader)}>
            <Typography className={classes.title} variant="h6" noWrap>
              Blunt
            </Typography>
            <IconButton onClick={handleClickMenu} className={cs(classes.directionIcon)}>
              {bluntMenuBarMuiTheme.direction === 'ltr' ? <ChevronLeftIcon/> :
                  <ChevronRightIcon/>}
            </IconButton>
          </div>
          <Divider/>
          <List>
            {props.menuBarList.map((menu) => (
                <Link to={menu.path} onClick={() => handleClick(menu.path)}>
                  <ListItem button key={menu} >
                    <ListItemIcon>{iconDecision(menu.icon)}</ListItemIcon>
                    <ListItemText primary={menu.name}/>
                  </ListItem>
                </Link>
            ))}
          </List>
        </Drawer>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  isMenuBarOpen: state.menuBarReducer.isMenuBarOpen,
  menuBarList: state.menuBarReducer.menuBarList,
});

export default connect(mapStateToProps, {toggleMenuBar, signOutBlunt})(BluntMenuBar);

