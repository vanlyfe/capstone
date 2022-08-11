import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Grid,
  Typography,
  Toolbar,
  AppBar,
  Avatar,
  Rating,
  Button,
} from '@mui/material';
import apiClient from '../../services/apiClient';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserInfo(props) {
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [bio, setBio] = React.useState();
  const [rating, setRating] = React.useState(0);
  const [image, setImage] = React.useState();
  const [Error, setError] = React.useState();
  const [email, setEmail] = React.useState();
  const [profileImage, setProfileImage] = React.useState();
  const [isDelete, setIsDelete] = React.useState(false);

  const navigate = useNavigate();

  const handleOnEditProfile = () => {
    props.setEditProfile('profile');
  };

  const handleOnClickDelete = () => {
    setIsDelete(true);
  };

  const handleOnDelete = async () => {
    await apiClient.deleteUser(props.user.id);
    apiClient.logoutUser();
    props.setUser(null);
    navigate('/');
  };

  const handleOnCancel = () => {
    setIsDelete(false);
  };

  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const response = await apiClient.fetchUserFromId(id);

      if (response?.data?.user) {
        setBio(response.data.user.bio);
        setLastName(response.data.user.lastname);
        setFirstName(response.data.user.firstname);
        setRating(response.data.user.rating);
        setEmail(response.data.user.email);
        setProfileImage(response.data.user.image_url);
      } else {
        setError('No account found');
      }
    };

    getUser();
  });

  return (
    <AppBar
      position="relative"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer - 1,
        bgcolor: '#e1e9f0',
        color: 'black',
        p: 3,
      }}>
      <Dialog
        open={isDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {'Do you want to continue?'}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleOnDelete}>Delete account</Button>
          <Button onClick={handleOnCancel} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
          direction="column"
          spacing={2}
          container>
          <Grid container item md={6}>
            <Grid
              item
              md={3}
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Avatar
                src={profileImage}
                alt="profile picture"
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Typography sx={{ fontSize: 25 }}>
                  {firstName} {lastName}
                </Typography>
                <Typography>{email}</Typography>
                <Rating name="user-rating" value={rating} readOnly />
              </Box>
            </Grid>

            {bio && (
              <Grid item md={8} xs={12} textAlign="center" >
                <Box
                  backgroundColor={{xs: `secondary.light`, md: `secondary.main`}}
                  sx={{
                    height: '100%',
                    width: '100%',
                    borderRadius: '5px',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    mt: 1,
                  }}>
                  <Typography
                    sx={{ fontSize: '20px', fontStyle: 'italic', my: 2 }}>
                    "{bio}"
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          {props.user?.id && Number(props.user.id) === Number(id) && (
            <Grid item md={6}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  // alignItems: 'flex-start',
                }}>
                <Button
                  variant="contained"
                  onClick={handleOnEditProfile}
                  sx={{ alignContent: 'baseline', m: 1 }}>
                  EDIT PROFILE
                </Button>
                <Button
                  variant="contained"
                  onClick={handleOnClickDelete}
                  sx={{ alignContent: 'baseline', m: 1 }}>
                  DELETE PROFILE
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
