import * as React from 'react';
import Button from './Button';
import Box from '@mui/material/Box';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';

import Logo from '../../assets/Logo1.svg';
import { Link } from 'react-router-dom';
const backgroundImage =
  'https://c.pxhere.com/photos/73/d5/classic_female_model_person_vehicle_volkswagen_woman-986101.jpg!d';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Rent Your New Home-On-Wheels
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}>
        There are thousands of vehicles to choose from at affordable prices.
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Link to="/listings" style={{textDecoration: "none"}}>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            component="a"
            sx={{ minWidth: 200, margin: 1 }}>
            Browse Listings
          </Button>
        </Link>
        <Link to="/createlisting" style={{textDecoration: "none"}}>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          href="/premium-themes/onepirate/sign-up/"
          sx={{ minWidth: 200, margin: 1 }}>
          Create Listing
        </Button>
        </Link>
      </Box>

      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
