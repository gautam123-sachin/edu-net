// DrawerMenu.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const DrawerMenu = ({ open, handleCloseNavMenu, pages }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleCloseNavMenu}
    >
      <List>
        {pages.map(page => (
          <ListItem button key={page} component={Link} to={`/${page}`} onClick={handleCloseNavMenu}>
            <ListItemText primary={page} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default DrawerMenu;
