import React from "react";
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

export default function UserInfo(props) {
  const handleOnEditProfile = () => {
    props.setEditProfile("profile");
  };
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
                <Rating name="user-rating" sx={{ mt: 1, ml: 3 }} readOnly />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexWrap: "wrap", width: "50% " }}>
          <Button
            variant="contained"
            onClick={handleOnEditProfile}
            sx={{ alignContent: "baseline", mb: 4, ml: 55 }}
          >
            EDIT PROFILE
          </Button>

          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa itaque
            in officiis? Neque, ducimus error! Atque molestias aliquid facere
            animi modi praesentium, illo enim reprehenderit omnis corrupti
            beatae sint voluptate?
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
