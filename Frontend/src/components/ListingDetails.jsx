import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Avatar,
  Rating,
  Divider,
  TextField,
  Container,
  Tooltip,
} from "@mui/material";

import { ArrowBack, ConstructionOutlined, ThumbUp } from "@mui/icons-material";
// my imports

// used the separate calendars is instead of the datepicker
// the following represent imported components
import DateIn from "./DateIn";
import MoreImages from "./MoreImages";
import DateOut from "./DateOut";

//icons used in the host and includes segments

import WifiIcon from "@mui/icons-material/Wifi";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import apiClient from "../services/apiClient";

import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ListingDetails({ user }) {
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState([]);
  const [hostDetails, setHostDetails] = useState([]);
  const [isUser, setIsUser] = useState(false);

  const [carReviews, setCarReviews] = useState([]);
  const [reviewerDetails, setReviewerDetails] = useState([]);
  const [dateInValue, setDateInValue] = useState(null);
  const [dateOutValue, setDateOutValue] = useState(null);
  const [numGuests, setNumGuests] = useState(null);

  // using this as an alternative to test the submit button
  const [order_id, setOrderId] = useState(null);

  let { id } = useParams();

  // fetches the car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      const { data, error } = await apiClient.fetchListingById(id);

      if (data) {
        setCarDetails(data.listing[0]);
        setIsUser(data.listing[0].user_id === user.id);
      }
    };

    //fetch reviews

    const fetchCarReviews = async () => {
      const { data, error } = await apiClient.getReviewsForListing(id);

      if (data) {
        setCarReviews(data.reviews);

        console.log("car review", carReviews);
      }
    };

    //Fetches the reviews

    fetchCarDetails();
    fetchCarReviews();
  }, []);

  useEffect(() => {
    const fetchHostDetails = async () => {
      const user_id = carDetails.user_id;

      const { data, error } = await apiClient.fetchUserFromId(user_id);

      if (data) {
        setHostDetails(data.user);

        //console.log("host details", hostDetails);
      }
    };

    fetchHostDetails();
  }, [carDetails]);

  useEffect(() => {
    const fetchReviewerDetails = async () => {
      const reviewer_id = carReviews[0].user_id;
      const { data, error } = await apiClient.fetchUserFromId(reviewer_id);
      if (data) {
        setReviewerDetails(data.user);
        //setPrice(data.listing.price)
      }
    };

    fetchReviewerDetails();
  }, [carReviews]);

  //CREATE THE FOLLOWING DETAILS TO BE POSTED TO ORDER  ["taxes", "total", "guests", "startDate", "endDate"];

  //CONSTANTS:

  const taxeRate = 0.15;
  const min = 1;
  const max = 10;

  const price = carDetails.price;
  const date_in = dateInValue;
  const date_out = dateOutValue;

  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

  const days = getNumberOfDays(date_in, date_out);

  const subTotal = days * price;
  const roundSubTotal = Math.round(subTotal * 100) / 100;
  const taxes = taxeRate * roundSubTotal;
  const roundTaxes = Math.round(taxes * 100) / 100;
  const fees = carDetails.fees ? carDetails.fees : 0;
  const total = Math.round((roundTaxes + roundSubTotal + fees) * 100) / 100;
  const createdAt = new Date(carDetails.createdat);

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    taxes: 0,
    total: 0,
    guests: 1,
    startDate: null,
    endDate: null,
  });

  const handleOnInputChange = (e) => {
    if (e.target.name === "numGuests") {
      setNumGuests(e.target.value);
    }

    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = async (evt) => {
    setErrors((e) => ({ ...e, form: null }));

    if (!user) {
      navigate("/login");
    }

    const { data, error } = await apiClient.postOrder(
      {
        taxes: taxes,
        total: total,
        guests: numGuests,
        startDate: date_in,
        endDate: date_out,
      },
      id
    );

    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }

    const order_id = data.order[0].id;
    navigate(`/orderconfirmation/${id}/${order_id}`);
  };

  // implementing the load more reviews

  console.log("this is the review array", carReviews);

  const reviewsPerColumn = 3;
  const [next, setNext] = useState(reviewsPerColumn);

  const handleMoreReviews = () => {
    setNext(next + reviewsPerColumn);
  };

  return (
    <Box>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        variant="contained"
        sx={{ position: "absolute", top: 110, left: 15 }}
      >
        <ArrowBack />
      </Button>
      <Container maxWidth="xl">
        <Box
          backgroundColor="secondary.main"
          sx={{
            height: "100%",
            display: isUser ? "flex" : "none",
            alignItems: "center",
            width: "100%",
            height: 150,
            pl: 4,
          }}
        >
          <Typography variant="h5" color="textPrimary" gutterBottom>
            You listed this vehicle
            {createdAt
              ? ` on ${createdAt.getDay()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`
              : ""}
          </Typography>
        </Box>

        <Grid container>
          {/* left info section / image gallery */}
          <Grid container item md={6} xs={12} mt={5} spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                align="center"
                sx={{
                  fontFamily: "sans-serif",
                  color: "#1e1e1f",
                  fontWeight: 300,
                  fontSize: 20,
                }}
              >
                {carDetails.location}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Arial",
                    color: "#1d3557",
                    fontWeight: 600,
                    fontSize: 15,
                    mr: 3,
                  }}
                >
                  {carReviews.length} Reviews
                </Typography>
                <Rating value={carDetails.rating || 0} readOnly={true} />
              </Box>
            </Grid>

            <Grid item md={12}>
              <Box
                sx={{
                  height: 400,
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  alt="car image"
                  sx={{
                    width: "100%",
                    mt: 2,
                  }}
                  src={carDetails.image_url}
                />
              </Box>
            </Grid>
            <Grid item container md={12}>
              <Grid item md={4} xs={4}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  ${carDetails.price}/Night
                </Typography>
              </Grid>
              <Grid item md={4} xs={4}>
                <Typography
                  sx={{
                    fontFamily: "Arial",
                    color: "#343a40",
                    fontWeight: 600,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  {carDetails.make} {carDetails.model}
                </Typography>
              </Grid>
              <Grid item md={4} xs={4}>
                <Typography
                  sx={{
                    fontFamily: "Arial",
                    color: "#bbd0ff",
                    fontWeight: 600,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Sleeps {carDetails.max_accomodation}
                </Typography>
              </Grid>
            </Grid>

            {/* <Box sx={{ width: '50%', mr: 1 }}>
            <MoreImages />
          </Box> */}
          </Grid>

          {/* Right Reserve Listing */}
          <Grid item md={6}>
            <Box
              sx={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 25,
                  mt: 2,
                  align: "center",
                }}
              >
                Reserve This Listing
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: " column",

                  alignItems: "left",
                  justifyContent: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    my: 3,
                    color: "red",
                    align: "center",
                  }}
                >
                  {errors.guests && (
                    <span className="error">{errors.guests}</span>
                  )}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Tooltip
                    title={
                      isUser
                        ? "You cannot book your own listing"
                        : "Enter the number of guests"
                    }
                  >
                    <TextField
                      disabled={isUser}
                      sx={{ width: "100%" }}
                      name="numGuests"
                      label="Number of guests"
                      onChange={handleOnInputChange}
                      InputProps={{ inputProps: { min: 0, max: 10 } }}
                      type="number"
                    />
                  </Tooltip>
                </Box>

                <Box sx={{ mb: 5 }}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      mt: 1,
                      ml: 3,
                      mb: 3,
                      color: "red",
                      align: "center",
                    }}
                  >
                    {errors.endDate && (
                      <span className="error">{errors.endDate}</span>
                    )}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ mt: 1 }}>
                      <Typography sx={{ mt: 1, ml: 1, mb: 1 }}>
                        Check In:
                      </Typography>
                      <Tooltip
                        title={
                          isUser
                            ? "You cannot book your own listing"
                            : "Enter the check in date"
                        }
                      >
                        <Box>
                          <DateIn
                            disabled={isUser}
                            dateInValue={dateInValue}
                            setDateInValue={setDateInValue}
                            errors={errors}
                            setErrors={setErrors}
                          />
                        </Box>
                      </Tooltip>
                    </Box>

                    <Box sx={{ mt: 1, ml: 3 }}>
                      <Typography sx={{ mt: 1, ml: 1, mb: 1 }}>
                        Check Out:
                      </Typography>
                      <Tooltip
                        title={
                          isUser
                            ? "You cannot book your own listing"
                            : "Enter the check out date"
                        }
                      >
                        <Box>
                          <DateOut
                            disabled={isUser}
                            dateOutValue={dateOutValue}
                            setDateOutValue={setDateOutValue}
                            errors={errors}
                            setErrors={setErrors}
                          />
                        </Box>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>

                {errors.form && (
                  <span className="listingError">{errors.form}</span>
                )}
                <Tooltip
                  title={isUser ? "You cannot book your own listing" : ""}
                >
                  <Box width="100%">
                    <Button
                      fullWidth
                      variant="contained"
                      size="medium"
                      sx={{ mt: 1 }}
                      color="inherit"
                      onClick={handleOnSubmit}
                      disabled={
                        isUser || !numGuests || !dateInValue || !dateOutValue
                      }
                    >
                      Submit Request
                    </Button>
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Grid>

          {/* Host Info */}
          <Grid
            container
            item
            columnSpacing={10}
            md={6}
            justifyContent="center"
          >
            <Grid container item md={6} xs={12} spacing={1} mt={1}>
              <Grid container item xs={12}>
                <Grid item xs={6}>
                  <Avatar alt="Host icon" src={hostDetails.image_url} />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={() => {
                      navigate("/user/" + hostDetails.id);
                    }}
                  >
                    {hostDetails.firstname + " " + hostDetails.lastname}
                  </Button>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontFamily: "Arial",
                      color: "#1d3557",
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    25 Reviews
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Rating name="read-only" value={3} readOnly />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={6}>
                  <LocalPhoneIcon />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontWeight: 600, fontSize: 12, mt: 1 }}>
                    {hostDetails.phone
                      ? hostDetails.phone
                      : "Phone Number Unavailable"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={6}>
                  <MailOutlineIcon />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontWeight: 600, fontSize: 12, mt: 1 }}>
                    {hostDetails.email}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 3 }}
                  onClick={() => {
                    navigate("/user/" + hostDetails.id);
                  }}
                >
                  View host
                </Button>
              </Grid>
            </Grid>

            <Grid item md={6} xs={12}>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: 20, mt: 1 }}>
                  Includes:
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}
                >
                  <WifiIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 2 }}
                  >
                    Free Wifi
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}
                >
                  <CameraAltIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 2 }}
                  >
                    Backup Camera
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}
                >
                  <AirlineSeatIndividualSuiteIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 2 }}
                  >
                    Set of linen
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}
                >
                  <CalendarTodayIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 2 }}
                  >
                    Free Cancellation for 24 hours
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid
            item
            md={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 25,
                my: 3,
                ml: 3,
                textAlign: "center",
              }}
            >
              {carReviews?.length > 0 ? "Reviews" : "No Reviews Yet"}
            </Typography>
          </Grid>

          {/*map all the reviews related to the selected listing*/}

          <Grid
            container
            item
            sx={{ width: "90%" }}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {carReviews?.slice(0, next)?.map((review, id) => (
              <Grid item xs={12} sm={4} md={4} key={id}>
                <Paper
                  elevation={3}
                  sx={{
                    bgcolor: "white",
                    m: 2,
                  }}
                >
                  <Rating
                    name="user-rating"
                    sx={{ mt: 2, ml: 2 }}
                    value={review.rating}
                    readOnly
                  />
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: 1,
                      ml: 2,
                    }}
                  >
                    <Avatar alt="Remy Sharp" src={review.image_url} />
                    <Typography
                      sx={{ fontWeight: 600, fontSize: 20, mt: 1, mx: 2 }}
                    >
                      {review.firstname + " " + review.lastname}
                    </Typography>
                  </Grid>
                  <Typography sx={{ my: 2, ml: 2 }}>{review.review}</Typography>
                  <Divider />
                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
                    <Typography sx={{ fontWeight: 550, my: 2, ml: 2 }}>
                      Helpful
                    </Typography>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {next < carReviews?.length && (
              <Button className="mt-4" onClick={handleMoreReviews}>
                Load more
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
