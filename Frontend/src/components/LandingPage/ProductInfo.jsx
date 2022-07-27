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
      <Container sx={{ mt: 15, mb: 10, display: 'flex', position: 'relative' }}>
        {/* <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        /> */}
        <Grid container spacing={5}>
          <Grid container item xs={12} md={12} mb={10}>
            <Grid item sx={item} md={6}>
              <Box
                component="img"
                src={Image1}
                alt="van in front of a building"
                sx={{ height: 300 }}
              />
              {/* <Typography variant="h6" sx={{ my: 5 }}>
                The best luxury hotels
              </Typography> */}
            </Grid>
            <Grid item sx={item} md={6}>
              <Box
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 250,
                }}>
                <Typography variant="h5" align="center">
                  {
                    'With VanLyfe, you can rent any type of vehicle as a temporary home. '
                  }

                  {'Our vehicles are safe and affordable.'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={12} mb={10}>
            <Grid item sx={item} md={6}>
              <Box
                component="img"
                src={Image2}
                alt="woman in front of van"
                sx={{ height: 300 }}
              />
            </Grid>
            <Grid item sx={item} md={6}>
              <Box
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 300,
                }}>
                <Typography variant="h5">
                  {
                    'If you are a vehicle owner, VanLyfe makes it easy to rent out your vehicle.'
                  }
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={12} mb={10}>
            <Grid item sx={item} md={6}>
              <Box
                component="img"
                src={Image3}
                alt="inside of van with bed inside"
                sx={{ height: 300 }}
              />
            </Grid>
            <Grid item sx={item} md={6}>
              <Box
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 250,
                }}>
                <Typography variant="h5">
                  {
                    'Explore the world of VanLyfe and find the perfect vehicle for your needs.'
                  }
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
