import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  AppBar,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Avatar,
  Rating,
  Button,
} from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import apiClient from "../../services/apiClient";

export default function Reviews() {
  const [value, setValue] = React.useState();
  const [Error, setError] = React.useState();
  const [rating, setRating] = React.useState(0);

  useEffect(() => {
    const getReviews = async () => {
      const response = await apiClient.getReviews(1);
      console.log("rating: ", response.data);

      if (response?.data) {
        setValue(response.data);
      } else {
        setError("No reviews yet");
      }
    };

    getReviews();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "#eeeeee",
      }}
    >
      <CssBaseline />
      <AppBar
        position="relative"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#e1e9f0",
          color: "black",
          p: 3,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            noWrap
            component="div"
            sx={{
              flexWrap: "wrap",
              width: "50% ",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
              direction="column"
              spacing={1}
            >
              <Grid>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 200, height: 200 }}
                />
              </Grid>
              <Grid>
                <Box>
                  <Typography sx={{ fontSize: 25, mt: 10, ml: 3 }}>
                    John Doe
                  </Typography>
                  <Rating
                    name="user-rating"
                    sx={{ mt: 1, ml: 3 }}
                    value={value}
                    readOnly
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexWrap: "wrap", width: "50% " }}>
            <Button
              variant="contained"
              href="/user/:id/profile"
              sx={{ alignContent: "baseline", mb: 4, ml: 55 }}
            >
              EDIT PROFILE
            </Button>

            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              itaque in officiis? Neque, ducimus error! Atque molestias aliquid
              facere animi modi praesentium, illo enim reprehenderit omnis
              corrupti beatae sint voluptate?
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid
        sx={{
          mt: 1,
          bgcolor: "##8cbfed",
          height: "70%",
          width: "100%",
          mt: 1,
          mr: 67,
          display: "flex",
          flexDirection: "row",
        }}
      >
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

              <ListItem
                disablePadding
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <ListItemButton href="/user/:id/activeListing">
                  <ListItemText> Active Listings</ListItemText>
                </ListItemButton>
                <ListItemButton href="/user/:id/pastListing">
                  <ListItemText> Past Listings</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />

            <List>
              <Typography>Renter</Typography>

              <ListItem
                disablePadding
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <ListItemButton href="/user/:id/activeOrders">
                  <ListItemText> Active Orders</ListItemText>
                </ListItemButton>
                <ListItemButton href="/user/:id/pastOrders">
                  <ListItemText> Past Orders</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />

            <List>
              <ListItem>
                <ListItemButton href="/user/:id/reviews">
                  <ListItemText
                    disablePadding
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    Reviews
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid
          sx={{
            mt: 1,
            height: "70%",
            width: "100%",
            mt: 1,
          }}
        >
          <Box>
            <Button
              variant="text"
              href="/user/:id/reviews"
              sx={{ mt: 2, mb: 2, ml: 2 }}
            >
              Reviews
            </Button>
            <Button
              variant="contained"
              href="/listings"
              sx={{ mt: 2, mb: 2, ml: 2 }}
            >
              Browse Listing
            </Button>
          </Box>
          <Box
            sx={{
              height: 200,
              width: 800,
              mt: 3,
              ml: 3,
              bgcolor: "white",
            }}
          >
            <Rating
              name="user-rating"
              sx={{ mt: 2, ml: 2 }}
              value={value}
              readOnly
            />
            <Grid sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                // sx={{ width: 200, height: 200 }}
              />
              <Typography sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}>
                Edil Abe{" "}
              </Typography>
            </Grid>
            <Typography sx={{ mt: 2, ml: 2 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              itaque in officiis? Neque, ducimus error! Atque molestias aliquid
              facere animi modi praesentium, illo enim reprehenderit omnis
              corrupti beatae sint voluptate?
            </Typography>
            <Divider />
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
              <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
                Helpful
              </Typography>
            </Grid>
          </Box>
          <Box
            sx={{
              height: 200,
              width: 800,
              mt: 3,
              ml: 3,
              bgcolor: "white",
            }}
          >
            <Rating
              name="user-rating"
              sx={{ mt: 2, ml: 2 }}
              value={value}
              readOnly
            />
            <Grid sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                // sx={{ width: 200, height: 200 }}
              />
              <Typography sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}>
                Joram Bosir{" "}
              </Typography>
            </Grid>
            <Typography sx={{ mt: 2, ml: 2 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              itaque in officiis? Neque, ducimus error! Atque molestias aliquid
              facere animi modi praesentium, illo enim reprehenderit omnis
              corrupti beatae sint voluptate?
            </Typography>
            <Divider />
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
              <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
                Helpful
              </Typography>
            </Grid>
          </Box>
          <Box
            sx={{
              height: 200,
              width: 800,
              mt: 3,
              ml: 3,
              bgcolor: "white",
            }}
          >
            <Rating
              name="user-rating"
              sx={{ mt: 2, ml: 2 }}
              value={value}
              readOnly
            />
            <Grid sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                // sx={{ width: 200, height: 200 }}
              />
              <Typography sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}>
                Vernon Owenga
              </Typography>
            </Grid>
            <Typography sx={{ mt: 2, ml: 2 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              itaque in officiis? Neque, ducimus error! Atque molestias aliquid
              facere animi modi praesentium, illo enim reprehenderit omnis
              corrupti beatae sint voluptate?
            </Typography>
            <Divider />
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
              <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
                Helpful
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
