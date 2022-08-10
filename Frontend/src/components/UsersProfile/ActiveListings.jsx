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

export default function ActiveListings() {
  const [error, setError] = useState();
  const [listings, setListings] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const resData = await apiClient.fetchUserListings(id);
      console.log("res active listing id: ", resData.data.listings[0].id);
      if (resData?.data?.listings) {
        setListings(resData.data.listings);
      } else {
        setError("No Listings yet");
      }
    };

    getData();
  }, []);
  const handleOnClick = () => {
    navigate("/listing/" + listings[0].id);
  };

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
          Active Listings
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 140 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Vehicle Model</TableCell>

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
                      onClick={handleOnClick}
                    >
                      <TableCell component="th" scope="row">
                        {row.model}
                      </TableCell>
                      {/* <TableCell align="right">l{row.getStartDate}</TableCell>
                      <TableCell align="right">{row.getEndDate}</TableCell> */}
                      <TableCell align="center">{row.location}</TableCell>
                      <TableCell align="center">{row.createdat.slice(0,10)}</TableCell>

                      <TableCell align="center">
                        {" "}
                        <Group /> {row.max_accomodation}{" "}
                      </TableCell>
                      <TableCell align="center">${row.price}</TableCell>
                      <TableCell align="center">
                        <Rating value={row.rating} />
                      </TableCell>
                    </TableRow>
                  ))
                : "No listings yet"}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}
