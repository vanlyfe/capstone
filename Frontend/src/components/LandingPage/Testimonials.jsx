import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "./Typography";

import Image1 from "../../assets/testimonial-img-1.jpg";

import Rating from "@mui/material/Rating";

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
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        bgcolor: "white",
      }}
    >
      <Typography
        variant="h4"
        marked="center"
        component="h2"
        sx={{ mt: 10, textAlign: "center" }}
      >
        Testimonials
      </Typography>
      <Container
        sx={{
          mt: 15,
          mb: 15,
          display: "flex",
          position: "relative",
        }}
      >
        <Grid
          spacing={5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            mb={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid item sx={item} md={6}>
              <Box
                component="img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbUuO14CsT84LrRrU72Vo9WM6inhtZnTS9w&usqp=CAU"
                alt="suitcase"
                sx={{ height: 300, width: 250 }}
              />
            </Grid>
            <Grid item sx={item} md={6}>
              <Box
                style={{
                  mt: 1,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 20 }} align="center">
                  <br />
                  <br />
                  {`“I've always had pleasant dealings with Vanlyfe. All of the hosts I used were superhosts and they were friendly and courteous. They also offered great accommodations and prices.”`}
                </Typography>
              </Box>
              <Rating value={5} readOnly />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            mb={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid item sx={item} md={6}>
              <Box
                component="img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAvxwSQ947uOKwcyX7egl8OAr-WjlvORUCGw&usqp=CAU"
                alt="suitcase"
                sx={{ height: 300, width: 250 }}
              />
            </Grid>
            <Grid item sx={item} md={6}>
              <Box
                style={{
                  mt: 1,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 20 }} align="center">
                  <br />
                  <br />
                  {`“I love this service. I have rented few times over the years and all the host have been fabulous. I love the fact that I can easily book right from the comfort of my home.”`}
                </Typography>
              </Box>
              <Rating value={4} readOnly />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            mb={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid item sx={item} md={6}>
              <Box
                component="img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQynay76eEh4mXiTomnEpDdArGY6b2VSs_CYw&usqp=CAU"
                alt="suitcase"
                sx={{ height: 300, width: 250 }}
              />
            </Grid>
            <Grid item sx={item} md={6}>
              <Box
                style={{
                  mt: 1,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 20 }} align="center">
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
