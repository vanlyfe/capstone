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
  ButtonGroup,
  Button,
  Menu,
  MenuItem,
  MenuList,
  Fade,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const drawerWidth = 250;

export default function Categories(props) {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    <>
      {/* Mobile Menu */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          justifyContent: 'center',
          py: 3,
          // background: '#fafafa',
        }}>
        <Button
          id="categories"
          onClick={handleClick}
          variant="contained"
          color="secondary">
          Categories
        </Button>
        <Fade in={open} unmountOnExit>
          <MenuList
            sx={{ width: '90%' }}
            id="categories-menu"
            open={open}
            MenuListProps={{
              'aria-labelledby': 'categories',
            }}>
            <MenuItem onClick={handleOnActiveListings}>
              Active Listings
            </MenuItem>
            <MenuItem onClick={handleOnPastListings}>Past Listings</MenuItem>
            <Divider />
            <MenuItem onClick={handleOnActiveOrders}>Active Orders</MenuItem>
            <MenuItem onClick={handleOnPastOrders}>Past Orders</MenuItem>
            <Divider />
            <MenuItem onClick={handleOnReviews}>Reviews</MenuItem>
          </MenuList>
        </Fade>
      </Box>

      {/* Desktop Menu */}
      <Box sx={{ zIndex: 1 }}>
        <Drawer
          sx={{
            width: drawerWidth,
            zIndex: 1,
            display: { xs: 'none', md: 'block' },
          }}
          variant="permanent">
          <Box sx={{ height: 300 }} />

          <List sx={{ width: drawerWidth }}>
            <ListItem>
              <ListSubheader component="div" id="nested-list-subheader">
                Host
              </ListSubheader>
            </ListItem>

            <ListItem
              sx={{ background: props.category == 'pl' ? '#f5faff' : '#fff' }}>
              <ListItemButton onClick={handleOnPastListings}>
                <ListItemText>Past Listings</ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem
              sx={{ background: props.category == 'al' ? '#f5faff' : '#fff' }}>
              <ListItemButton onClick={handleOnActiveListings}>
                <ListItemText>Active Listings</ListItemText>
              </ListItemButton>
            </ListItem>
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
                  background: props.category == 'ao' ? '#f5faff' : '#fff',
                }}>
                <ListItemButton onClick={handleOnActiveOrders}>
                  <ListItemText>Active Orders</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{
                  background: props.category == 'po' ? '#f5faff' : '#fff',
                }}>
                <ListItemButton onClick={handleOnPastOrders}>
                  <ListItemText>Past Orders</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          )}
          <Divider />

          <List>
            <ListItem
              sx={{ background: props.category == 'r' ? '#f5faff' : '#fff' }}>
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
