import React, { useState } from 'react';
//import { Box, Grid } from "@mui/material";
import UserInfo from './UsersProfile/UserInfo';
import Categories from './UsersProfile/Categories';
import ActiveListings from './UsersProfile/ActiveListings';
import ActiveOrders from './UsersProfile/ActiveOrders';
import PastListings from './UsersProfile/PastListings';
import PastOrders from './UsersProfile/PastOrders';
import Reviews from './UsersProfile/Reviews';
import EditUser from './UsersProfile/EditUser';
import Favorites from './UsersProfile/Favorites';
import { Box } from '@mui/material';

export default function User({ user, setUser }) {
  const [category, setCategory] = useState('activeListings');
  const [editProfile, setEditProfile] = useState(null);

  return (
    <Box>
      {editProfile === 'profile' ? (
        <EditUser
          user={user}
          setUser={setUser}
          setEditProfile={setEditProfile}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <UserInfo
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            user={user}
            setUser={setUser}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
            }}>
            <Categories
              category={category}
              setCategory={setCategory}
              user={user}
              setUser={setUser}
            />

            {category === 'activeOrders' ? (
              <ActiveOrders user={user} setUser={setUser} />
            ) : category === 'activeOrders' ? (
              <PastListings user={user} setUser={setUser} />
            ) : category === 'activeListings' ? (
              <ActiveListings user={user} setUser={setUser} />
            ) : category === 'pastOrders' ? (
              <PastOrders user={user} setUser={setUser} />
            ) : category === 'reviews' ? (
              <Reviews user={user} setUser={setUser} />
            ) : category === 'favorites' ? (
              <Favorites user={user} setUser={setUser} />
            ) : (
              <ActiveListings user={user} setUser={setUser} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
