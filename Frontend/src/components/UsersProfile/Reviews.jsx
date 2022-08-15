import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Paper,
  Grid,
  Typography,
  Divider,
  Avatar,
  Rating,
  Button,
} from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import apiClient from "../../services/apiClient";

export default function Reviews(props) {
  let { id } = useParams();
  const [error, setError] = React.useState();
  const [reviews, setReviews] = React.useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const response = await apiClient.getReviewsForUser(id);

      if (response?.data?.reviews[0]?.review) {
        setReviews(response.data.reviews);
      } else {
        setError("No reviews yet");
      }
    };

    getReviews();
  }, []);
  return (
    <Box
      sx={{
        mt: 1,
        height: "70%",
        width: "100%",
        mt: 1,
      }}
    >
      <Box>
        <Button variant="text" sx={{ mt: 2, mb: 2, ml: 2 }}>
          Reviews
        </Button>
        <Button
          variant="contained"
          href="/listings"
          sx={{ mt: 2, mb: 2, ml: 2 }}
        >
          Browse Listing
        </Button>

        <Typography variant="h6" sx={{ mt: 2, mb: 2, ml: 5 }}>
          {error}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {reviews
          ? reviews.map((rev, i) => (
              <Paper
                key={i}
                elevation={3}
                sx={{
                  height: 200,
                  width: 800,
                  mt: 3,
                  ml: 3,
                  bgcolor: "white",
                }}
              >
                <Rating
                  name="user-rating"
                  sx={{ mt: 2, ml: 2 }}
                  value={rev.rating}
                  readOnly
                />

                <Grid
                  sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}
                >
                  <Avatar src={rev.image_url} alt="profile picture" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: 1,
                      ml: 2,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                      {rev.firstname} {rev.lastname}
                    </Typography>
                  </Box>
                </Grid>
                <Typography sx={{ mt: 2, ml: 3 }}>{rev.review}</Typography>
                <Divider />
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
                  <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
                    Helpful
                  </Typography>
                </Grid>
              </Paper>
            ))
          : error}
      </Box>
    </Box>
  );
}
