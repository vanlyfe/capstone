import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "./Typography";
import Image1 from "../../assets/values-img-1.jpg";
import Image2 from "../../assets/values-img-2.jpg";
import Image3 from "../../assets/values-img-3.jpg";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", overflow: "hidden", bgcolor: "secondary.light" }}
    >
      <Container
        sx={{
          display: "flex",
          position: "relative",
          mt: 10,
        }}
      >
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
                src={Image2}
                alt="woman in front of van"
                sx={{ height: 300 }}
              />
              {/* <Typography variant="h6" sx={{ my: 5 }}>
                The best luxury hotels
              </Typography> */}
            </Grid>
            <Grid item sx={item} md={6}>
              <Box
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  minHeight: 250,
                }}
              >
                <Typography variant="h5" align="left" sx={{ fontSize: 21 }}>
                  Our mission is to create a world where anyone can travel.
                  Browse through thousands of Listings to find the ones that fit
                  the way you like to travel. Learn more about a Listing by
                  reviewing the description and photos, the Host profile, and
                  Guest reviews. If you have questions, just message the Host.
                  {/* {
                    'With VanLyfe, you can rent any type of vehicle as a temporary home. '
                  }

                  {'Our vehicles are safe and affordable.'} */}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid container item xs={12} md={12} mb={10}>
            <Grid item sx={item} md={6}>
              <Box
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  minHeight: 250,
                }}
              >
                <Typography variant="h5">
                  {/* {
                    "Explore the world of VanLyfe and find the perfect vehicle for your needs."
                  } 
                 */}

                  {
                    "With VanLyfe, you can rent any type of vehicle as a temporary home. "
                  }

                  {"Our vehicles are safe and affordable."}
                </Typography>
              </Box>
            </Grid>
            <Grid item sx={item} md={6}>
              <Box
                component="img"
                src={Image3}
                alt="inside of van with bed inside"
                sx={{ height: 300 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
