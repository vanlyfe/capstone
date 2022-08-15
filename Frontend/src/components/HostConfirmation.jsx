import React, { useEffect, useState } from "react";
import {
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Link,
  Box,
  Button,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import apiClient from "../services/apiClient";
import ListSubheader from "@mui/material/ListSubheader";
import OrderConfirmation from "./OrderConfirmation";

export default function HostConfirmation(props) {
  const [order, setOrder] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [carDetails, setCarDetails] = useState([]);

  let { id, order_id } = useParams();

  // useEffect(() => {
  //   console.log("order id", order_id);
  //   const fetchOrderDetails = async () => {
  //     const res = await apiClient.fetchOrder(order_id);
  //     console.log("order data", res);
  //     if (res.data.order) {
  //       console.log("setting order", res.data.order);
  //       setOrder(res.data.order[0]);
  //       //setPrice(data.listing.price)
  //     }
  //   };

  //   fetchOrderDetails();

  //   console.log("order", order);
  // }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user_id = order.user_id;

      const { data, error } = await apiClient.fetchUserFromId(user_id);
      console.log(" host iddata ", data);

      if (data) {
        setUserDetails(data.user);

        //console.log("host details", hostDetails);
      }
    };

    fetchUserDetails();
  }, [order]);

  console.log(" user detailsa ", userDetails);

  //console.log("set order", order.order[0].user_id);

  useEffect(() => {
    const fetchCarDetails = async () => {
      const { data, error } = await apiClient.fetchListingById(id);
      console.log("car details data", data.listing[0]);
      if (data) {
        setCarDetails(data.listing[0]);
        //setPrice(data.listing.price)
        console.log("car details", carDetails);
      }
    };
    fetchCarDetails();
  }, []);

  const fees = carDetails.fees ? carDetails.fees : 0;

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

  const days = getNumberOfDays(order.startdate, order.enddate);

  console.log("new date", new Date(order.startdate).getDate());

  const handleOnConfirm = () => {};
  const handleOnAccept = () => {};

  return (
    <Box>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          padding: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
        }}
      >
        {/* <Link >
          <ArrowBackIcon
            className="arrowBack"
            sx={{ fontSize: 40, width: 100, height: 40, mr: 100 }}
          />
        </Link> */}
        <Button
          // variant="contained"
          color="success"
          sx={{ width: 100, height: 40 }}
          // onChange={handleOnAccept}
        >
          Accept
        </Button>
        <Button
          //variant="contained"
          color="error"
          sx={{ width: 100, height: 40, ml: 2 }}
          // onChange={handleOnDecline}
        >
          Decline
        </Button>
        <Button></Button>
      </Box>
      <Grid>
        <Box sx={{ width: "90%", ml: 5 }}>
          <Typography
            sx={{
              width: "100%",
              bgcolor: "secondary.light",

              padding: 3,
              fontWeight: 600,
              fontSize: 25,
            }}
          >
            order # {userDetails.firstname}
          </Typography>
        </Box>

        <Box sx={{ width: "90%", ml: 5 }}>
          <List>
            <ListItem>
              <ListItemText
                primary={userDetails.firstname + " " + userDetails.lastname}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={".. " + userDetails.email} />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  new Date(order.startdate).getMonth() +
                  "/" +
                  new Date(order.startdate).getDate() +
                  "/" +
                  new Date(order.startdate).getFullYear() +
                  "-" +
                  new Date(order.enddate).getMonth() +
                  "/" +
                  new Date(order.enddate).getDate() +
                  "/" +
                  new Date(order.startdate).getFullYear()
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={"Order sent " + userDetails.email} />
              {/* order sent */}
            </ListItem>
          </List>
        </Box>
        <Box>
          <TableContainer
            component={Paper}
            sx={{ mb: 15, width: "90%", ml: 5 }}
          >
            <Table sx={{ minWidth: 300 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>{order.model}</TableCell>
                  <TableCell align="right">${order.total}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* <TableRow>
                  <TableCell>Price/Night</TableCell>
                  <TableCell align="right">${carDetails.price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>No of guests</TableCell>
                  <TableCell align="right">{order.guests}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>No of Nights</TableCell>
                  <TableCell align="right">{days}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell align="right">
                    $
                    {Math.round((order.total - order.taxes - fees) * 100) / 100}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax and fees</TableCell>
                  <TableCell align="right">
                    ${Math.round((order.taxes + fees) * 100) / 100}
                  </TableCell>
                </TableRow> */}
                <TableRow sx={{ height: 100 }}>
                  <TableCell>Total</TableCell>
                  <TableCell align="right">${order.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Box>
  );
}
