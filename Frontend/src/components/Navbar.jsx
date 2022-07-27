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
} from '@mui/material';
import logo from '../assets/logo1.png';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';

// added the following for the links

//import NavLink from "./NavLink";
import { Link } from 'react-router-dom';

export const Navbar = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;

  const navItems = ["Add Listing", "Register"];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        VanLyfe
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box display="flex">
      <AppBar position="static">
        <Toolbar>
          {/* Desktop logo */}
          <IconButton
            sx={{ display: { xs: 'none', md: 'block' } }}
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
            sx={{ mr: 2, display: { sm: 'none' } }}>
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
              to="/createlisting"
              color="inherit">
              Add Listing
            </Button>

            <Button
              sx={{ height: 65 }}
              component={Link}
              to="/register"
              color="inherit">
              Register
            </Button>
            <Avatar
              component={Link}
              to="/user/1"
              alt="Travis Howard"
              // src="/static/images/avatar/2.jpg"
              sx={{ width: 50, height: 50 }}
            />
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          }}>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// // const pages = ['Products', 'Pricing', 'Blog'];
// // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// const ResponsiveAppBar = () => {
// //   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
// //   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

// //   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
// //     setAnchorElNav(event.currentTarget);
// //   };
// //   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
// //     setAnchorElUser(event.currentTarget);
// //   };

// //   const handleCloseNavMenu = () => {
// //     setAnchorElNav(null);
// //   };

// //   const handleCloseUserMenu = () => {
// //     setAnchorElUser(null);
// //   };

// //   return (
// //     <AppBar position="static">
// //       <Container maxWidth="xl">
// //         <Toolbar disableGutters>
// //           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
// //           <Typography
// //             variant="h6"
// //             noWrap
// //             component="a"
// //             href="/"
// //             sx={{
// //               mr: 2,
// //               display: { xs: 'none', md: 'flex' },
// //               fontFamily: 'monospace',
// //               fontWeight: 700,
// //               letterSpacing: '.3rem',
// //               color: 'inherit',
// //               textDecoration: 'none',
// //             }}
// //           >
// //             LOGO
// //           </Typography>

// //           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
// //             <IconButton
// //               size="large"
// //               aria-label="account of current user"
// //               aria-controls="menu-appbar"
// //               aria-haspopup="true"
// //             //   onClick={handleOpenNavMenu}
// //               color="inherit"
// //             >
// //               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//             //   anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//             //   open={Boolean(anchorElNav)}
//             //   onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {/* {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))} */}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {/* {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))} */}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                  {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//             //   sx={{ mt: '45px' }}
//             //   id="menu-appbar"
//             //   anchorEl={anchorElUser}
//             //   anchorOrigin={{
//             //     vertical: 'top',
//             //     horizontal: 'right',
//             //   }}
//             //   keepMounted
//             //   transformOrigin={{
//             //     vertical: 'top',
//             //     horizontal: 'right',
//             //   }}
//             //   open={Boolean(anchorElUser)}
//             //   onClose={handleCloseUserMenu}
//             // >
//             //   {settings.map((setting) => (
//             //     <MenuItem key={setting} onClick={handleCloseUserMenu}>
//             //       <Typography textAlign="center">{setting}</Typography>
//             //     </MenuItem>
//             //   ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default ResponsiveAppBar;
