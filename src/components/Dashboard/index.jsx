import * as React from 'react';
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    Avatar,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/authReducer.jsx';
import EWallet from './EWallet/index.jsx';
import Network from './NetWork/index.jsx';
import Profile from '../Profile/index.jsx';
import GoLive from '../Profile/GoLive.jsx';
import Courses from './Courses/index.jsx';
import AllCourse from './AllCourse/index.jsx';

const drawerWidth = 100;
const navItems = [
    { label: 'Your Courses', to: "/dashboard/your-courses" },
    { label: 'All Courses', to: "/dashboard/all-courses" },
    { label: 'NetWork', to: "/dashboard/network" },
    { label: 'E-Wallet', to: "/dashboard/e-wallet" }
];

const settings = [
    { label: 'Profile', to: '/dashboard/profile' },
    { label: 'Logout' },
];

function Dashboard(props) {
    const { window } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [showSidebar, setShowSidebar] = React.useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    console.log('user', user);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
        setShowSidebar(!showSidebar);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        console.log('Logging out...');
        dispatch(logout());
        navigate('/login');
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const { firstname, lastname } = user;
    console.log('firstname and lastname', `${firstname} ${lastname}`);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            {showSidebar ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { sm: 'block' } }}
                        >
                            MUI
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <Button key={item.label} sx={{ color: '#fff' }} component={Link} to={item.to}>
                                    {item.label}
                                </Button>
                            ))}
                            <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                                <Avatar alt={firstname} src="/static/images/avatar.jpg" />
                            </IconButton>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting, index) => (
                                    <MenuItem key={index} onClick={setting.label === 'Logout' ? handleLogout : handleCloseUserMenu} component={Link} to={setting.to}>
                                        <Typography textAlign="center">{setting.label}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ my: 2 }}>
                                MUI
                            </Typography>
                            <Divider />
                            <List>
                                {navItems.map((item) => (
                                    <ListItem key={item.label} disablePadding>
                                        <ListItemButton component={Link} to={item.to}>
                                            <ListItemText primary={item.label} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                </nav>
                <Box component="main" sx={isMobile ? { p: 3 } : { paddingLeft: '150px', paddingTop: '20px', marginBottom: '10px' }}>
                    <Toolbar />
                    <Routes>
                        <Route path="/network" element={<Network />} />
                        <Route path="/e-wallet" element={<EWallet />} />
                        <Route path="/profile" element={<Profile user={user} />} />
                        <Route path="/go-live" element={<GoLive />} />
                        <Route path="/your-courses" element={<Courses user={user} />} />
                        <Route path="all-courses" element={<AllCourse user={user} />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;
