import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  ListSubheader,
  Button,
  MenuItem,
  MenuList,
  Fade,
} from "@mui/material";
import { useParams } from "react-router-dom";

const drawerWidth = 250;

export default function Categories(props) {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(!open);
  };

  let { id } = useParams();

  const handleOnPastOrders = () => {
    props.setCategory("pastOrders");
  };

  const handleOnActiveOrders = () => {
    props.setCategory("activeOrders");
  };

  const handleOnActiveListings = () => {
    props.setCategory("activeListings");
  };

  const handleOnFavourites = () => {
    props.setCategory("favorites");
  };

  const handleOnReviews = () => {
    props.setCategory("reviews");
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          justifyContent: "center",
          py: 3,
        }}
      >
        <Button
          id="categories"
          onClick={handleClick}
          variant="contained"
          color="secondary"
        >
          Categories
        </Button>
        <Fade in={open} unmountOnExit>
          <MenuList
            sx={{ width: "90%" }}
            id="categories-menu"
            open={open}
            MenuListProps={{
              "aria-labelledby": "categories",
            }}
          >
            <MenuItem onClick={handleOnActiveListings}>
              Active Listings
            </MenuItem>

            <Divider />
            <MenuItem onClick={handleOnActiveOrders}>Active Orders</MenuItem>
            <MenuItem onClick={handleOnPastOrders}>Past Orders</MenuItem>
            <Divider />
            <MenuItem onClick={handleOnReviews}>Reviews</MenuItem>
          </MenuList>
        </Fade>
      </Box>

      <Box sx={{ zIndex: 1 }}>
        <Drawer
          sx={{
            width: drawerWidth,
            zIndex: 1,
            display: { xs: "none", md: "block" },
          }}
          variant="permanent"
        >
          <Box sx={{ height: 300 }} />

          <List sx={{ width: drawerWidth }}>
            <ListItem>
              <ListSubheader component="div" id="nested-list-subheader">
                Host
              </ListSubheader>
            </ListItem>

            <ListItem
              sx={{
                background:
                  props.category == "activeListings" ? "#b6cade" : "#fff",
              }}
            >
              <ListItemButton onClick={handleOnActiveListings}>
                <ListItemText>Active Listings</ListItemText>
              </ListItemButton>
            </ListItem>

            {props.user?.id && Number(props.user.id) === Number(id) && (
              <ListItem
                sx={{
                  background:
                    props.category == "favorites" ? "#b6cade" : "#fff",
                }}
              >
                <ListItemButton onClick={handleOnFavourites}>
                  <ListItemText>Favorites</ListItemText>
                </ListItemButton>
              </ListItem>
            )}
          </List>
          <Divider />
          {props.user?.id && Number(props.user.id) === Number(id) && (
            <List sx={{ pt: 0 }}>
              <ListItem>
                <ListSubheader component="div" id="nested-list-subheader">
                  Renter
                </ListSubheader>
              </ListItem>

              <ListItem
                sx={{
                  background:
                    props.category == "activeOrders" ? "#b6cade" : "#fff",
                }}
              >
                <ListItemButton onClick={handleOnActiveOrders}>
                  <ListItemText>Active Orders</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{
                  background:
                    props.category == "pastOrders" ? "#b6cade" : "#fff",
                }}
              >
                <ListItemButton onClick={handleOnPastOrders}>
                  <ListItemText>Past Orders</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          )}
          <Divider />

          <List>
            <ListItem
              sx={{
                background: props.category == "reviews" ? "#b6cade" : "#fff",
              }}
            >
              <ListItemButton onClick={handleOnReviews}>
                <ListItemText>Reviews</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
}
