import React, {useEffect, useState} from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import bluntAppBarStyles from "./bluntAppBarStyles";
import bluntAppBarMuiTheme from "./bluntAppBarMuiTheme";
import cs from "classnames";
import BluntMenuBar from "../MenuBar/BluntMenuBar";
import {connect} from "react-redux";
import {toggleMenuBar} from "../../Store/Action/menuBarActions";

const BluntAppBar = (props) => {
  const classes = bluntAppBarStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const [open, setOpen] = useState(props.isMenuBarOpen);

  useEffect(() => {
    setOpen(props.isMenuBarOpen)
  }, [props.isMenuBarOpen])

  const handleClickMenu = () => {
    props.toggleMenuBar(true);
  }


  const header = (
      <Typography className={classes.title} variant="h6" noWrap>
        Blunt
      </Typography>
  );

  const emptyHeader = (<Typography />);

  return (
      <MuiThemeProvider theme={bluntAppBarMuiTheme}>
        <div className={classes.grow}>
          <AppBar
              position="fixed"
              className={cs(classes.appBar, {
                [classes.appBarShift]: open,
              })}
          >
            <Toolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleClickMenu}
                  edge="start"
                  className={cs(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon/>
              </IconButton>
              {open ? emptyHeader: header}
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon/>
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{'aria-label': 'search'}}
                />
              </div>
            </Toolbar>
          </AppBar>
          <BluntMenuBar/>
        </div>
      </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  isMenuBarOpen: state.menuBarReducer.isMenuBarOpen,
});

export default connect(mapStateToProps, {toggleMenuBar})(BluntAppBar);

