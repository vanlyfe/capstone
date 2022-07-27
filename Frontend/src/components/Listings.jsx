import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, Paper, Slide } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import apiClient from '../services/apiClient';

export default function Listings() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [listings, setListings] = React.useState([]);
  const [error, setError] = React.useState(null);

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
            mt: 5,
            mr: 3,
            height: '80vh',
            width: 240,
            display: { xs: 'none', md: 'block' },
          }}></Paper>

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
              <Card sx={{ width: "100%" }}>
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
