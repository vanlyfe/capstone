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
  Rating,
  Button,
} from "@mui/material";
import { Person, Group } from "@mui/icons-material";
import apiClient from "../../services/apiClient";

export default function PastListings() {
  const [error, setError] = useState();
  const [listings, setListings] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();
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

  

  return (
    <Grid
      sx={{
        mt: 1,
        bgcolor: "##8cbfed",
        height: "70%",
        width: { xs: '100%', md: '70%' },
        mt: 1,
      }}
    >
      <Box>
        <Button variant="text" sx={{ mt: 2, mb: 2 }}>
          Past Listings
        </Button>
        <Button
          variant="contained"
          href="/createlisting"
          sx={{ mt: 2, mb: 2, ml: 2 }}
        >
          Make Listing
        </Button>
      </Box>

      <Box sx={{ height: 400, width: "100%", mt: 1, ml: 1 }}>
        <TableContainer component={Paper} elevation={5}>
          <Table sx={{ minWidth: 140 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Vehicle Model</TableCell>

                {/* <TableCell align="right">Check in </TableCell>
                <TableCell align="right"> Check out</TableCell> */}
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Post Date</TableCell>

                <TableCell align="center">Number of Guests</TableCell>
                <TableCell align="center">Price</TableCell>

                <TableCell align="center">Ratings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listings.length > 0
                ? listings.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      hover={true}
                      onClick={() => {
                        navigate("/listing/" + row.id)
                      }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.model}
                      </TableCell>
                      {/* <TableCell align="right">l{row.getStartDate}</TableCell>
                      <TableCell align="right">{row.getEndDate}</TableCell> */}
                      <TableCell align="center">{row.location}</TableCell>
                      <TableCell align="center">{new Date(row.createdat).getFullYear() + "-" + new Date(row.createdat).getMonth() + "-" + new Date(row.createdat).getDate()}</TableCell>

                      <TableCell align="center">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Group />
                        &nbsp;{row.max_accomodation}
                      </Box>
                      </TableCell>
                      <TableCell align="center">${row.price}</TableCell>
                      <TableCell align="center">
                        <Rating value={row.rating} readOnly={true}/>
                      </TableCell>
                    </TableRow>
                  ))
                : <TableBody>
                <TableRow>
                  <TableCell colSpan={12}>No Past Listings</TableCell>
                </TableRow>
              </TableBody>}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}
