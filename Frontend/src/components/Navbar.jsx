import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Menu,
  MenuItem,
} from '@mui/material';
import logo from '../assets/LogoDarkBg.svg';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import { Navigate, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';

import { Link } from 'react-router-dom';

export const Navbar = (props) => {
  const { window } = props;
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickAvatar = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    await apiClient.logoutUser();
    props.setUser(null);
    // setError(null);
    navigate('/');
  };

  const loggedInMobileItems = [
    { title: 'View Listings', path: '/listings', props: null },
    { title: 'Create Listing', path: '/createlisting', props: null },
    {
      title: 'User Profile',
      path: `/user/${props.user ? props.user.id : null}`,
      props: null,
    },
    { title: 'Logout', path: '/login', props: { onClick: handleLogout } },
  ];

  const loggedOutMobileItems = [
    { title: 'Login', path: '/login', props: null },
    { title: 'Register', path: '/register', props: null },
    { title: 'View Listings', path: '/listings', props: null },
    { title: 'Create Listing', path: '/createlisting', props: null },
  ];

  const drawer = () => {
   
    const items = props.user ? loggedInMobileItems : loggedOutMobileItems;
    // const items = loggedOutMobileItems;
    return (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          VanLyfe
        </Typography>
        <Divider />
        <List>
          {items.map((item, index) => (
            <ListItem key={item.title}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{ textAlign: 'center' }}
                {...item.props}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box display="flex" sx={{zIndex: 2}}>
      <AppBar position="static" sx={{zIndex: 2}}>
        <Toolbar>
          {/* Desktop logo */}
          <IconButton
            sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo">
            <Link to="/">
              <img src={logo} width="86" height="65" />
            </Link>
          </IconButton>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>

          {/* Keep this so menu layout doesnt break */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}></Typography>

          {/* Desktop Menu */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <Button sx={{ height: 65 }} color="inherit">
            Feature1
          </Button> */}

            <Button
              sx={{ height: 65 }}
              component={Link}
              to="/listings"
              color="inherit">
              View Listings
            </Button>

            <Button
              sx={{ height: 65 }}
              component={Link}
              to={props.user ? '/createListing' : '/login'}
              color="inherit">
              Add Listing
            </Button>

            {/* {props.user ? (
              <Button
                sx={{ height: 65 }}
                component={Link}
                to={'/login'}
                onClick={handleLogout}
                color="inherit">
                Log out
              </Button>
            ) : null} */}

            {props.user ? null : (
              <Button
                sx={{ height: 65 }}
                component={Link}
                to={'/register'}
                color="inherit">
                Register
              </Button>
            )}
            {props.user ? null : (
              <Button
                sx={{ height: 65 }}
                component={Link}
                to={'/login'}
                color="inherit">
                Log in
              </Button>
            )}

            {props.user && (
              <>
                <Button
                  aria-controls={open ? 'user-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickAvatar}>
                  <Avatar
                    // to={props.user ? "/user/" + props.user.id : "/login"}
                    alt="Travis Howard"
                    src={props.user ? props.user.image_url : null}
                    // src="/static/images/avatar/2.jpg"
                    sx={{ width: 50, height: 50, boxShadow: 'none' }}
                    id="navatar"
                  />
                </Button>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseUserMenu}
                  MenuListProps={{
                    'aria-labelledby': 'navatar',
                  }}>
                  <MenuItem
                    component={Link}
                    to={`/user/${props.user.id}`}
                    onClick={handleCloseUserMenu}>
                    Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/login" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          }}>
          {drawer()}
        </Drawer>
      </Box>
    </Box>
  );
};
