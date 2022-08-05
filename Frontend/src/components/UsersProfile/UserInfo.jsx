import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Toolbar,
  AppBar,
  Avatar,
  Rating,
  Button,
} from "@mui/material";
import apiClient from "../../services/apiClient";

export default function UserInfo(props) {
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [bio, setBio] = React.useState();
  const [rating, setRating] = React.useState(0);
  const [image, setImage] = React.useState();
  const [Error, setError] = React.useState();
  const [email, setEmail] = React.useState();
  const handleOnEditProfile = () => {
    props.setEditProfile("profile");
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await apiClient.fetchUserFromId(props.user.id);
      console.log("user id:", props.user.id);
      console.log("user info: ", response.data.user);
      console.log("firstname: ", response.data.user.firstname);

      if (response?.data?.user) {
        setBio(response.data.user.bio);
        setLastName(response.data.user.lastname);
        setFirstName(response.data.user.firstname);
        setRating(response.data.user.rating);
        setEmail(response.data.user.email);

        // setImage(response.data.user[0].user[0].image_url);
      } else {
        setError("No account found");
      }
    };

    getUser();
  });

  return (
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
              <Avatar alt="profile picture" sx={{ width: 200, height: 200 }} />
            </Grid>
            <Grid>
              <Box>
                <Typography sx={{ fontSize: 25, mt: 10, ml: 3 }}>
                  {firstName} {lastName}
                </Typography>
                <Typography sx={{ ml: 3 }}>{email}</Typography>
                <Rating
                  name="user-rating"
                  sx={{ mt: 1, ml: 3 }}
                  value={rating}
                  readOnly
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexWrap: "wrap", width: "50% " }}>
          {props.user ? (
            <Button
              variant="contained"
              onClick={handleOnEditProfile}
              sx={{ alignContent: "baseline", mb: 4, ml: 55 }}
            >
              EDIT PROFILE
            </Button>
          ) : null}
          <Typography>{bio}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
