import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Rating,
  Button,
} from '@mui/material';
import { Person, Group } from '@mui/icons-material';
import apiClient from '../../services/apiClient';

export default function ActiveOrders() {
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);
  let { id } = useParams();
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const resData = await apiClient.fetchUserActiveOrders(id);
      const res = await apiClient.fetchUserListings(id);
      console.log('res active orders: ', resData.data);

      if (resData?.data?.orders) {
        setOrders(resData.data.orders);
      } else {
        setError('No orders yet');
      }
      if (res?.data?.listings) {
        setListings(res.data.listings);
      } else {
        setError('No Listings yet');
      }
    };

    getData();
  }, []);

  return (
    <Grid
      sx={{
        mt: 1,
        bgcolor: '##8cbfed',
        height: '70%',
        width: { xs: '100%', md: '70%' },
        mt: 1,
        id: 3,
      }}>
      <Box>
        <Button variant="text" sx={{ mt: 2, mb: 2 }}>
          Active Orders
        </Button>
        <Button
          variant="contained"
          href="/listings"
          sx={{ mt: 2, mb: 2, ml: 2 }}>
          Browse Listing
        </Button>
      </Box>

      <Box sx={{ height: 400, width: '100%', mt: 1, ml: 1 }}>
        <TableContainer component={Paper} elevation={5}>
          <Table sx={{ minWidth: 140 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Post Date</TableCell>

                <TableCell align="center">Check in </TableCell>
                <TableCell align="center"> Check out</TableCell>

                <TableCell align="center">Number of Guests</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                    hover={true}
                    onClick={() => {
                      navigate(
                        '/orderconfirmation/' + row.listing_id + '/' + row.id
                      );
                    }}>
                    <TableCell component="th" scope="row" align="center">
                      {new Date(row.createdat).getFullYear() +
                        '-' +
                        new Date(row.createdat).getMonth() +
                        '-' +
                        new Date(row.createdat).getDate()}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(row.startdate).getFullYear() +
                        '-' +
                        new Date(row.startdate).getMonth() +
                        '-' +
                        new Date(row.startdate).getDate()}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(row.enddate).getFullYear() +
                        '-' +
                        new Date(row.enddate).getMonth() +
                        '-' +
                        new Date(row.enddate).getDate()}
                    </TableCell>

                    <TableCell align="center">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Group />
                        &nbsp;{row.guests}
                      </Box>
                    </TableCell>
                    <TableCell align="center">${row.total}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={12}>No Active Orders</TableCell>
                  </TableRow>
                </TableBody>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}
