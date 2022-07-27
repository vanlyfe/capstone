import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';

import apiClient from '../services/apiClient';

export default function Listings() {
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
    <Container maxWidth="100%" sx={{ mt: 0 }}>
      <Box container spacing={2} display="flex">
        {/* Desktop Filter List */}
        <Box
          xs={2}
          bgcolor="gray"
          sx={{
            mt: 5,
            mr: 3,
            height: '80vh',
            width: 240,
            display: { xs: 'none', md: 'block' },
          }}></Box>
        {/* Mobile Filter Menu */}
        <Box>
          
        </Box>
        <Grid
          container
          xs={10}
          // bgcolor="red"
          sx={{ mt: 5 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          spacing={2}>
          {listings.map((listing) => (
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
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
