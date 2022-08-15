import React, { useState, useEffect } from "react";
//import { Box, Grid } from "@mui/material";
import UserInfo from "./UsersProfile/UserInfo";
import Categories from "./UsersProfile/Categories";
import ActiveListings from "./UsersProfile/ActiveListings";
import ActiveOrders from "./UsersProfile/ActiveOrders";
import PastListings from "./UsersProfile/PastListings";
import PastOrders from "./UsersProfile/PastOrders";
import Favorites from "./UsersProfile/Favorites";
import Reviews from "./UsersProfile/Reviews";
import EditUser from "./UsersProfile/EditUser";
import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
export default function User({ user, setUser }) {
  const [category, setCategory] = useState(null);
  const [editProfile, setEditProfile] = useState(null);

  console.log(user);

  return (
    <Box>
      {editProfile === "profile" ? (
        <EditUser
          user={user}
          setUser={setUser}
          setEditProfile={setEditProfile}
        />
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
              height: "70%",
              width: "100%",
              mr: 67,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Categories
              category={category}
              setCategory={setCategory}
              user={user}
              setUser={setUser}
            />

            {category === "activeOrders" ? (
              <ActiveOrders user={user} setUser={setUser} />
            ) : category === "pastListings" ? (
              <PastListings user={user} setUser={setUser} />
            ) : category === "activeListings" ? (
              <ActiveListings user={user} setUser={setUser} />
            ) : category === "pastOrders" ? (
              <PastOrders user={user} setUser={setUser} />
            ) : category === "reviews" ? (
              <Reviews user={user} setUser={setUser} />
            ) : category === "favorites" ? (
              <Favorites user={user} setUser={setUser} />
            ) : (
              <ActiveListings user={user} setUser={setUser} />
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
