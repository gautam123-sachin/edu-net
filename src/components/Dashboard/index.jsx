import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/authReducer.jsx';
import EWallet from './EWallet/index.jsx';
import Network from './NetWork/index.jsx';
import Profile from '../Profile/index.jsx';
import GoLive from '../Profile/GoLive.jsx';
import Courses from './Courses/index.jsx';
import CourseDetails from './CourseDetails.jsx';
import CreateCourseForm from '../common/CreateCourseForm.jsx';
import Upload from '../Upload/index.jsx';

const drawerWidth = 100;
const navItems = [
    { label: 'Videos', to: "/dashboard/video"},
    { label: 'NetWork', to: "/dashboard/network" },
    { label: 'E-Wallet', to: "/dashboard/e-wallet" },
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
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user && user.userId) { // Check if user and user.user?._id exist
                    const response = await axios.get(`http://localhost:8000/v1/user/${user.userId}`);
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error (e.g., show error message)
            }
        };

        fetchUserData();
    }, [user]); // Add 'user' to the dependency array


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
        dispatch(logout());
        navigate('/login');
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const staticImage = "https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/1.png";
    const { user: userDataUser } = userData || {};
    const { firstname, lastname, profilePic } = userDataUser || {};

    const getFullName = () => {
        if (firstname && lastname) {
            return `${firstname} ${lastname}`;
        }
        return 'N/A';
    }
    const name = getFullName();

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav" sx={{ backgroundColor: '#293244' }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { sm: 'block' } }}
                        >
                            oneplacetogether
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                item.label === "Upload" ? (
                                    <Button key={item.label} component={Link} to={item.to} variant="contained">Upload Video</Button>
                                ) : (
                                    <Button key={item.label} sx={{ color: '#fff' }} component={Link} to={item.to}>
                                        {item.label}
                                    </Button>
                                )
                            ))}

                            <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                                <Avatar alt={name} src={profilePic ? profilePic : staticImage} />
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
                                oneplacetogether
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
                        <Route path="/profile" element={<Profile user={user} userData={userData} />} /> 
                        <Route path="/go-live" element={<GoLive />} />
                        <Route path="/courses-details/:courseId" element={<CourseDetails user={user} />} />
                        <Route path="/create-course" element={<CreateCourseForm user={user} />} />
                        <Route path="/edit-course/:courseId" element={<CreateCourseForm />} />
                        <Route path="/upload" element={<Upload />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;
