import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {

  Typography,

  Button,
  Box,
  Grid,

  List,
  ListItem,

  ListItemText,

} from '@mui/material';

//services
import apiClient from '../services/apiClient';
// my imports

//import DatePicker from "./DatePicker";
//import DateRange from "./DateIn";

// table imports

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';

export default function OrderConfirmation({ user }) {
  const [order, setOrder] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [carDetails, setCarDetails] = useState([]);
  let { id, order_id } = useParams();

  const startDate = order.startdate;
  const endDate = order.enddate;

  useEffect(() => {
    const fetchCarDetails = async () => {
      const { data, error } = await apiClient.fetchListingById(id);

      if (data) {
        setCarDetails(data.listing[0]);
        //setPrice(data.listing.price)
      }
    };

    fetchCarDetails();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user_id = order.user_id;

      if (user_id) {
        const { data, error } = await apiClient.fetchUserFromId(user_id);

        if (data) {
          setUserDetails(data.user);
        }
      }
    };

    fetchUserDetails();
  }, [order]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (order_id && user) {
        const res = await apiClient.fetchOrder(order_id);

        if (res?.data?.order) {
          setOrder(res.data.order[0]);
        }
      }
    };

    fetchOrderDetails();
  }, [user]);

  const fees = carDetails?.fees ? carDetails.fees : 0;

  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return Number(diffInDays);
  }

  const days = order && order.startdate && order.enddate &&  getNumberOfDays(order.startdate, order.enddate);

  return (
    <Box
      sx={{
        height: 900,
        mt: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Grid sx={{ width: '60%', height: '100%' }}>
        <Box>
          <Typography
            sx={{
              color: '#1e1e1f',
              fontWeight: 300,
              fontSize: 20,
            }}>
            Thank you {userDetails.firstname}, your request has been sent
            successfully!
          </Typography>
        </Box>
        <Box sx={{ justifyContent: 'right' }}>
          <Button
            variant="contained"
            size="medium"
            component={Link}
            to={`/order/${order_id}/edit`}
            sx={{ mt: 2, ml: 2, mr: 2 }}>
            Edit Order
          </Button>
        </Box>
        <Box>
          <List
            sx={{ width: '100%', bgcolor: '#e1e9f0' }}
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Renter Details
              </ListSubheader>
            }>
            <ListItem>
              <ListItemText
                primary={
                  'NAME:' +
                  ' ' +
                  userDetails.firstname +
                  ' ' +
                  userDetails.lastname
                }
              />
            </ListItem>
            {/* <ListItem>
              <ListItemText primary="PHONE NUMBER: 7737549759" />
            </ListItem> */}
            <ListItem>
              <ListItemText primary={'EMAIL:' + ' ' + userDetails.email} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`DATES: ${
                  startDate &&
                  endDate &&
                  `${
                    new Date(order.startdate).getMonth() +
                    1 +
                    '/' +
                    new Date(order.startdate).getDate() +
                    '/' +
                    new Date(order.startdate).getFullYear() +
                    '-' +
                    (new Date(order.enddate).getMonth() + 1) +
                    '/' +
                    new Date(order.enddate).getDate() +
                    '/' +
                    new Date(order.startdate).getFullYear()
                  }`
                }`}
              />
            </ListItem>
          </List>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Order Details
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{`Price/Night`}</TableCell>
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
                    {order &&
                      Number(fees) &&
                      Number(order.total) &&
                      Number(order.taxes) &&
                      fees &&
                      order?.total &&
                      order.taxes &&
                      Math.round((order.total - order.taxes - fees) * 100) /
                        100}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax and fees</TableCell>
                  <TableCell align="right">
                    $
                    {order &&
                      Number(order.taxes) &&
                      Number(fees) &&
                      Math.round((order.taxes + fees) * 100) / 100}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell align="right">${order.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Button
            variant="contained"
            size="medium"
            component={Link}
            to="/listings"
            sx={{ mt: 2, ml: 2, mr: 2 }}>
            Continue Lyfeing
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
