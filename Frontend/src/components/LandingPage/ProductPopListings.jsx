import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from './Button';
import Typography from './Typography';
import { Link } from 'react-router-dom';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}>
      <Container
        sx={{
          mt: 10,
          mb: 10,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          Popular Listings
        </Typography>
        <div>
          <Grid container spacing={5} mb={10}>
            <Grid item xs={12} md={3}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="/static/themes/onepirate/productHowItWorks1.svg"
                  alt="vehicle listing"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Vehicle Name
                </Typography>
                <Typography variant="body1" align="center">
                  Product Description: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="/static/themes/onepirate/productHowItWorks1.svg"
                  alt="vehicle listing"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Vehicle Name
                </Typography>
                <Typography variant="body1" align="center">
                  Product Description: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="/static/themes/onepirate/productHowItWorks1.svg"
                  alt="vehicle listing"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Vehicle Name
                </Typography>
                <Typography variant="body1" align="center">
                  Product Description: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="/static/themes/onepirate/productHowItWorks1.svg"
                  alt="vehicle listing"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Vehicle Name
                </Typography>
                <Typography variant="body1" align="center">
                  Product Description: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        {/* <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/premium-themes/onepirate/sign-up/"
          sx={{ mt: 8 }}>
          Get started
        </Button> */}
        <Link to="/listings" style={{ textDecoration: 'none' }}>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            component="a"
            sx={{ minWidth: 200, margin: 1 }}>
            Browse More Listings
          </Button>
        </Link>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
