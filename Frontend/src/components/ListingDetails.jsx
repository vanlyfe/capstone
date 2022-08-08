import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Box,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Collapse,
  IconButton,
  CardContent,
  Avatar,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { ThumbUp } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// my imports
import DatePicker from "./DatePicker";
// used the separate calendars is instead of the datepicker
import DateIn from "./DateIn";

import DateOut from "./DateOut";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import apiClient from "../services/apiClient";

import { useState } from "react";
import { useParams } from "react-router-dom";
import Login from "./Login";

export default function ListingDetails({ user }) {
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState([]);
  const [hostDetails, setHostDetails] = useState([]);

  const [carReviews, setCarReviews] = useState([]);
  const [reviewerDetails, setReviewerDetails] = useState([]);
  const [dateInValue, setDateInValue] = useState("");
  const [dateOutValue, setDateOutValue] = useState("");
  const [numGuests, setNumGuests] = useState("");

  let { id } = useParams();

  console.log("product id ", id);

  // fetches the car details
  useEffect(() => {
    const makeAPIcalls = async () => {
      const fetchCarDetails = async () => {
        const { data, error } = await apiClient.fetchListingById(id);
        console.log("car details data", data.listing[0]);
        if (data) {
          setCarDetails(data.listing[0]);
          //setPrice(data.listing.price)
          console.log("car details", carDetails);
        }
      };

      //fetch reviews

      const fetchCarReviews = async () => {
        const { data, error } = await apiClient.getReviewsForListing(id);
        console.log("data car reviews", data);

        if (data) {
          setCarReviews(data.reviews);
          // console.log("review", carReviews);

          console.log("car review", carReviews);
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
      console.log(" host iddata ", data);

      if (data) {
        setHostDetails(data.user);

        //console.log("host details", hostDetails);
      }
    };

    fetchHostDetails();
  }, [carDetails]);

  console.log(" user detailsa ", hostDetails);

  useEffect(() => {
    const fetchReviewerDetails = async () => {
      const reviewer_id = carReviews[0].user_id;
      console.log("reviewer_id", reviewer_id);
      const { data, error } = await apiClient.fetchUserFromId(reviewer_id);
      console.log("data reviewer_id", data);
      if (data) {
        setReviewerDetails(data.user);
        //setPrice(data.listing.price)

        console.log("reviewer details ", reviewerDetails);
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
  const total = Math.round((roundTaxes + roundSubTotal) * 100) / 100;

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
      console.log("text input value", e.target.value);
      setNumGuests(e.target.value);
      if (
        (e.target.value != "" && isNaN(e.target.value)) ||
        e.target.value == "e" ||
        e.target.value == "-"
      ) {
        console.log("is NAN", isNaN(e.target.value));
        setErrors((e) => ({
          ...e,
          guests: "Please enter a number.",
        }));
      }
      if ((e.target.value != "" && e.target.value > 5) || e.target.value < 1) {
        setErrors((e) => ({
          ...e,
          guests: "Please enter a value between 1 and 5.",
        }));
      } else {
        setErrors((e) => ({ ...e, guests: null }));
        setNumGuests(e.target.value);
      }
    }

    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // function validate(value) {
  //   if ((value != "" && isNaN(value)) || value == "e" || value == "-") {
  //     console.log("is NAN", isNaN(value));
  //     setErrors((e) => ({
  //       ...e,
  //       guests: "Please enter a number.",
  //     }));
  //   }

  //   if ((value != "" && value > 5) || value < 1) {
  //     setErrors((e) => ({
  //       ...e,
  //       guests: "Please enter a value between 1 and 5.",
  //     }));
  //   } else {
  //     setErrors((e) => ({ ...e, guests: null }));
  //   }

  // };

  // useEffect(() => {

  //   validate(numGuests);

  // }, [numGuests]);

  const handleOnSubmit = async () => {
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.postOrder(
      {
        taxes: taxes,
        total: total,
        guests: form.guests,
        startDate: date_in,
        endDate: date_out,
      },
      1
    );
    ``;

    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }

    console.log("posted data", data);
    console.log("posted data id", data.order[0].id);

    const order_id = data.order[0].id;

    navigate(user ? `/orderconfirmation/${id}/${order_id}` : "/login");
    //{user ? `/orderconfirmation/${id}/${order_id}` : "/login"}
  };

  return (
    <Box>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "rows",
          width: "100vw",
          height: 900,
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
          }}
        >
          <Card sx={{ width: "100%", maxWidth: "100%" }}>
            {/* <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  V
                </Avatar>
              }
              title= {hostDetails.firstname + " " + hostDetails.lastname} 
              //subheader="September 14, 2021"
            /> */}
            <CardMedia
              component="img"
              height="400"
              image={carDetails.image_url}
              //image="https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dm9sa3N3YWdlbiUyMHZhbnxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="Paella dish"
            />
            <CardContent sx={{ display: "flex", flexDirection: "row" }}>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "sans-serif",
                    color: "#1e1e1f",
                    fontWeight: 300,
                    fontSize: 20,
                  }}
                >
                  {carDetails.location}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
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
                  <Rating value={carDetails.rating || 0} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Chalkduster, fantasy",
                    color: "003049",
                    fontWeight: 600,
                    fontSize: 40,
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
                  }}
                >
                  Sleeps {carDetails.max_accomodation}
                </Typography>
              </Box>
              <Box>
                <BookmarkSharpIcon sx={{ justify: "end" }} />
              </Box>
            </CardContent>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontSize: 25,
                  mt: 3,
                  ml: 20,
                  //color: "white",
                  align: "center",
                }}
              >
                Contact Host
              </Typography>

              <Box>
                <Box
                  sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    //src="/static/images/avatar/1.jpg"
                    src={hostDetails.image_url}
                    // sx={{ width: 200, height: 200 }}
                  />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}
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
                  sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 5 }}
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
                  sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 5 }}
                >
                  <MailOutlineIcon />
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 12, mt: 1, ml: 5 }}
                  >
                    {hostDetails.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>{" "}
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: " column",
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 25,
              mt: 3,
              ml: 3,
              //color: "white",
              align: "center",
            }}
          >
            Request This Listing
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              type="number"
              name="numGuests"
              label="Number of guests"
              //variant="filled"
              onChange={handleOnInputChange}
              value={numGuests}
              // InputLabelProps={{
              //   shrink: true,
              // }}
              inputProps={{ type: "number" }}
            />
          </Box>

          <Box sx={{ mb: 20 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ mt: 10, ml: 10 }}>
                <Typography>From:</Typography>

                <DateIn
                  dateInValue={dateInValue}
                  setDateInValue={setDateInValue}
                />
              </Box>

              <Box sx={{ mt: 10, ml: 15 }}>
                <Typography>To:</Typography>
                <DateOut
                  dateOutValue={dateOutValue}
                  setDateOutValue={setDateOutValue}
                />
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="medium"
            sx={{ mt: 2, ml: 2, mr: 2 }}
            //component={Link}
            //to={user ? `/orderconfirmation/${id}/${order_id}` : "/login"}
            //to="/orderconfirmation"
            color="inherit"
            onClick={handleOnSubmit}
          >
            Submit Request
          </Button>
          {/* </Box> */}

          <Button
            component={Link}
            to="/listings"
            color="inherit"
            sx={{ mt: 10 }}
          >
            Back to Listings
          </Button>
        </Grid>
      </Grid>
      <Grid
        sx={{
          bgcolor: "#73777B",
          display: "flex",
          flexDirection: " column",
          //alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          alignContent: "center",
          // height: 800,
          pb: 10,
        }}
      >
        <Typography
          sx={{
            fontSize: 25,
            mt: 3,
            ml: 3,
            color: "white",
            align: "center",
          }}
        >
          Reviews
        </Typography>
        {/*map all the reviews related to the selected listing*/}

        {carReviews?.length > 0
          ? carReviews.map((review, idx) => {
              return (
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
                    value={review.rating}
                    readOnly
                  />
                  <Grid
                    sx={{ display: "flex", flexDirection: "row", mt: 1, ml: 2 }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={review.image_url}
                      //src="/static/images/avatar/1.jpg"
                      // sx={{ width: 200, height: 200 }}
                    />
                    <Typography
                      sx={{ fontWeight: 600, fontSize: 20, mt: 1, ml: 2 }}
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
                </Box>
              );
            })
          : ""}
      </Grid>
    </Box>
  );
}
