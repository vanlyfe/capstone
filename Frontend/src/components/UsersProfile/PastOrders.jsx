import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const [listings, setListings] = useState(null);
  let { id } = useParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState();
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const getData = async () => {
      const resData = await apiClient.fetchUserListings(id);
      console.log("res: ", resData.data);
      if (resData?.data?.listings) {
        setListings(resData.data.listings);
      } else {
        setError("No Listings yet");
      }
    };

    getData();
  }, []);

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

      <Box sx={{ height: 400, width: "100%", mt: 1, ml: 1 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 140 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Vehicle Model</TableCell>

                {/* <TableCell align="right">Check in </TableCell>
                <TableCell align="right"> Check out</TableCell> */}
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Post Date</TableCell>

                <TableCell align="right">Number of Guests</TableCell>
                <TableCell align="right">Price</TableCell>

                <TableCell align="center">Reviews</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listings
                ? listings.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      hover={true}
                      // onClick = {handleOnClick}
                    >
                      <TableCell component="th" scope="row">
                        {row.model}
                      </TableCell>
                      {/* <TableCell align="right">l{row.getStartDate}</TableCell>
                      <TableCell align="right">{row.getEndDate}</TableCell> */}
                      <TableCell align="right">{row.location}</TableCell>
                      <TableCell align="right">{row.createdat}</TableCell>

                      <TableCell align="right">
                        {" "}
                        <Group /> {row.max_accomodation}{" "}
                      </TableCell>
                      <TableCell align="right">${row.price}</TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          textDecoration: "none",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Rating value={row.rating} />
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
                            <Typography>
                              Share your experience to help others
                            </Typography>
                            {/* <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              Duis mollis, est non commodo luctus, nisi erat
                              porttitor ligula.
                            </Typography> */}
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
                              {/* <ReviewCharacterCount
                                textLength={reviewText.length}
                              /> */}
                              {/* <ReviewSubmitButton
                                handleOnSubmit={handleOnSubmit}
                              /> */}
                              <Button
                                onClick={handleClose}
                                sx={{ ml: 4, color: "#669bbc" }}
                              >
                                CANCEL
                              </Button>
                            </Grid>
                          </Box>
                        </Modal>
                      </TableCell>
                    </TableRow>
                  ))
                : error}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}
