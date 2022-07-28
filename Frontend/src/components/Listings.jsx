import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Autocomplete,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Rating,
  Slide,
  TextField,
} from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import apiClient from '../services/apiClient';

export default function Listings() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [listings, setListings] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [rating, setRating] = React.useState(0);

  const locations = ['San Francisco', 'Los Angeles', 'New York'];

  useEffect(() => {
    const getListings = async () => {
      const response = await apiClient.fetchListings();
      if (response?.data?.listings) {
        setListings(response.data.listings);
      } else {
        setError('No listings found');
      }
    };

    getListings();
  }, []);

  return (
    <Container maxWidth="100%" sx={{ mt: 0, my: 0 }}>
      <Box container spacing={2} display="flex">
        {/* Desktop Filter List */}
        <Paper
          elevation={3}
          xs={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 5,
            mr: 3,
            height: '80vh',
            width: 280,
            
          }}>
          <Typography variant="h5" align="center" sx={{ my: 2 }}>
            {`Filter`}
          </Typography>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              mt: 2,
            }}>
            <Typography variant="p" align="center">
              {`Minimum Rating`}
            </Typography>
            <Rating
              name="min-rating"
              value={rating}
              precision={0.5}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <Autocomplete
              disablePortal
              id="locations-auto-complete"
              options={locations}
              sx={{ width: '90%', mt: 2 }}
              renderInput={(params) => (
                <TextField {...params} label="Location" />
              )}
            />
            <Typography variant="p" align="center" mt={2}>
              {`Price Range`}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <FormControl sx={{ mt: 2, width: '40%' }}>
                <InputLabel htmlFor="outlined-adornment-amount">Min</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  // value={5}
                  // onChange={handleChange('amount')}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
              <Typography variant="h5">-</Typography>
              <FormControl sx={{ mt: 2, width: '40%' }}>
                <InputLabel htmlFor="outlined-adornment-amount">Max</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  // value={5}
                  // onChange={handleChange('amount')}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
            </Box>
          </Box>

          {/* <FormControl sx={{ ml: 3, my: 2 }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Vehicle Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group">
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl> */}
        </Paper>

        {/* Mobile Filter Bottom Bar */}

        <Paper
          elevation={3}
          sx={{
            zIndex: 1,
            display: { xs: 'block', md: 'none' },
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '7vh',
            width: '100%',
          }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              mr: 3,
            }}>
            <Button
              onClick={() => {
                setMobileMenuOpen(true);
              }}>
              <Typography variant="h6">{`Filter`}</Typography>
              <KeyboardDoubleArrowUpIcon />
            </Button>
          </Box>
        </Paper>

        {/* Mobile Filter Menu */}
        <Slide direction={'up'} in={mobileMenuOpen} mountOnEnter>
          <Paper
            sx={{
              zIndex: 1,
              height: '80vh',
              width: '100%',
              position: 'fixed',
              bottom: 0,
              left: 0,
              display: { xs: 'block', md: 'none' },
            }}
            elevation={3}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                height: '7vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mr: 4,
              }}>
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                }}>
                <Typography variant="h6">{`Filter`}</Typography>
                <KeyboardDoubleArrowDownIcon />
              </Button>
            </Box>
          </Paper>
        </Slide>

        <Grid
          container
          // bgcolor="red"
          sx={{ width: '100%', height: '100%' }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ my: 2 }}>
              {`Browse the Current Listings`}
            </Typography>
          </Grid>
          {listings.map((listing, i) => (
            <Grid key={i} item xs={4} justifyContent="center">
              <Card sx={{ width: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={listing.image_url}
                  alt="listing photo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {listing.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {listing.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Book Now</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
