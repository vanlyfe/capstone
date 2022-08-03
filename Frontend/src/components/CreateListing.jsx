import {
  Container,
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import Login from './Login';
import apiClient from '../services/apiClient';

export default function CreateListing({ user }) {
  const [form, setForm] = useState({
    price: '',
    location: '',
    maxAccomodation: '',
    make: "",
    model: '',
    year: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
  });
  const [error, setError] = useState('');

  const handleImageInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const key in form) {
        if (key !== 'image1' && key !== 'description' && !form[key]) {
          setError(`${key} is required`);
          return;
        }
      }

      const { data } = await apiClient.postListing({
        price: form.price,
        location: form.location,
        max_accomodation: form.maxAccomodation,
        make: form.make,
        model: form.model,
        year: form.year,
        description: form.description,
        image_url: form.image1,
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {user ? (
        <Box>
          <Container component="main" maxWidth="sm">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Typography component="h1" variant="h5">
                Create Listing
              </Typography>
              {error && <Typography color="red">*{error}</Typography>}
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="make"
                      required
                      fullWidth
                      id="make"
                      // onChange={handleOnInputChange}
                      label="Make"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="model"
                      required
                      fullWidth
                      id="model"
                      // onChange={handleOnInputChange}
                      label="Model"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="year"
                      required
                      fullWidth
                      id="year"
                      // onChange={handleOnInputChange}
                      label="Year"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl required fullWidth>
                      <InputLabel htmlFor="price">Price</InputLabel>
                      <OutlinedInput
                        id="price"
                        // onChange={handleChange('amount')}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        label="price"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      name="location"
                      required
                      fullWidth
                      id="location"
                      // onChange={handleOnInputChange}
                      label="Location"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      name="maxAccomodation"
                      required
                      fullWidth
                      id="maxAccomodation"
                      // onChange={handleOnInputChange}
                      label="Max Accomodation"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      minRows={3}
                      maxRows={7}
                      name="description"
                      multiline
                      fullWidth
                      id="description"
                      // onChange={handleOnInputChange}
                      label="Description"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Upload Images</Typography>
                  </Grid>

                  {/* Image Upload */}
                  {[1, 2, 3].map((i) => (
                    <Grid key={i} item xs={12}>
                      <Button variant="contained" component="label">
                        Image {i}
                        <input
                          onChange={handleImageInput}
                          type="file"
                          name={`image${i}`}
                          hidden
                          accept="image/png, image/jpeg"
                        />
                      </Button>
                      {form[`image${i}`] && (
                        <Box
                          component="img"
                          src={form[`image${i}`]}
                          alt="image"
                          sx={{ maxWidth: '100%', mt: 2 }}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
                <Box mt={5}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleOnSubmit}>
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      ) : (
        <Login />
      )}
    </>
  );
}
