import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';
import Image1 from '../../assets/values-img-1.jpg';
import Image2 from '../../assets/values-img-2.jpg';
import Image3 from '../../assets/values-img-3.jpg';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}>
      <Container
        sx={{
          display: 'flex',
          position: 'relative',
          my: 10,
        }}>
        <Grid container spacing={5}>
          <Grid container item xs={12}>
            <Grid item sx={item} md={6} xs={12}>
              <Box
                component="img"
                src={Image2}
                alt="woman in front of van"
                sx={{ height: 300, mb: 5 }}
              />
            </Grid>
            <Grid item sx={item} md={6} xs={12}>
              <Box
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 250,
                }}>
                <Typography variant="h5" align="left">
                  Our mission is to create a world where anyone can travel.
                  Browse through thousands of listings to find the one that fits
                  the way you like to travel. Learn more about a listing by
                  reviewing the description, photos, host profile, and guest
                  reviews.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <Grid item sx={item} md={6}>
              <Box
                component="img"
                src={Image3}
                alt="inside of van with bed inside"
                sx={{ height: 300 }}
              />
            </Grid>
            <Grid item sx={item} md={6} xs={12}>
              <Box
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 250,
                }}>
                <Typography variant="h5">
                  {
                    'With VanLyfe, you can rent any type of vehicle as a temporary home. '
                  }

                  {'Our vehicles are safe and affordable.'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
