// AppBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';

const Header = ({ title, pages, handleOpenNavMenu, handleCloseNavMenu, handleOpenUserMenu, handleCloseUserMenu, anchorElNav, anchorElUser }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleOpenNavMenu}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component={Link} to="/" noWrap sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
     
        {/* Avatar for user settings */}
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User Avatar" src="/static/images/avatar.jpg" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
