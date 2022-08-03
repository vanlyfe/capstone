import React, { useState, useEffect } from "react";
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

function createData(
  vehicleModel,
  date,
  customerEmail,
  status,
  price,
  numOfGuests,
  reviews
) {
  const columns = [
    {
      field: "vehicleModel",
      headerName: "Vehicle Model",
      width: 90,
    },
    {
      field: "date",
      headerName: "Date",
      width: 90,
      type: "number",
    },
    {
      field: "customerEmail",
      headerName: "Customer Email",
      width: 90,
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
    },
    {
      field: "price",
      headerName: "Price",
      width: 90,
      type: "number",
    },
    {
      field: "numOfGuests",
      headerName: "Guests",
      width: 90,
      type: "number",
    },
    {
      field: "reviews",
      headerName: "",
      width: 90,
    },
  ];
  return {
    vehicleModel,
    date,
    customerEmail,
    status,
    price,
    numOfGuests,
    reviews,
  };
}

const rows = [
  createData(
    "Toyota RAV4",
    "07/18/2022 - 07/20/2022",
    "john@gmail.com",
    "filled",
    1,
    "$15.20",

    "see reviews"
  ),
  createData(
    "Toyota RAV4",
    "06/08/2022 - 06/09/2022",
    "john@gmail.com",
    "filled",
    3,
    "$26.20",

    "see reviews"
  ),
];

export default function ActiveListings() {
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
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Number of Guests</TableCell>
                <TableCell align="right">Price</TableCell>

                <TableCell align="center">Reviews</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.vehicleModel}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.customerEmail}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Group /> {row.price}{" "}
                  </TableCell>
                  <TableCell align="right">{row.numOfGuests}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Rating />
                    <Link
                      href="/listing/:id"
                      sx={{
                        textDecoration: "none",
                        mr: 5,
                        color: "#6E85B7",
                      }}
                    >
                      {" "}
                      {row.reviews}{" "}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}
