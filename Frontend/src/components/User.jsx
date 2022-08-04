import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import UserInfo from "./UsersProfile/UserInfo";
import Categories from "./UsersProfile/Categories";
import ActiveListings from "./UsersProfile/ActiveListings";
import ActiveOrders from "./UsersProfile/ActiveOrders";
import PastListings from "./UsersProfile/PastListings";
import PastOrders from "./UsersProfile/PastOrders";
import Reviews from "./UsersProfile/Reviews";
import EditUser from "./UsersProfile/EditUser";

export default function User({ user, setUser }) {
  const [category, setCategory] = useState(null);
  const [editProfile, setEditProfile] = useState(null);
  return (
    <Box>
      {editProfile === "profile" ? (
        <EditUser />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <UserInfo
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            user={user}
            setUser={setUser}
          />
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
              bgcolor: "grey",
            }}
          >
            <Categories category={category} setCategory={setCategory} />

            {category === "ao" ? (
              <ActiveOrders user={user} setUser={setUser} />
            ) : category === "pl" ? (
              <PastListings user={user} setUser={setUser} />
            ) : category === "al" ? (
              <ActiveListings user={user} setUser={setUser} />
            ) : category === "po" ? (
              <PastOrders user={user} setUser={setUser} />
            ) : category === "r" ? (
              <Reviews user={user} setUser={setUser} />
            ) : (
              <ActiveListings />
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
