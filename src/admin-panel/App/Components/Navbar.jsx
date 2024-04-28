import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import React from "react";
import clsx from "clsx";
import MenuIcon from "@mui/icons-material/Menu";
import MessageIcon from "@mui/icons-material/Message";
import Box from '@mui/material/Box';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DashboardIcon from "@mui/icons-material/Dashboard";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight:  theme.spacing(2)
  },
  title: {
    flex: 1
  },
  buttonNavbar: {
    padding: 10
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding:  theme.spacing(5, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding:  theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const nav = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      to: "/admin-dashboard"
    },
    {
      text: "Members",
      icon: <RememberMeIcon />,
      to: "/all-members-list"
    },
    {
      text: "Payment",
      icon: <CurrencyRupeeIcon />,
      to: "/payment-request-list"
    }
  ]

  return (
    <>
      <div
        className={classes.root}
      >
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              edge="start"
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6">
              Admin
            </Typography>
            <IconButton color="inherit">
              <Typography
                className={classes.buttonNavbar}
                variant="h6"
                color="inherit"
              >
                Setting
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div
            className={classes.drawerHeader}
          >
            <Avatar>A</Avatar>
            <Typography variant="subtitle1">Wellcome to Admin</Typography>
          </div>
          <Divider />
          <List>
            {nav && nav.map((item) => (
              <ListItem
                key={item.text}
              >
                <ListItemIcon> {item.icon} </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div
            className={classes.contentHeader}
          />
          {props.children}
        </main>
      </div>
    </>
  );
}

export { Navbar };
