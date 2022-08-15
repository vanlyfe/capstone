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
  const [userDetails, setUserDetails] = useState([]);

  // using this as an alternative to test the submit button
  const [order_id, setOrder_id] = useState(null);

  let { id } = useParams();

  // fetches the car details
  useEffect(() => {
    const makeAPIcalls = async () => {
      const fetchCarDetails = async () => {
        const { data, error } = await apiClient.fetchListingById(id);
        //console.log("car details data", data.listing[0]);
        if (data) {
          setCarDetails(data.listing[0]);
          setIsUser(data.listing[0].user_id === user.id);
          console.log("car details", carDetails);
        }
      };

      //fetch reviews

      const fetchCarReviews = async () => {
        const { data, error } = await apiClient.getReviewsForListing(id);
        console.log("data car reviews", data);

        if (data) {
          setCarReviews(data.reviews);
          // console.log("car review", carReviews);
        }
      };

      //Fetches the reviewrs

      fetchCarDetails();

      fetchCarReviews();
    };

    makeAPIcalls();
  }, []);

  useEffect(() => {
    const fetchHostDetails = async () => {
      const user_id = carDetails.user_id;

      const { data, error } = await apiClient.fetchUserFromId(user_id);
      // console.log("set host id : ", host_id);

      if (data) {
        setHostDetails(data.user);
        setUserDetails(user);
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

  //const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  //const [isLoading, setIsLoading] = useState(false);
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

    //const order_id = data.order[0].id;
    setOrder_id(data.order[0].id);
    navigate(`/orderconfirmation/${id}/${order_id}`);
  };

  // console.log("host id", hostDetails.id);
  //console.log("User id", userDetails.id);

  const handleOnClick = () => {
    navigate(`/confirm/${id}/${order_id}`);
  };

  return (
    <Box>
      <Grid
        sx={{
          display: "flex",
          width: "100vw",
          height: 1100,
          //bgcolor: "red",
          flexDirection: "column",
          //alignItems: "center",
          //justifyContent: "center",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              //bgcolor: "yellow",
              ml: 1,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", mt: 5 }}>
              <Typography
                sx={{
                  fontFamily: "sans-serif",
                  color: "#1e1e1f",
                  fontWeight: 300,
                  fontSize: 20,
                  ml: 5,
                  mr: 5,
                }}
              >
                {carDetails.location}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  ml: 20,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Arial",
                    color: "#1d3557",

                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  {carReviews.length} Reviews
                </Typography>
                <Rating value={carDetails.rating || 0} readOnly={true} />
              </Box>
            </Box>

            <Box
              component="img"
              // height="400"
              //width="600"
              //image={carDetails.image_url}
              //image="https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dm9sa3N3YWdlbiUyMHZhbnxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="car image"
              sx={{
                height: 400,
                width: 600,
                //maxHeight: { xs: 233, md: 167 },
                //maxWidth: { xs: 350, md: 250 },
                mt: 5,
              }}
              src={carDetails.image_url}
            />

            <Box sx={{ display: "flex", flexDirection: "row", mt: 5 }}>
              <Typography
                sx={{
                  //fontFamily: "Chalkduster, fantasy",
                  //color: "003049",
                  //fontWeight: 600,
                  //fontSize: 40,

                  fontWeight: 600,
                  fontSize: 20,
                  ml: 5,
                }}
              >
                ${carDetails.price}/Night
              </Typography>{" "}
              <Typography
                sx={{
                  fontFamily: "Arial",
                  color: "#343a40",

                  fontWeight: 600,
                  fontSize: 15,
                  ml: 10,
                }}
              >
                {carDetails.model}
              </Typography>{" "}
              <Typography
                sx={{
                  fontFamily: "Arial",
                  color: "#bbd0ff",

                  fontWeight: 600,
                  fontSize: 15,
                  ml: 10,
                }}
              >
                Sleeps {carDetails.max_accomodation}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "50%", mr: 1 }}>
            <MoreImages />
          </Box>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: " row",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: " column",
              width: "50%",
              //alignItems: "center",
              //justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontSize: 25,
                  mt: 3,
                  ml: 3,
                  mb: 3,
                  //color: "white",
                  align: "center",
                }}
              >
                Contact Host
              </Typography>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                    ml: 2,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    //src="/static/images/avatar/1.jpg"
                    src={hostDetails.image_url}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/user/" + hostDetails.id);
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: 20,
                      mt: 1,
                      ml: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/user/" + hostDetails.id);
                    }}
                  >
                    {hostDetails.firstname + " " + hostDetails.lastname}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                    ml: 5,
                  }}
                >
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
                  <Rating name="read-only" value={3} readOnly />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                    ml: 5,
                  }}
                >
                  <LocalPhoneIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 5 }}
                  >
                    {hostDetails.phone
                      ? hostDetails.phone
                      : "Phone Number Unavailable"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                    ml: 5,
                  }}
                >
                  <MailOutlineIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 5 }}
                  >
                    {hostDetails.email}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 3 }}
                  onClick={() => {
                    navigate("/user/" + hostDetails.id);
                  }}
                >
                  View host
                </Button>
              </Box>
            </Box>
            <Box sx={{ mt: 10 }}>
              <Box>
                <Typography
                  sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}
                >
                  Includes:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                    ml: 5,
                  }}
                >
                  <WifiIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 5 }}
                  >
                    Free Wifi
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                    ml: 5,
                  }}
                >
                  <CameraAltIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 5 }}
                  >
                    Backup Camera
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                    ml: 5,
                  }}
                >
                  <AirlineSeatIndividualSuiteIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 5 }}
                  >
                    Set of linen
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                    ml: 5,
                  }}
                >
                  <CalendarTodayIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 5 }}
                  >
                    Free Cancellation for 24 hours
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {!isUser ? (
            <Paper
              elevation={3}
              sx={{
                mr: 3,
                display: "flex",
                flexDirection: " column",
                width: "40%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* //  <Paper elevation ={3}> */}
              <Typography
                sx={{
                  fontSize: 25,
                  mt: 2,
                  ml: 3,
                  //color: "white",
                  align: "center",
                  padding: "2em",
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
                    mt: 3,

                    mb: 3,
                    color: "red",
                    align: "center",
                  }}
                >
                  {errors.guests && (
                    <span className="error">{errors.guests}</span>
                  )}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    //type="number"
                    sx={{ width: "100%" }}
                    name="numGuests"
                    label="Number of guests"
                    //variant="filled"
                    onChange={handleOnInputChange}
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                    type="number"
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    //inputProps={{ type: "number" }}
                  />
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

                      <DateIn
                        dateInValue={dateInValue}
                        setDateInValue={setDateInValue}
                        errors={errors}
                        setErrors={setErrors}
                      />
                    </Box>

                    <Box sx={{ mt: 1, ml: 3 }}>
                      <Typography sx={{ mt: 1, ml: 1, mb: 1 }}>
                        Check Out:
                      </Typography>
                      <DateOut
                        dateOutValue={dateOutValue}
                        setDateOutValue={setDateOutValue}
                        errors={errors}
                        setErrors={setErrors}
                      />
                    </Box>
                  </Box>
                </Box>

                {errors.form && (
                  <span className="listingError">{errors.form}</span>
                )}

                <Button
                  variant="contained"
                  size="medium"
                  sx={{ mt: 1, ml: 2, mr: 2 }}
                  //component={Link}
                  //to={user ? `/orderconfirmation/${id}/${order_id}` : "/login"}
                  color="inherit"
                  onClick={handleOnSubmit}
                  disabled={!numGuests || !dateInValue || !dateOutValue}
                >
                  Submit Request
                </Button>

                <Button
                  component={Link}
                  to="/listings"
                  color="inherit"
                  sx={{ mt: 10 }}
                >
                  Back to Listings
                </Button>
              </Box>
              {/* //</Paper> */}
            </Paper>
          ) : null}
        </Grid>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          flexDirection: " column",
          //alignContent: "center",
          //alignItems: "center",
          //justifyContent: "center",
          width: "100vw",
          // alignContent: "center",
          // height: 800,
          pb: 10,
          mt: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: " column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 25,
              mt: 3,
              ml: 3,
              //color: "white",
            }}
          >
            Reviews
          </Typography>
        </Box>

        {/*map all the reviews related to the selected listing*/}

        {carReviews?.length > 0
          ? carReviews.map((review, idx) => {
              return (
                <Paper
                  elevation={3}
                  sx={{
                    height: 200,
                    width: "80%",
                    mt: 3,
                    ml: 3,
                    bgcolor: "white",
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
                    <Avatar
                      alt="Remy Sharp"
                      src={review.image_url}
                      //src="/static/images/avatar/1.jpg"
                      // sx={{ width: 200, height: 200 }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 20,
                        mt: 1,
                        ml: 2,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/user/" + review.id);
                      }}
                    >
                      {review.firstname + " " + review.lastname}
                    </Typography>
                  </Grid>
                  <Typography sx={{ mt: 2, ml: 2 }}>{review.review}</Typography>
                  <Divider />
                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <ThumbUp sx={{ fontSize: 20, ml: 3, mt: 2 }} />
                    <Typography sx={{ fontWeight: 550, mt: 2, ml: 2 }}>
                      Helpful
                    </Typography>
                  </Grid>
                </Paper>
              );
            })
          : ""}
      </Grid>{" "}
    </Box>
  );
}
