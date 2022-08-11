import * as React from "react";
import Button from "./Button";
import Box from "@mui/material/Box";
import Typography from "./Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import { Link } from "react-router-dom";

export default function ProductHero() {
  return (
    <Box>
      <ProductHeroLayout
        sxBackground={{
          background: {},
          backgroundColor: "#7fc7d9", // Average color of the background image.
          backgroundPosition: "center",
        }}
      >
        {/* Increase the network loading priority of the background image. */}
        {/* <img
          style={{ display: "none" }}
          src={backgroundImage}
          alt="increase priority"
        /> */}
        <Typography color="inherit" align="center" variant="h2" marked="center">
          Rent Your New Home-On-Wheels
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
        >
          There are thousands of vehicles to choose from at affordable prices.
        </Typography>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link to="/listings" style={{ textDecoration: "none" }}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              component="a"
              sx={{ margin: 1 }}
            >
              Browse Listings
            </Button>
          </Link>
          <Link to="/createlisting" style={{ textDecoration: "none" }}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              component="a"
              href="/premium-themes/onepirate/sign-up/"
              sx={{ margin: 1 }}
            >
              Create Listing
            </Button>
          </Link>
        </Box>

        <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
          Discover the experience
        </Typography>
      </ProductHeroLayout>
    </Box>
  );
}
