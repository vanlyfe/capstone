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
  Rating,
  Button,
} from "@mui/material";
import { Person, Group } from "@mui/icons-material";
import apiClient from "../../services/apiClient";

export default function ActiveOrders() {
  const [error, setError] = useState();
  const [listings, setListings] = useState(null);
  let { id } = useParams();
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
        width: "100%",
        mt: 1,
      }}
    >
      <Box>
        <Button variant="text" sx={{ mt: 2, mb: 2 }}>
          Active Orders
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
                          href="/listing/:id"
                          sx={{
                            textDecoration: "none",

                            color: "#6E85B7",
                          }}
                        >
                          see reviews
                        </Link>
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
