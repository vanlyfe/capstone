import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
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

export default function ActiveListings(props) {
  const [error, setError] = useState();
  const [deleting, setDeleting] = useState(false);
  const [listings, setListings] = useState([]);
  const [listingId, setListingId] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

  const handleOnDelete = async () => {
    await apiClient.deleteListing(listingId);
    const resData = await apiClient.fetchUserListings(id);
    if (resData?.data?.listings) {
      setListings(resData.data.listings);
    } else {
      setError("No Listings yet");
    }
    setDeleting(false);
  };

  const handleOnCancel = () => {
    setDeleting(false);
    setListingId(null);
  };

  useEffect(() => {
    const getData = async () => {
      const resData = await apiClient.fetchUserListings(id);
    
      if (resData?.data?.listings) {
        setListings(resData.data.listings);
      } else {
        setError("No Listings yet");
      }
    };

    getData();
  }, []);

  //console.log(Number(props.user.id))
  //console.log(id)
  
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
      <Dialog
        open={deleting}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to continue?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleOnDelete}>Delete listing</Button>
          <Button onClick={handleOnCancel} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
            {listings.length > 0
              ? listings.map((row) => (
                  <TableBody
                    sx={{
                      borderBottom: "rgba(224, 224, 224, 1) 1px solid",
                      borderTop: "none",
                    }}
                  >
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      hover={true}
                      onClick={() => {
                        navigate("/listing/" + row.id);
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          borderBottom: "none",
                          borderTop: "none",
                        }}
                      >
                        {row.model}
                      </TableCell>
                      {/* <TableCell align="right">l{row.getStartDate}</TableCell>
                      <TableCell align="right">{row.getEndDate}</TableCell> */}
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: "none",
                          borderTop: "none",
                        }}
                      >
                        {row.location}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: "none",
                          borderTop: "none",
                        }}
                      >
                        {new Date(row.createdat).getFullYear() + "-" + new Date(row.createdat).getMonth() + "-" + new Date(row.createdat).getDate()}
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: "none",
                          borderTop: "none",
                        }}
                      >
                        {" "}
                        <Group /> {row.max_accomodation}{" "}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: "none",
                          borderTop: "none",
                        }}
                      >
                        ${row.price}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: "none",
                          borderTop: "none",
                        }}
                      >
                        <Rating value={row.rating} readOnly={true}/>
                      </TableCell>
                    </TableRow>
             { Number(props.user.id) === Number(id) ?
                    <Button
                      sx={{ color: "#6E85B7" }}
                      onClick={() => {
                        setDeleting(true);
                        setListingId(row.id);
                      }}
                    >
                      {" "}
                      DELETE
                    </Button>   : null }


                  </TableBody>
                ))
              : "No listings yet"}
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}
