import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Avatar,
  Grid,
  Autocomplete,
  Button,
  TextField,
  Link,
  Container,
} from '@mui/material';
import SnackbarContent from '@mui/material/SnackbarContent';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import apiClient from '../../services/apiClient';

export default function EditUser(props) {
  const [success, setSuccess] = React.useState(false);
  const [value, setValue] = React.useState();
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    birthdate: '',
    gender: '',
    phone: '',
    location: '',
    bio: '',
    email: '',
  });
  const [errors, setErrors] = React.useState({});

  const handleOnCancel = () => {
    props.setEditProfile(null);
  };

  const handleOnSubmit = async () => {
    setErrors((e) => ({ ...e, form: null }));
    const { data, error } = await apiClient.updateUser(form, props.user.id);

    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }

    if (data?.user) {
      props.setUser(data.user);

      setSuccess(true);
      setTimeout(function () {
        setSuccess(false);
        props.setEditProfile(null);
      }, 2000);
    }
  };

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Link href={props.user ? '/user/' + props.user.id : '/login'}>
        <ArrowBackIcon sx={{ fontSize: 60, position: 'absolute', left: 10 }} />
      </Link>

      <Grid container>
        <Grid item md={3} xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                fontSize: 30,
                fontWeight: 400,
              }}>
              Edit Profile
            </Box>
            <Box>
              <Avatar
                alt="Avatar"
                sx={{ width: 150, height: 150, mt: 3, mb: 1 }}
              />
            </Box>
            <Button variant="text" href="/user/:id/activeListing">
              Upload Photo
            </Button>
          </Box>
        </Grid>

        <Grid item container md={9} spacing={4}>
          {errors.form && <span className="editUserError">{errors.form}</span>}
          <Grid item xs={12}>
            <SnackbarContent
              message="Edited successfully!"
              sx={{
                ml: '50px',
                mb: '50px',
                display: success ? 'null' : 'none',
                width: '60px',
                fontSize: 20,
                height: 60,
              }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              id="filled-multiline-flexible"
              label="First Name"
              name="firstName"
              maxRows={4}
              onChange={handleOnInputChange}
              variant="filled"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              id="filled-multiline-flexible"
              label="Last Name"
              name="lastName"
              maxRows={4}
              onChange={handleOnInputChange}
              variant="filled"
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              id="filled-multiline-flexible"
              label="Email"
              name="email"
              onChange={handleOnInputChange}
              maxRows={4}
              variant="filled"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              id="filled-multiline-flexible"
              label="Username"
              name="username"
              onChange={handleOnInputChange}
              maxRows={4}
              variant="filled"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Autocomplete
              fullWidth
              disablePortal
              id="filled-multiline-flexible"
              options={['Male', 'Female', 'Do not specify']}
              sx={{
                background: 'rgba(0, 0, 0, 0.06)',
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Gender"
                  name="gender"
                  onChange={handleOnInputChange}
                  onSelect={handleOnInputChange}
                />
              )}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                onChange={handleOnInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{
                      background: 'rgba(0, 0, 0, 0.06)',
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              id="filled-multiline-flexible"
              label="Phone Number"
              fullWidth
              name="phone"
              maxRows={4}
              type="number"
              onChange={handleOnInputChange}
              variant="filled"
            />
          </Grid>

          <Grid item md={12} xs={12}>
            <TextField
              id="filled-multiline-flexible"
              label="City"
              name="location"
              onChange={handleOnInputChange}
              maxRows={4}
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              id="filled-multiline-static"
              label="Describe Yourself"
              name="bio"
              onChange={handleOnInputChange}
              multiline
              rows={4}
              variant="filled"
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: "100%",
                justifyContent: 'space-around',
              }}>
              <Button
                variant="contained"
                onClick={handleOnSubmit}
                disabled={
                  form.firstName === '' &&
                  form.lastName === '' &&
                  form.username === '' &&
                  form.birthdate === '' &&
                  form.gender === '' &&
                  form.location === '' &&
                  form.phone === '' &&
                  form.bio === '' &&
                  form.email === ''
                }>
                Accept Changes
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={handleOnCancel}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
