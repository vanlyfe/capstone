import React, { useState, useEffect } from "react";
import {
  Box,
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
  const [value, setValue] = React.useState();
  const [Error, setError] = React.useState();
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState();

  useEffect(() => {
    const getReviews = async () => {
      const response = await apiClient.getReviewsForUser(props.user.id);

      console.log("rating: ", response.data.reviews[0].review);
      console.log("re data: ", response.data);
      console.log("user: ", props.user);

      if (response?.data?.reviews[0].review) {
        setReview(response.data.reviews[0].review);
      } else {
        setError("No reviews yet");
      }
    };

    getReviews();
  }, []);

  return (
    <Grid
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
      </Box>
      <Box
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
          value={value}
          readOnly
        />
        <Grid sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}>
          <Avatar alt="profile picture"> {props.user.image_url}</Avatar>
          <Box sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
              {" "}
              {props.user.firstName}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 20, ml: 1 }}>
              {" "}
              {props.user.lastName}{" "}
            </Typography>
          </Box>
        </Grid>
        <Typography sx={{ mt: 2, ml: 3 }}>{review}</Typography>
        <Divider />
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
          <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
            Helpful
          </Typography>
        </Grid>
      </Box>
      <Box
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
          value={value}
          readOnly
        />
        <Grid sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            // sx={{ width: 200, height: 200 }}
          />
          <Typography sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}>
            Joram Bosir{" "}
          </Typography>
        </Grid>
        <Typography sx={{ mt: 2, ml: 2 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa itaque
          in officiis? Neque, ducimus error! Atque molestias aliquid facere
          animi modi praesentium, illo enim reprehenderit omnis corrupti beatae
          sint voluptate?
        </Typography>
        <Divider />
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
          <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
            Helpful
          </Typography>
        </Grid>
      </Box>
      <Box
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
          value={value}
          readOnly
        />
        <Grid sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            // sx={{ width: 200, height: 200 }}
          />
          <Typography sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}>
            Vernon Owenga
          </Typography>
        </Grid>
        <Typography sx={{ mt: 2, ml: 2 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa itaque
          in officiis? Neque, ducimus error! Atque molestias aliquid facere
          animi modi praesentium, illo enim reprehenderit omnis corrupti beatae
          sint voluptate?
        </Typography>
        <Divider />
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
          <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
            Helpful
          </Typography>
        </Grid>
      </Box>
    </Grid>
  );
}
