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
  const [value, setValue] = React.useState(null);
  const [popupError, setPopupError] = React.useState(null);
  const [listingId, setListingId] = React.useState(null);

  const handleOpen = () => setOpen(true);

  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState();
  const [reviewText, setReviewText] = useState(null);
  const [ratingInput, setRatingInput] = useState(null);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    setListingId(null);
    setPopupError(null);
    setRatingInput(null), setReviewText(null);
  };

  const [form, setForm] = useState({
    firstname: null,
    id: null,
    image_url: null,
    lastname: null,
    listing_id: null,
    rating: 0,
    review: "",
  });

  useEffect(() => {
    const getData = async () => {
      const resData = await apiClient.fetchUserPastOrders(id);
      const res = await apiClient.fetchUserListings(id);

      if (resData?.data?.orders) {
        setOrders(resData.data.orders);
        setReview(resData.data.orders);
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

  // const handleOnClick = () => {
  //   navigate("/listing/" + listings[0].id);
  // };

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

  function handleOnInputChange(event) {
    if (event.target.name === "ratingInput") {
      setRatingInput(event.target.value);
    }

    if (event.target.name === "reviewText") {
      setReviewText(event.target.value);
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  }

  const handleOnSubmit = async () => {
    setPopupError(null);
    console.log(ratingInput);
    if (!ratingInput) {
      setPopupError("Must provide rating");
    } else {
      if (reviewText && reviewText.length > 0) {
        const reviewData = await apiClient.postReview(listingId, {
          review: reviewText,
        });

        if (reviewData.error) {
          setPopupError(reviewData.error);
        }
      }

      const ratingData = await apiClient.postRating(listingId, {
        rating: ratingInput,
      });

      if (ratingData.error) {
        setPopupError(ratingData.error);
      }

      if (!ratingData.error) {
        setOpen(false);
      }
    }
  };

  // export function ReviewCharacterCount({ textLength }) {
  //   return (
  //     <Typography
  //       className={textLength > 140 ? "Review-length red" : "Review-length"}
  //     >
  //       {textLength > 0 ? 140 - textLength : ""}{" "}
  //     </Typography>
  //   );
  // }

  return (
    <Grid
      sx={{
        mt: 1,
        bgcolor: "##8cbfed",
        height: "70%",
        width: { xs: "100%", md: "70%" },
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
        <TableContainer component={Paper} elevation={5}>
          <Table sx={{ minWidth: 140 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Post Date</TableCell>

                <TableCell align="center">Check in </TableCell>
                <TableCell align="center"> Check out</TableCell>

                <TableCell align="center">Number of Guests</TableCell>
                <TableCell align="center">Price</TableCell>

                <TableCell align="center">Rating</TableCell>
              </TableRow>
            </TableHead>
            {orders.length > 0 ? (
              orders.map((row, i) => (
                <TableBody
                  key={i}
                  sx={{
                    borderBottom: "rgba(224, 224, 224, 1) 1px solid",
                    borderTop: "none",
                  }}
                >
                  <TableRow
                    key={row.id}
                    hover={true}
                    onClick={() => {
                      navigate(
                        "/orderconfirmation/" + row.listing_id + "/" + row.id
                      );
                    }}
                  >
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      sx={{
                        borderBottom: "none",
                        borderTop: "none",
                      }}
                    >
                      {new Date(row.createdat).getFullYear() +
                        "-" +
                        (new Date(row.createdat).getMonth() + 1) +
                        "-" +
                        new Date(row.createdat).getDate()}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: "none",
                        borderTop: "none",
                      }}
                    >
                      {new Date(row.startdate).getFullYear() +
                        "-" +
                        (new Date(row.startdate).getMonth() + 1) +
                        "-" +
                        new Date(row.startdate).getDate()}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: "none",
                        borderTop: "none",
                      }}
                    >
                      {new Date(row.enddate).getFullYear() +
                        "-" +
                        (new Date(row.enddate).getMonth() + 1) +
                        "-" +
                        new Date(row.enddate).getDate()}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: "none",
                        borderTop: "none",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Group />
                        &nbsp;{row.guests}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: "none",
                        borderTop: "none",
                      }}
                    >
                      ${row.total}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: "none",
                        borderTop: "none",
                      }}
                    >
                      <Box
                        align="right"
                        sx={{
                          textDecoration: "none",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Rating value={row.rating} readOnly={true}/>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      <Button>
                        <Link
                          sx={{
                            textDecoration: "none",
                            cursor: "pointer",

                            color: "#6E85B7",
                          }}
                          onClick={() => {
                            setOpen(true);
                            setListingId(row.listing_id);
                          }}
                        >
                          Add Review
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={12}>No Past Orders</TableCell>
                </TableRow>
              </TableBody>
            )}
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
                {popupError && <span className="popupError">{popupError}</span>}
                <Typography>Share your experience to help others</Typography>

                <Rating
                  name="ratingInput"
                  onChange={handleOnInputChange}
                  type="number"
                />
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Describe your experience"
                  style={{ width: 500, height: 100 }}
                  onChange={handleOnInputChange}
                  name="reviewText"
                />

                <Grid>
                  <Typography>
                    Your review will be posted publicly on the web.
                  </Typography>

                  <Grid sx={{ ml: 40 }}>
                    <Button onClick={handleOnSubmit}> Post</Button>
                    <Button onClick={handleClose} sx={{ ml: 4 }} color="error">
                      CANCEL
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}
