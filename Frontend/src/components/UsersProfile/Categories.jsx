import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function Categories(props) {
  let { id } = useParams();

  const handleOnPastOrders = () => {
    props.setCategory("pastOrders");
  };
  const handleOnPastListings = () => {
    props.setCategory("pastListings");
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
    <Grid
      sx={{
        mt: 1,
        bgcolor: "#e1e9f0",
        width: "25%",
        mt: 1,
        mr: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: 400,
          width: "80%",
          mr: 1,
          ml: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List>
          <Typography>Host</Typography>

          <ListItem sx={{ display: "flex", flexDirection: "column" }}>
            <ListItemButton onClick={handleOnActiveListings}>
              <ListItemText> Active Listings</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={handleOnPastListings}>
              <ListItemText>Past Listings</ListItemText>
            </ListItemButton>
            {props.user?.id && Number(props.user.id) === Number(id) && (
              <ListItemButton onClick={handleOnFavourites}>
                <ListItemText>Favorites </ListItemText>
              </ListItemButton>
            )}
          </ListItem>
        </List>
        <Divider />
        {props.user?.id && Number(props.user.id) === Number(id) && (
          <List>
            <Typography>Renter</Typography>

            <ListItem sx={{ display: "flex", flexDirection: "column" }}>
              <ListItemButton onClick={handleOnActiveOrders}>
                <ListItemText> Active Orders</ListItemText>
              </ListItemButton>
              <ListItemButton onClick={handleOnPastOrders}>
                <ListItemText> Past Orders</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        )}
        <Divider />

        <List>
          <ListItem>
            <ListItemButton onClick={handleOnReviews}>
              <ListItemText sx={{ display: "flex", flexDirection: "column" }}>
                Reviews
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Grid>
  );
}
