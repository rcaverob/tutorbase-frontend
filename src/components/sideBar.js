import { connect } from 'react-redux';
import { NavLink, withRouter, useLocation } from 'react-router-dom';
// we need to import signout from the actions;
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  CssBaseline,
  List,
  Divider,
  ListItem,
  ListItemText,
  Hidden,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { signoutUser } from '../actions';
import whiteLogo from '../img/whiteLogo.png';

const drawerWidth = 240;

// const useStyles2 = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     justifyContent: 'center',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   small: {
//     width: theme.spacing(3),
//     height: theme.spacing(3),
//   },
//   large: {
//     width: theme.spacing(14),
//     height: theme.spacing(14),
//     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
//   },
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#19AA6E',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: '#19AA6E',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#19AA6E',
    overflow: 'hidden',
  },
  logo: {
    width: '85%',
    height: 'auto',
    margin: '20px',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  link: {
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  activeLink: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  top: {
    marginTop: '20px',
  },
}));

const SideBar = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  // const classes2 = useStyles2();
  const { children } = props;
  const location = useLocation();

  const Item = ({ name, text }) => (
    <NavLink to={`/${name}`} className={classes.link}>
      <ListItem
        button
        key={name}
        className={location.pathname === `/${name}` ? classes.activeLink : ''}
      >
        <ListItemText primary={text} />
      </ListItem>
    </NavLink>
  );

  const authItems = () => {
    if (props.auth) {
      return (
        <div>
          <Item name="posts" text="My Posts" />
          <Item name="matches" text="Matches" />

          <NavLink to="/" className={classes.link} onClick={props.signoutUser}>
            <ListItem button key="signout">
              <ListItemText
                primary="Sign Out"
                primaryTypographyProps={{
                  style: { fontWeight: 'bolder' },
                }}
                // style={{ fontWeight: 'bolder' }}
              />
            </ListItem>
          </NavLink>
        </div>
      );
    } else {
      return (
        <ListItem button key="signin">
          <NavLink to="/signin" className={classes.link}>
            Sign In
          </NavLink>
        </ListItem>
      );
    }
  };

  const drawerContent = (
    <div>
      <a href="/">
        <img className={classes.logo} src={whiteLogo} alt="" />
      </a>

      <Divider className={classes.top} />
      <List>
        <Item name="tutors" text="Find Tutors" />
        <Item name="tutees" text="Find Tutees" />
        {authItems()}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Hidden smUp implementation="css">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Tutor Base
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          // container={container}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

// mapStatetoProps will be necessary to get the authenticated boolean
// we will need the signout action imported as well, so be able to signout the user
function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth.authenticated,
  };
}

export default withRouter(connect(mapStateToProps, { signoutUser })(SideBar));
