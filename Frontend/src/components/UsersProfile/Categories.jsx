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

export default function Categories(props) {
  const handleOnPastOrders = () => {
    props.setCategory("po");
  };

  const handleOnPastListings = () => {
    props.setCategory("pl");
  };

  const handleOnActiveOrders = () => {
    props.setCategory("ao");
  };

  const handleOnActiveListings = () => {
    props.setCategory("al");
  };

  const handleOnReviews = () => {
    props.setCategory("r");
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
          </ListItem>
        </List>
        <Divider />
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
