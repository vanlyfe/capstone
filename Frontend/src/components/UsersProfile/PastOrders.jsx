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
  Modal,
  TextareaAutosize,
  Link,
  Rating,
  Button,
} from "@mui/material";
import { Group } from "@mui/icons-material";
import apiClient from "../../services/apiClient";

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

export default function PastOrders(props) {
  const [rating, setRating] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState([]);

  //   const [form, setForm] = useState({
  //     reviewToPost: "",
  //   });

  // const isDisabled = reviewText.length === 0 || reviewText.length > 140;

  //   function handleOnReviewTextChange(evt) {
  //     setReviewText(evt.target.value);
  //   }

  //   function handleOnSubmit() {
  //     let newReview = {
  //       review: reviewText,
  //       userId: props.userId,
  //     };
  //     setReviews({ ...reviews, newReview });

  //     // setReviewText("");
  //     setOpen(false);
  //   }

  // export function ReviewCharacterCount({ textLength }) {
  //   return (
  //     <Typography
  //       className={textLength > 140 ? "Review-length red" : "Review-length"}
  //     >
  //       {textLength > 0 ? 140 - textLength : ""}{" "}
  //     </Typography>
  //   );
  // }

  // async function ReviewSubmitButton() {
  //   const postedReview = await apiClient.postReview(
  //     props.user.listingId,
  //     reviewText
  //   )({
  //     reviewToPost: form.review,
  //   });

  //   setForm((f) => ({ ...f, reviewText }));

  //   return (
  //     <Button
  //       sx={{ color: "#669bbc" }}
  //       onClick={() => handleOnSubmit()}
  //       // disabled={isDisabled}
  //     >
  //       POST
  //     </Button>
  //   );
  // }

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
                          // onChange={handleOnReviewTextChange}
                          value={reviewText}
                        />

                        <Typography>
                          Your review will be posted publicly on the web.
                        </Typography>

                        <Grid sx={{ mt: 2, ml: 40 }}>
                          {/* <ReviewCharacterCount
                                textLength={reviewText.length}
                              /> */}
                          {/* <ReviewSubmitButton handleOnSubmit={handleOnSubmit} /> */}
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
  );
}
