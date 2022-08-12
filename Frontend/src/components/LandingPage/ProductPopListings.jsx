import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Rating } from "@mui/material";
import Button from "./Button";
import Typography from "./Typography";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  const [error, setError] = useState("");
  const [listings, setListings] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const getListings = async () => {
      const response = await apiClient.fetchBestListings();

      if (response?.data?.listings) {
        setListings(response.data.listings);
      } else {
        setError("No listings found");
      }
    };

    getListings();
  }, []);

  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.light", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 10,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 5 }}>
          Popular Listings
        </Typography>

        <Grid justifyContent="center" className="bestListings" container spacing={10} mb={10}>
          {listings[0]
            ? listings.map((listing, i) => (
                <Grid item xs={12} md={3}>
                  <Box sx={item}>
                    <Box
                      className="bestImage"
                      component="img"
                      src={listing.image_url}
                      alt="vehicle listing"
                      sx={image}
                    />
                    <Typography
                      variant="h6"
                      align="center"
                      className="modelLimit"
                    >
                      {listing.make + " " + listing.model + " " + listing.year}
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      className="lineLimit"
                    >
                      {listing.description}
                    </Typography>
                    <Rating readOnly={true} value={listing.rating} />
                  </Box>
                </Grid>
              ))
            : null}
        </Grid>
        
        <Link to="/listings" style={{ textDecoration: "none" }}>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            component="a"
            sx={{ minWidth: 200, margin: 1 }}
          >
            Browse More Listings
          </Button>
        </Link>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
