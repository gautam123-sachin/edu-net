import React from 'react';
import { Outlet } from 'react-router-dom';
import clsx from "clsx";
import { makeStyles } from '@mui/styles';
import { AppBar, Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Dashboard, Logout } from '@mui/icons-material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import { useNavigate } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    menuButton: {
        marginRight: theme.spacing(2)
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
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(5, 1),
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
        padding: theme.spacing(3),
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


function AdminLayout() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const navgate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem("admintoken")
        navgate("/admin-login")
    }

    const handleOpenPage = (item) => {
        navgate(item.to)
    }

    return (
        <>
            <div className={classes.root}>
                <header>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
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
                            <Typography className={classes.title} variant="h6">
                                Admin Panel
                            </Typography>
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                edge="start"
                                onClick={() => handleLogOut()}
                            >
                                <Logout />
                                Logout
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
                        <div className={classes.drawerHeader}>
                            <Avatar>A</Avatar>
                            <Typography variant="h6">Wellcome to Admin</Typography>
                        </div>
                        <Divider />
                        <List>
                            {[
                                {
                                    text: "Dashboard",
                                    icon: <Dashboard />,
                                    to: "/admin-dashboard"
                                },
                                {
                                    text: "Member List",
                                    icon: <RememberMeIcon />,
                                    to: "/member-list"
                                },
                                {
                                    text: "Payment Approval",
                                    icon: <CurrencyRupeeIcon />,
                                    to: "/payment-request-list"
                                }

                            ].map((item) => (
                                <ListItem
                                    button
                                    onClick={() => handleOpenPage(item)}
                                    key={item.text}
                                >
                                    <ListItemIcon> {item.icon} </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </header>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.contentHeader} />
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default AdminLayout;