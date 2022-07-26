import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';

import Image1 from '../../assets/values-img-1.jpg';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}>
      <Container sx={{ mt: 15, mb: 15, display: 'flex', position: 'relative' }}>
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
                alt="suitcase"
                sx={{ height: 350 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                The best luxury hotels
              </Typography>
            </Grid>
            <Grid item sx={item} md={6}>
              <Box>
                <Typography variant="h5" styles={{ sx: { top: '50px' } }}>
                  {
                    'From the latest trendy boutique hotel to the iconic palace with XXL pool'
                  }

                  {
                    ', go for a mini-vacation just a few subway stops away from your home.'
                  }
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={12} mb={10}>
            <Grid item sx={item} md={6}>
              <Typography variant="h5">
                {
                  'From the latest trendy boutique hotel to the iconic palace with XXL pool'
                }

                {
                  ', go for a mini-vacation just a few subway stops away from your home.'
                }
              </Typography>
            </Grid>
            <Grid item sx={item} md={6}>
              <Box
                component="img"
                src="/static/themes/onepirate/productValues1.svg"
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                The best luxury hotels
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={12} mb={10}>
            <Grid item sx={item} md={6}>
              <Box
                component="img"
                src="/static/themes/onepirate/productValues1.svg"
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                The best luxury hotels
              </Typography>
            </Grid>
            <Grid item sx={item} md={6}>
              <Typography variant="h5">
                {
                  'From the latest trendy boutique hotel to the iconic palace with XXL pool'
                }

                {
                  ', go for a mini-vacation just a few subway stops away from your home.'
                }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
