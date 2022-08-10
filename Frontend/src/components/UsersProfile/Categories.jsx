import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  AppBar,
  ListSubheader,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const drawerWidth = 250;

export default function Categories(props) {
  let { id } = useParams();

  const handleOnPastOrders = () => {
    props.setCategory('po');
  };

  const handleOnPastListings = () => {
    props.setCategory('pl');
  };

  const handleOnActiveOrders = () => {
    props.setCategory('ao');
  };

  const handleOnActiveListings = () => {
    props.setCategory('al');
  };

  const handleOnReviews = () => {
    props.setCategory('r');
  };
  return (
    <Box sx={{ zIndex: 1 }}>
      <Drawer
        sx={{
          width: drawerWidth,
          zIndex: 1,
          display: { xs: 'none', md: 'block' },
        }}
        variant="permanent">
        <Box sx={{ height: 370 }} />

        {/* <Box sx={{height: 500}}/> */}
        <List sx={{ width: drawerWidth }}>
          <ListItem
            sx={{
              display: 'flex',
              flexDirection: 'column',
              background: '#fafafa',
            }}>
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{ fontSize: 22, background: '#fcfcfc' }}>
              Host
            </ListSubheader>
          </ListItem>

          <ListItem sx={{ display: 'flex', flexDirection: 'column' }}>
            <ListItemButton onClick={handleOnActiveListings}>
              <ListItemText>Active Listings</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={handleOnPastListings}>
              <ListItemText>Past Listings</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {props.user?.id && Number(props.user.id) === Number(id) && (
          <List>
            <ListItem
              sx={{
                display: 'flex',
                flexDirection: 'column',
                background: '#fafafa',
              }}>
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                sx={{ fontSize: 22, background: '#fcfcfc' }}>
                Renter
              </ListSubheader>
            </ListItem>

            <ListItem sx={{ display: 'flex', flexDirection: 'column' }}>
              <ListItemButton onClick={handleOnActiveOrders}>
                <ListItemText>Active Orders</ListItemText>
              </ListItemButton>
              <ListItemButton onClick={handleOnPastOrders}>
                <ListItemText>Past Orders</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        )}
        <Divider />

        <List>
          <ListItem sx={{ display: 'flex', flexDirection: 'column' }}>
            <ListItemButton onClick={handleOnReviews}>
              <ListItemText>Reviews</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>

    // </Box>
  );
}
