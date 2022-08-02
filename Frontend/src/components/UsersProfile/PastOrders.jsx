import React, { useState, useEffect, MouseEvent } from "react";
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
  Divider,
  AppBar,
  Modal,
  TextareaAutosize,
  Link,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Avatar,
  Rating,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Group } from "@mui/icons-material";
import { height } from "@mui/system";

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

    "add reviews"
  ),
  createData(
    "Toyota RAV4",
    "06/08/2022 - 06/09/2022",
    "john@gmail.com",
    "filled",
    3,
    "$26.20",

    "add reviews"
  ),
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PastOrders() {
  const [value, setValue] = React.useState();
  const [reviewText, setReviewText] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const isDisabled = reviewText.length === 0 || reviewText.length > 140;

  function handleOnReviewTextChange(evt) {
    setReviewText(evt.target.value);
  }

  function handleonsubmit() {
    let newReview = {
      review: "",
    };
    // setReviews(reviews.concat(newReview));
    setReviewText("");
    setOpen(false);
  }

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
                  <ListItem key={text} >
                    <ListItemButton>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List> */}
            <List>
              <Typography>Host</Typography>

              <ListItem sx={{ display: "flex", flexDirection: "column" }}>
                <ListItemButton href="/user/:id/activeListing">
                  <ListItemText> Active Listings</ListItemText>
                </ListItemButton>
                <ListItemButton href="/user/:id/pastListing">
                  <ListItemText> Past Listings</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            {/* <List>
              <Typography>Renter</Typography>
              {["Active Orders", "Past Orders"].map((text, index) => (
                <ListItem key={text} >
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List> */}
            <List>
              <Typography>Renter</Typography>

              <ListItem sx={{ display: "flex", flexDirection: "column" }}>
                <ListItemButton href="/user/:id/activeOrders">
                  <ListItemText> Active Orders</ListItemText>
                </ListItemButton>
                <ListItemButton href="/user/:id/pastOrders">
                  <ListItemText>Past Orders</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />

            <List>
              <ListItem>
                <ListItemButton href="/user/:id/reviews">
                  <ListItemText
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
            <Button variant="text" href="/user/1" sx={{ mt: 2, mb: 2 }}>
              Past Orders
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
                          onClick={handleOpen}
                          sx={{
                            textDecoration: "none",
                            mr: 5,
                            color: "#6E85B7",
                          }}
                        >
                          {row.reviews}
                        </Link>

                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                              sx={{ textalign: "center" }}
                            >
                              Rate and review
                            </Typography>
                            <Typography>
                              Share your experience to help others
                            </Typography>
                            {/* <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              Duis mollis, est non commodo luctus, nisi erat
                              porttitor ligula.
                            </Typography> */}
                            <Rating />
                            <TextareaAutosize
                              aria-label="minimum height"
                              minRows={3}
                              placeholder="Describe your experience"
                              style={{ width: 500, height: 100 }}
                              handleOnChange={handleOnReviewTextChange}
                              value={reviewText}
                            />

                            <Typography>
                              Your review will be posted publicly on the web.
                            </Typography>

                            <Grid sx={{ mt: 2, ml: 40 }}>
                              {/* <ReviewCharacterCount
                                textLength={reviewText.length}
                              /> */}
                              <ReviewSubmitButton
                                handleOnSubmit={handleonsubmit}
                              />
                              <Button
                                onClick={handleClose}
                                sx={{ ml: 4, color: "#669bbc" }}
                              >
                                CANCEL
                              </Button>
                            </Grid>
                          </Box>
                        </Modal>
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

// export function ReviewCharacterCount({ textLength }) {
//   return (
//     <Typography
//       className={textLength > 140 ? "Review-length red" : "Review-length"}
//     >
//       {textLength > 0 ? 140 - textLength : ""}{" "}
//     </Typography>
//   );
// }

export function ReviewSubmitButton({ handleonsubmit }) {
  return (
    <Button
      sx={{ color: "#669bbc" }}
      onClick={() => handleonsubmit()}
      // disabled={isDisabled}
    >
      POST
    </Button>
  );
}
