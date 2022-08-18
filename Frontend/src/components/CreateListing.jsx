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
  Slide,
  CircularProgress,
  Paper,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Fade,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import apiClient from '../services/apiClient';

export default function CreateListing({ user, isLoading }) {
  const navigate = useNavigate();
  const steps = ['Listing Details', 'Add Photos', 'Review Listing'];

  const [page, setPage] = useState(0);
  const [form, setForm] = useState({
    price: '',
    location: '',
    maxAccomodation: '',
    make: '',
    model: '',
    year: '',
    description: '',
    images: [], //element: { url: '', file: null }
  });
  const [error, setError] = useState('');
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const handleImageInput = (e) => {
    const newImages = [
      ...form.images,
      { url: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] },
    ];

    setForm({
      ...form,
      images: newImages,
    });
  };

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Verify user info is valid in form
   */
  const handleFormNext = () => {
    if (page === 0) {
      if (
        form.price &&
        form.location &&
        form.maxAccomodation &&
        form.make &&
        form.model &&
        form.year
      ) {
        setPage(page + 1);
        setError('');
      } else {
        setError('Please fill out all fields');
      }
    } else if (page === 1) {
      if (form.images.length > 0) {
        setPage(page + 1);
        setError('');
      } else {
        setError('Please add at least one image');
      }
    }
  };

  const renderImages = () => {
    return form.images.map((image, index) => (
      <Grid item xs={12} sm={4} key={index}>
        <Paper
          sx={{
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <Box
            component={'img'}
            width="100%"
            src={image.url}
            alt={`image ${index}`}
            style={{ objectFit: 'cover' }}
          />
        </Paper>
      </Grid>
    ));
  };

  const handleOnInputChange = (e) => {
    
    const { name, value } = e.target;

    if (
      (name === 'price' || name === 'year') &&
      value !== '' &&
      !isNumeric(value)
    ) {
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    setSubmitIsLoading(true)
    try {
      for (const key in form) {
        if (key !== 'description' && !form[key]) {
          setError(`${key} is required`);
          return;
        }
      }

      const images = form.images.map((image) => image.file);

      const data = await apiClient.postListing({
        price: form.price,
        location: form.location,
        max_accomodation: form.maxAccomodation,
        make: form.make,
        model: form.model,
        year: form.year,
        description: form.description,
        images
      });
      
    } catch (e) {
      console.log(e);
    }
    setSubmitIsLoading(false)
    navigate('/');
  };

  if (submitIsLoading) {
    return (
      <Fade in={submitIsLoading}>
        <Box sx={{display: "flex", justifyContent: "center", mt: 20}}>
              <CircularProgress  size={70}/>
        </Box>
    
      </Fade>
    );
    }

  return (
    <>
      {isLoading ? (
        <Container align="center">
          <CircularProgress color="primary" size="xl" />
        </Container>
      ) : (
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
                  <Stepper sx={{ mt: 2 }} activeStep={page}>
                    {steps.map((label, index) => {
                      return (
                        <Step key={label} completed={page > index}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  <Box
                    sx={{
                      // borderBottom: '1px solid #e0e0e0',
                      width: '100%',
                      pb: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                    <Button
                      onClick={() => {
                        if (page > 0) {
                          setPage(page - 1);
                        }
                      }}
                      sx={{ mt: 2 }}
                      disabled={page === 0}
                      variant="contained">
                      Back
                    </Button>
                    <Button
                      sx={{ mt: 2 }}
                      onClick={() => {
                        if (page === steps.length - 1) {
                          handleOnSubmit();
                        } else {
                          handleFormNext();
                        }
                      }}
                      variant="contained">
                      {page === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </Box>
                  {error && <Typography color="red">*{error}</Typography>}

                  {/* Confirm Info Page */}
                  <Fade
                    direction={`${page == 2 ? 'right' : 'left'}`}
                    in={page === 2}
                    mountOnEnter
                    unmountOnExit>
                    <Box sx={{ width: '100%' }}>
                      <Typography mt={3} variant="h6" align="center">
                        Confirm Information
                      </Typography>
                      <Typography variant="subtitle1">
                        Vehicle Information
                      </Typography>
                      <Typography variant="body1">
                        Make: {form.make}
                        <br />
                        Model: {form.model}
                        <br />
                        Year: {form.year}
                        <br />
                        <br />
                      </Typography>
                      <Typography variant="subtitle1">
                        Listing Information
                      </Typography>
                      <Typography variant="body1">
                        Price: ${form.price}
                        <br />
                        Location: {form.location}
                        <br />
                        Max Accomodation: {form.maxAccomodation}
                        <br />
                        description: {form.description}
                        <br />
                        <br />
                      </Typography>
                      <Typography variant="subtitle1">
                        Listing Photos
                      </Typography>
                      <Grid item container xs={12} spacing={1}>
                        {renderImages()}
                      </Grid>
                    </Box>
                  </Fade>

                  <Fade direction={`${`right`}`} in={page === 0} unmountOnExit>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            name="make"
                            value={form.make}
                            required
                            fullWidth
                            id="make"
                            onChange={handleOnInputChange}
                            label="Make"
                            autoFocus
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <TextField
                            name="model"
                            value={form.model}
                            required
                            fullWidth
                            id="model"
                            onChange={handleOnInputChange}
                            label="Model"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            name="year"
                            required
                            value={form.year}
                            fullWidth
                            id="year"
                            onChange={handleOnInputChange}
                            label="Year"
                            autoFocus
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl required fullWidth>
                            <InputLabel htmlFor="price">Price</InputLabel>
                            <OutlinedInput
                              value={form.price}
                              id="price"
                              name="price"
                              onChange={handleOnInputChange}
                              startAdornment={
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              }
                              label="price"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            name="location"
                            value={form.location}
                            required
                            fullWidth
                            id="location"
                            onChange={handleOnInputChange}
                            label="Location"
                            autoFocus
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            }}
                            name="maxAccomodation"
                            value={form.maxAccomodation}
                            required
                            fullWidth
                            id="maxAccomodation"
                            onChange={handleOnInputChange}
                            label="Max Accomodation"
                            autoFocus
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            minRows={3}
                            maxRows={7}
                            name="description"
                            value={form.description}
                            multiline
                            fullWidth
                            id="description"
                            onChange={handleOnInputChange}
                            label="Description"
                            autoFocus
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Fade>

                  <Fade
                    direction={`${page == 2 ? 'right' : 'left'}`}
                    in={page === 1}
                    mountOnEnter
                    unmountOnExit>
                    <Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography mt={3} variant="h6" align="center">
                            Add Images to Your Listing
                          </Typography>
                        </Grid>

                        {/* Image Display */}
                        <Grid item container xs={12} spacing={1}>
                          {renderImages()}
                        </Grid>

                        {/* Image Upload */}
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            component="label"
                            disabled={form.images.length > 4}>
                            Add Image
                            <input
                              onChange={handleImageInput}
                              type="file"
                              name={`image`}
                              hidden
                              accept="image/png, image/jpeg"
                            />
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Fade>
                </Box>
              </Container>
            </Box>
          ) : (
            <Login returnEndpoint='/createListing'/>
          )}
        </>
      )}
    </>
  );
}
