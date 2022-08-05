import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import logo from "../assets/LogoDarkBg.svg";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import { Navigate, useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

// added the following for the links

//import NavLink from "./NavLink";
import { Link } from "react-router-dom";

export const Navbar = (props) => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;

  const navItems = ["Add Listing", "Register"];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await apiClient.logoutUser();
    props.setUser(null);
    // setError(null);
    navigate("/");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        VanLyfe
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item}>
            <ListItemButton sx={{ textAlign: "center" }}>
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
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
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
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Keep this so menu layout doesnt break */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          {/* Desktop Menu */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {/* <Button sx={{ height: 65 }} color="inherit">
            Feature1
          </Button> */}

            <Button
              sx={{ height: 65 }}
              component={Link}
              to="/listings"
              color="inherit"
            >
              View Listings
            </Button>

            <Button
              sx={{ height: 65 }}
              component={Link}
              to={props.user ? "/createListing" : "/login"}
              color="inherit"
            >
              Add Listing
            </Button>

            {props.user ? (
              <Button
                sx={{ height: 65 }}
                component={Link}
                to={"/login"}
                onClick={handleLogout}
                color="inherit"
              >
                Log out
              </Button>
            ) : null}

            {props.user ? null : (
              <Button
                sx={{ height: 65 }}
                component={Link}
                to={"/register"}
                color="inherit"
              >
                Register
              </Button>
            )}
            <Avatar
              component={Link}
              to={props.user ? "/user/" + props.user.id : "/login"}
              alt="Travis Howard"
              src={props.user ? props.user.image_url : null}
              // src="/static/images/avatar/2.jpg"
              sx={{ width: 50, height: 50 }}
              className="navatar"
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
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
