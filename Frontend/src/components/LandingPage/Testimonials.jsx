import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';

import Image1 from '../../assets/testimonial-img-1.jpg';

import Rating from '@mui/material/Rating';

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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'white',
      }}>
      <Typography
        variant="h4"
        marked="center"
        component="h2"
        sx={{ mt: 10, textAlign: 'center' }}>
        Testimonials
      </Typography>
      <Container sx={{ mt: 15, mb: 15, display: 'flex', position: 'relative' }}>
        <Grid container spacing={5}>
          <Grid container item xs={12} md={12} mb={10}>
            <Grid item sx={item} md={6}>
              <Box
                component="img"
                src={Image1}
                alt="suitcase"
                sx={{ height: 300 }}
              />
            </Grid>
            <Grid item sx={item} md={6}>
              <Box
                style={{
                  mt: 1,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Typography variant="h5" align="center">
                  {`Ricky used VanLyfe to rent a van in San Francisco for a short trip when he was meeting a friend.`}
                  <br />
                  <br />
                  {`“I love VanLyfe because it has a great selection of homes-on-wheels all over the US. I will definitely be a long-time customer.”`}
                </Typography>
              </Box>
              <Rating value={5} readOnly />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
