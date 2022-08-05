import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Modal,
  Typography,
  TextareaAutosize,
  Rating,
  Button,
} from "@mui/material";
import { Person, Group } from "@mui/icons-material";
import apiClient from "../../services/apiClient";

export default function PastOrders() {
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  let { id } = useParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState();
  const [reviewText, setReviewText] = useState("");
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const resData = await apiClient.fetchUserPastOrders(id);
      const res = await apiClient.fetchUserListings(id);
      console.log("res past orders: ", resData.data);
      if (resData?.data?.orders) {
        setOrders(resData.data.orders);
      } else {
        setError("No orders yet");
      }
      if (res?.data?.listings) {
        setListings(res.data.listings);
      } else {
        setError("No Listings yet");
      }
    };

    getData();
  }, []);

  const handleOnClick = () => {
    navigate("/listing/" + listings[0].id);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [form, setForm] = useState({
    reviewToPost: "",
  });

  // const isDisabled = reviewText.length === 0 || reviewText.length > 140;

  function handleOnReviewTextChange(evt) {
    setReviewText(evt.target.value);
  }

  function handleOnSubmit() {
    let newReview = {
      review: reviewText,
      reviewerId: props.user.id,
      hostId: listingId,
    };
    setReviews(reviews.concat(newReview));

    // setReviewText("");
    setOpen(false);
  }

  // export function ReviewCharacterCount({ textLength }) {
  //   return (
  //     <Typography
  //       className={textLength > 140 ? "Review-length red" : "Review-length"}
  //     >
  //       {textLength > 0 ? 140 - textLength : ""}{" "}
  //     </Typography>
  //   );
  // }

  async function ReviewSubmitButton() {
    // const postedReview = await apiClient.postReview(props.user.id, review);
    // ({
    //   reviewToPost: form.review,
    // });
    // setForm((f) => ({ ...f, reviewText }));
  }

  return (
    <Grid
      sx={{
        mt: 1,
        bgcolor: "##8cbfed",
        height: "70%",
        width: "100%",
        mt: 1,
      }}
    >
      <Box>
        <Button variant="text" sx={{ mt: 2, mb: 2 }}>
          Past Orders
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
          height: 400,
          width: "100%",
          mt: 1,
          ml: 1,
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 140 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Post Date</TableCell>

                <TableCell align="right">Check in </TableCell>
                <TableCell align="right"> Check out</TableCell>

                <TableCell align="right">Number of Guests</TableCell>
                <TableCell align="right">Price</TableCell>

                <TableCell align="center">Ratings</TableCell>
              </TableRow>
            </TableHead>
            {orders.length > 0
              ? orders.map((row) => (
                  <TableBody>
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      hover={true}
                      onClick={handleOnClick}
                    >
                      <TableCell component="th" scope="row">
                        {row.createdat}
                      </TableCell>
                      <TableCell align="right">l{row.startdate}</TableCell>
                      <TableCell align="right">{row.enddate}</TableCell>

                      <TableCell align="right">
                        {" "}
                        <Group /> {row.guests}{" "}
                      </TableCell>
                      <TableCell align="right">${row.total}</TableCell>
                      <TableCell align="center">
                        <Rating value={row.rating} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
              : " No orders yet"}
          </Table>

          {/* <Box
                align="right"
                sx={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              > */}
          <Link
            sx={{
              textDecoration: "none",
              cursor: "pointer",

              color: "#6E85B7",
            }}
            onClick={handleOpen}
          >
            add reviews
          </Link>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ textalign: "center" }}
              >
                Rate and review
              </Typography>
              <Typography>Share your experience to help others</Typography>

              <Rating />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Describe your experience"
                style={{ width: 500, height: 100 }}
                // onChange={handleOnReviewTextChange}
                value={reviewText}
              />

              <Typography>
                Your review will be posted publicly on the web.
              </Typography>

              <Grid sx={{ mt: 2, ml: 40 }}>
                <Button onClick={handleClose} sx={{ ml: 4, color: "#669bbc" }}>
                  CANCEL
                </Button>
              </Grid>
            </Box>
          </Modal>
        </TableContainer>
      </Box>
    </Grid>
  );
}
