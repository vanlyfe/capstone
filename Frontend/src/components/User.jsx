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
  Typography,
  CssBaseline,
  Toolbar,
  List,
  Link,
  Divider,
  AppBar,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Avatar,
  Rating,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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

export default function User() {
  const [value, setValue] = React.useState();
  // const [value, setValue] = (React.useState < number) | (null > 2);

  // const DataTable =() => {

  //   const [tableData, setTableData] =useState()
  //   useEffect(() => {
  //     fetch("https://..")
  //       //  write a query to fetch profile from the database

  //     .then((data)=> data.json())
  //     .then((data)=> console.log(data))
  //     .then((data)=> setTableData)

  //   })

  //   return (
  //     <div>
  //       <DataGrid
  //       rows = {tableData}
  //       columns= {columns}
  //       pageSize={5}
  //           rowsPerPageOptions={[5]}
  //           checkboxSelection
  //     />
  //     </div>
  //   )
  // }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CssBaseline />
      <AppBar
        position="relative"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#e1e9f0",
          color: "black",
          p: 3,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            noWrap
            component="div"
            sx={{
              flexWrap: "wrap",
              width: "50% ",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
              direction="column"
              spacing={1}
            >
              <Grid>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 200, height: 200 }}
                />
              </Grid>
              <Grid>
                <Box>
                  <Typography sx={{ fontSize: 25, mt: 10, ml: 3 }}>
                    John Doe
                  </Typography>
                  <Rating
                    name="user-rating"
                    sx={{ mt: 1, ml: 3 }}
                    value={value}
                    readOnly
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexWrap: "wrap", width: "50% " }}>
            <Button
              variant="contained"
              href="/user/:id/profile"
              sx={{ alignContent: "baseline", mb: 4, ml: 55 }}
            >
              EDIT PROFILE
            </Button>

            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              itaque in officiis? Neque, ducimus error! Atque molestias aliquid
              facere animi modi praesentium, illo enim reprehenderit omnis
              corrupti beatae sint voluptate?
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid
        sx={{
          mt: 1,
          bgcolor: "##8cbfed",
          height: "70%",
          width: "100%",
          mt: 1,
          mr: 67,
          display: "flex",
          flexDirection: "row",
          bgcolor: "grey",
        }}
      >
        <Grid
          sx={{
            mt: 1,
            bgcolor: "#e1e9f0",
            width: "25%",
            mt: 1,
            mr: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: 400,
              width: "80%",
              mr: 1,
              ml: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* <List>
              <Typography>Host</Typography>
              {["Reviews", "Active Listings", "Past Listings"].map(
                (text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List> */}
            <List>
              <Typography>Host</Typography>

              <ListItem
                disablepadding
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <ListItemButton href="/user/:id/activeListing">
                  <ListItemText> Active Listings</ListItemText>
                </ListItemButton>
                <ListItemButton href="/user/:id/pastListing">
                  <ListItemText>Past Listings</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            {/* <List>
              <Typography>Renter</Typography>
              {["Active Orders", "Past Orders"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List> */}
            <List>
              <Typography>Renter</Typography>

              <ListItem
                disablepadding
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <ListItemButton href="/user/:id/activeOrders">
                  <ListItemText> Active Orders</ListItemText>
                </ListItemButton>
                <ListItemButton href="/user/:id/pastOrders">
                  <ListItemText> Past Orders</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />

            <List>
              <ListItem>
                <ListItemButton href="/user/:id/reviews">
                  <ListItemText
                    disablepadding
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    Reviews
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Grid>
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
            <Button
              variant="text"
              href="/user/:id/activeListing"
              sx={{ mt: 2, mb: 2 }}
            >
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
      </Grid>
    </Box>
  );
}
